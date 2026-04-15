import { Button, FileInput, Label, TextInput } from 'flowbite-react'
import { HiMinusCircle, HiPhoto, HiPlusCircle } from 'react-icons/hi2'
import type { FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form'
import type { PortfolioFormValues } from '../../types/portfolio'

interface GalleryInputRepeaterProps {
  fields: Array<{ id: string }>
  register: UseFormRegister<PortfolioFormValues>
  errors: FieldErrors<PortfolioFormValues>
  previews: Record<number, string>
  append: UseFieldArrayAppend<PortfolioFormValues, 'gallery'>
  remove: UseFieldArrayRemove
  onFileChange: (index: number, file?: File) => void
}

export function GalleryInputRepeater({
  fields,
  register,
  errors,
  previews,
  append,
  remove,
  onFileChange,
}: GalleryInputRepeaterProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-stone-200 bg-stone-50/70 p-5">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-base font-semibold text-stone-900">Gallery images</Label>
        <Button color="light" size="xs" onClick={() => append({ image_url: '', caption: '' })}>
          <HiPlusCircle className="mr-2 h-4 w-4" />
          Add image
        </Button>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="rounded-2xl border border-stone-200 bg-white p-4">
          <div className="grid gap-4 lg:grid-cols-[0.55fr_0.45fr]">
            <div className="space-y-4">
              <div>
                <Label htmlFor={`gallery-url-${index}`}>{`Image URL ${index + 1}`}</Label>
                <TextInput
                  id={`gallery-url-${index}`}
                  className="mt-2"
                  icon={HiPhoto}
                  placeholder="https://images.unsplash.com/..."
                  {...register(`gallery.${index}.image_url`)}
                  color={errors.gallery?.[index]?.image_url ? 'failure' : undefined}
                />
                {errors.gallery?.[index]?.image_url ? (
                  <p className="mt-1 text-xs text-red-600">{errors.gallery[index]?.image_url?.message}</p>
                ) : null}
              </div>
              <div>
                <Label htmlFor={`gallery-caption-${index}`}>Caption</Label>
                <TextInput
                  id={`gallery-caption-${index}`}
                  className="mt-2"
                  placeholder="Explain what this screen shows"
                  {...register(`gallery.${index}.caption`)}
                />
              </div>
              <div>
                <Label htmlFor={`gallery-file-${index}`}>Or upload image</Label>
                <FileInput id={`gallery-file-${index}`} className="mt-2" accept="image/*" onChange={(event) => onFileChange(index, event.target.files?.[0])} />
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl bg-stone-100">
              {previews[index] ? (
                <img src={previews[index]} alt={`Gallery preview ${index + 1}`} className="h-full min-h-52 w-full object-cover" />
              ) : (
                <div className="flex min-h-52 items-center justify-center text-sm text-stone-400">Preview will appear here</div>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button color="light" size="sm" onClick={() => remove(index)}>
              <HiMinusCircle className="mr-2 h-4 w-4" />
              Remove image
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
