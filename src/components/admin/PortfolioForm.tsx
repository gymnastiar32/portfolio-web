import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Checkbox, FileInput, Label, Select, Spinner, Textarea, TextInput } from 'flowbite-react'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiArrowUpTray, HiInformationCircle } from 'react-icons/hi2'
import { defaultPortfolioFormValues, portfolioCategories } from '../../data/fallbackData'
import type { Portfolio, PortfolioFormValues, PortfolioPayload } from '../../types/portfolio'
import { uploadService } from '../../services/uploadService'
import { slugify } from '../../utils/slugify'
import { portfolioFormSchema } from '../../utils/validators'
import { GalleryInputRepeater } from './GalleryInputRepeater'
import { ToolInputRepeater } from './ToolInputRepeater'

interface PortfolioFormProps {
  initialPortfolio?: Portfolio | null
  submitLabel: string
  submitting?: boolean
  error?: string | null
  onSubmit: (payload: PortfolioPayload) => Promise<void>
}

function toFormValues(portfolio?: Portfolio | null): PortfolioFormValues {
  if (!portfolio) {
    return defaultPortfolioFormValues
  }

  return {
    title: portfolio.title,
    slug: portfolio.slug,
    category: portfolio.category,
    short_description: portfolio.short_description,
    overview: portfolio.overview,
    role: portfolio.role,
    timeline: portfolio.timeline,
    status: portfolio.status,
    featured: portfolio.featured,
    thumbnail_url: portfolio.thumbnail_url,
    cover_image_url: portfolio.cover_image_url || '',
    problem_statement: portfolio.problem_statement,
    goals: portfolio.goals,
    process: portfolio.process,
    solution: portfolio.solution,
    result: portfolio.result,
    lessons_learned: portfolio.lessons_learned || '',
    tools:
      portfolio.tools.length > 0
        ? portfolio.tools.map((tool) => ({
          name: tool.tool_name,
        }))
        : [{ name: '' }],
    gallery:
      portfolio.gallery.length > 0
        ? portfolio.gallery.map((item) => ({
          image_url: item.image_url,
          caption: item.caption || '',
        }))
        : [{ image_url: '', caption: '' }],
  }
}

