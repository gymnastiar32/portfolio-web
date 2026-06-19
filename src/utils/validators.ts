import { z } from 'zod'

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024
export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function isValidImageSource(value: string) {
  const trimmed = value.trim()

  if (trimmed.startsWith('/uploads/')) {
    return true
  }

  try {
    new URL(trimmed)
    return true
  } catch {
    return false
  }
}

const imageSource = z.string().trim().refine(isValidImageSource, 'Add a valid image URL or /uploads path.')
const imageSourceOrEmpty = z.union([imageSource, z.literal('')])

export const portfolioFormSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters.'),
  slug: z
    .string()
    .trim()
    .min(3, 'Slug must be at least 3 characters.')
    .regex(slugPattern, 'Use lowercase letters, numbers, and dashes only.'),
  category: z.string().trim().min(1, 'Pick a category.'),
  short_description: z
    .string()
    .trim()
    .min(12, 'Short description should be more descriptive.')
    .max(180, 'Keep the short description under 180 characters.'),
  overview: z.string().trim().min(20, 'Overview is required.'),
  role: z.string().trim().min(3, 'Role is required.'),
  timeline: z.string().trim().min(3, 'Timeline is required.'),
  status: z.enum(['draft', 'publish']),
  featured: z.boolean(),
  thumbnail_url: imageSource,
  cover_image_url: imageSourceOrEmpty,
  problem_statement: z.string().trim().min(20, 'Problem statement is required.'),
  goals: z.string().trim().min(20, 'Goals are required.'),
  process: z.string().trim().min(20, 'Process is required.'),
  solution: z.string().trim().min(20, 'Solution is required.'),
  result: z.string().trim().min(20, 'Result is required.'),
  lessons_learned: z.string().trim(),
  tools: z
    .array(
      z.object({
        name: z.string().trim().min(1, 'Tool name is required.'),
      }),
    )
    .min(1, 'Add at least one tool.'),
  gallery: z.array(
    z.object({
      image_url: imageSourceOrEmpty,
      caption: z.string().trim(),
    }),
  ),
})

export function validateImageFile(file: File) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files are allowed.')
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Image size must be under 5MB.')
  }
}