export function PortfolioForm({ initialPortfolio, submitLabel, submitting, error, onSubmit }: PortfolioFormProps) {
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<Record<number, File>>({})
  const [localError, setLocalError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPortfolio?.slug))

  const initialValues = useMemo(() => toFormValues(initialPortfolio), [initialPortfolio])

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: initialValues,
  })

  const toolsFieldArray = useFieldArray({
    control,
    name: 'tools',
  })

  const galleryFieldArray = useFieldArray({
    control,
    name: 'gallery',
  })

  const values = watch()
  const titleValue = watch('title')
  const galleryValues = watch('gallery')

  useEffect(() => {
    reset(initialValues)
    setThumbnailFile(null)
    setCoverFile(null)
    setGalleryFiles({})
    setSlugTouched(Boolean(initialPortfolio?.slug))
  }, [initialPortfolio, initialValues, reset])

  useEffect(() => {
    if (!slugTouched) {
      setValue('slug', slugify(titleValue), { shouldValidate: true, shouldDirty: true })
    }
  }, [setValue, slugTouched, titleValue])

  const galleryPreviews = galleryValues.reduce<Record<number, string>>((accumulator, item, index) => {
    accumulator[index] = item.image_url
    return accumulator
  }, {})

  function handleThumbnailChange(file?: File) {
    if (!file) {
      setThumbnailFile(null)
      return
    }

    const preview = URL.createObjectURL(file)
    setThumbnailFile(file)
    setValue('thumbnail_url', preview, { shouldValidate: true, shouldDirty: true })
  }

  function handleCoverChange(file?: File) {
    if (!file) {
      setCoverFile(null)
      return
    }

    const preview = URL.createObjectURL(file)
    setCoverFile(file)
    setValue('cover_image_url', preview, { shouldValidate: true, shouldDirty: true })
  }

  function handleGalleryFileChange(index: number, file?: File) {
    if (!file) {
      setGalleryFiles((current) => {
        const next = { ...current }
        delete next[index]
        return next
      })
      return
    }

    const preview = URL.createObjectURL(file)
    setGalleryFiles((current) => ({
      ...current,
      [index]: file,
    }))
    setValue(`gallery.${index}.image_url`, preview, { shouldValidate: true, shouldDirty: true })
  }

  async function onInternalSubmit(formValues: PortfolioFormValues) {
    setLocalError(null)
    setUploading(true)

    try {
      const nextValues: PortfolioFormValues = {
        ...formValues,
        tools: formValues.tools.filter((tool) => tool.name.trim()),
        gallery: formValues.gallery.filter((item) => item.image_url.trim()),
      }

      if (thumbnailFile) {
        const uploaded = await uploadService.uploadThumbnail(thumbnailFile)
        nextValues.thumbnail_url = uploaded.url
      }

      if (coverFile) {
        const uploaded = await uploadService.uploadCover(coverFile)
        nextValues.cover_image_url = uploaded.url
      }

      const galleryEntries = Object.entries(galleryFiles)
      if (galleryEntries.length > 0) {
        await Promise.all(
          galleryEntries.map(async ([index, file]) => {
            const uploaded = await uploadService.uploadGalleryImages([file])
            nextValues.gallery[Number(index)].image_url = uploaded[0].url
          }),
        )
      }

      const payload: PortfolioPayload = {
        title: nextValues.title.trim(),
        slug: slugify(nextValues.slug),
        category: nextValues.category,
        short_description: nextValues.short_description.trim(),
        overview: nextValues.overview.trim(),
        role: nextValues.role.trim(),
        timeline: nextValues.timeline.trim(),
        status: nextValues.status,
        featured: nextValues.featured,
        thumbnail_url: nextValues.thumbnail_url,
        cover_image_url: nextValues.cover_image_url || '',
        problem_statement: nextValues.problem_statement.trim(),
        goals: nextValues.goals.trim(),
        process: nextValues.process.trim(),
        solution: nextValues.solution.trim(),
        result: nextValues.result.trim(),
        lessons_learned: nextValues.lessons_learned.trim(),
        tools: nextValues.tools.map((tool, index) => ({
          tool_name: tool.name.trim(),
          sort_order: index,
        })),
        gallery: nextValues.gallery
          .filter((item) => item.image_url.trim())
          .map((item, index) => ({
            image_url: item.image_url,
            caption: item.caption.trim(),
            sort_order: index,
          })),
      }

      await onSubmit(payload)
    } catch (submitError) {
      setLocalError(submitError instanceof Error ? submitError.message : 'Something went wrong while saving the portfolio.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit((formValues) => void onInternalSubmit(formValues))}>
      {error || localError ? (
        <Alert color="red" icon={HiInformationCircle}>
          <span className="font-medium">We couldn&apos;t save this portfolio.</span> {error || localError}
        </Alert>
      ) : null}

      <div className="admin-panel grid gap-6 p-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <TextInput id="title" className="mt-2" placeholder="Project title" {...register('title')} color={errors.title ? 'failure' : undefined} />
            {errors.title ? <p className="mt-1 text-xs text-red-600">{errors.title.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <TextInput
              id="slug"
              className="mt-2"
              placeholder="project-slug"
              {...register('slug', {
                onChange: () => setSlugTouched(true),
              })}
              color={errors.slug ? 'failure' : undefined}
            />
            {errors.slug ? <p className="mt-1 text-xs text-red-600">{errors.slug.message}</p> : <p className="mt-1 text-xs text-stone-500">Auto-generated from the title until you edit it manually.</p>}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select id="category" className="mt-2" {...register('category')}>
                {portfolioCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select id="status" className="mt-2" {...register('status')}>
                <option value="draft">Draft</option>
                <option value="publish">Publish</option>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="short_description">Short description</Label>
            <Textarea id="short_description" className="mt-2" rows={3} {...register('short_description')} color={errors.short_description ? 'failure' : undefined} />
            {errors.short_description ? <p className="mt-1 text-xs text-red-600">{errors.short_description.message}</p> : null}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="role">Role</Label>
              <TextInput id="role" className="mt-2" placeholder="Lead Product Designer" {...register('role')} color={errors.role ? 'failure' : undefined} />
              {errors.role ? <p className="mt-1 text-xs text-red-600">{errors.role.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <TextInput id="timeline" className="mt-2" placeholder="8 weeks" {...register('timeline')} color={errors.timeline ? 'failure' : undefined} />
              {errors.timeline ? <p className="mt-1 text-xs text-red-600">{errors.timeline.message}</p> : null}
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            <Checkbox id="featured" {...register('featured')} />
            <Label htmlFor="featured">Mark as featured portfolio</Label>
          </div>
        </div>

        <div className="space-y-5">
          <div className="overflow-hidden rounded-3xl bg-stone-100">
            {values.thumbnail_url ? (
              <img src={values.thumbnail_url} alt="Thumbnail preview" className="h-56 w-full object-cover" />
            ) : (
              <div className="flex h-56 items-center justify-center text-sm text-stone-400">Thumbnail preview</div>
            )}
          </div>
          <div>
            <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
            <TextInput id="thumbnail_url" className="mt-2" placeholder="https://images.unsplash.com/..." {...register('thumbnail_url')} color={errors.thumbnail_url ? 'failure' : undefined} />
            {errors.thumbnail_url ? <p className="mt-1 text-xs text-red-600">{errors.thumbnail_url.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="thumbnail_file">Or upload thumbnail</Label>
            <FileInput id="thumbnail_file" className="mt-2" accept="image/*" onChange={(event) => handleThumbnailChange(event.target.files?.[0])} />
          </div>
          <div>
            <Label htmlFor="cover_image_url">Cover image URL</Label>
            <TextInput id="cover_image_url" className="mt-2" placeholder="Optional cover image URL" {...register('cover_image_url')} color={errors.cover_image_url ? 'failure' : undefined} />
            {errors.cover_image_url ? <p className="mt-1 text-xs text-red-600">{errors.cover_image_url.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="cover_file">Or upload cover image</Label>
            <FileInput id="cover_file" className="mt-2" accept="image/*" onChange={(event) => handleCoverChange(event.target.files?.[0])} />
          </div>
        </div>
      </div>

      <div className="admin-panel grid gap-6 p-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <Label htmlFor="overview">Overview</Label>
            <Textarea id="overview" className="mt-2" rows={5} {...register('overview')} color={errors.overview ? 'failure' : undefined} />
            {errors.overview ? <p className="mt-1 text-xs text-red-600">{errors.overview.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="problem_statement">Problem statement</Label>
            <Textarea id="problem_statement" className="mt-2" rows={5} {...register('problem_statement')} color={errors.problem_statement ? 'failure' : undefined} />
            {errors.problem_statement ? <p className="mt-1 text-xs text-red-600">{errors.problem_statement.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="goals">Goals</Label>
            <Textarea id="goals" className="mt-2" rows={5} {...register('goals')} color={errors.goals ? 'failure' : undefined} />
            {errors.goals ? <p className="mt-1 text-xs text-red-600">{errors.goals.message}</p> : null}
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <Label htmlFor="process">Process</Label>
            <Textarea id="process" className="mt-2" rows={5} {...register('process')} color={errors.process ? 'failure' : undefined} />
            {errors.process ? <p className="mt-1 text-xs text-red-600">{errors.process.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="solution">Solution</Label>
            <Textarea id="solution" className="mt-2" rows={5} {...register('solution')} color={errors.solution ? 'failure' : undefined} />
            {errors.solution ? <p className="mt-1 text-xs text-red-600">{errors.solution.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="result">Result</Label>
            <Textarea id="result" className="mt-2" rows={5} {...register('result')} color={errors.result ? 'failure' : undefined} />
            {errors.result ? <p className="mt-1 text-xs text-red-600">{errors.result.message}</p> : null}
          </div>
        </div>
      </div>

      <div className="admin-panel space-y-5 p-6">
        <div>
          <Label htmlFor="lessons_learned">Lessons learned</Label>
          <Textarea id="lessons_learned" className="mt-2" rows={4} {...register('lessons_learned')} />
        </div>
        <ToolInputRepeater
          fields={toolsFieldArray.fields}
          register={register}
          errors={errors}
          append={toolsFieldArray.append}
          remove={toolsFieldArray.remove}
        />
        <GalleryInputRepeater
          fields={galleryFieldArray.fields}
          register={register}
          errors={errors}
          previews={galleryPreviews}
          append={galleryFieldArray.append}
          remove={galleryFieldArray.remove}
          onFileChange={handleGalleryFileChange}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-primary-200 bg-primary-50 px-5 py-4">
        <p className="text-sm text-primary-900">
          Uploads will be stored in the hosting portfolio image folder configured by the API.
        </p>
        <Button color="yellow" type="submit" disabled={submitting || uploading}>
          {submitting || uploading ? <Spinner size="sm" className="mr-2" /> : null}
          <HiArrowUpTray className="mr-2 h-4 w-4" />
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
