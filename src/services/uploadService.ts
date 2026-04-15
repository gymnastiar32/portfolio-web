import { supabase } from '../config/supabase'
import { slugify } from '../utils/slugify'
import { validateImageFile } from '../utils/validators'

const BUCKET_NAME = 'portfolio-images'

function assertSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Uploads are unavailable.')
  }

  return supabase
}

function buildPath(folder: 'thumbnails' | 'covers' | 'gallery', file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const name = slugify(file.name.replace(/\.[^.]+$/, '')) || 'portfolio-image'
  return `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${name}.${extension}`
}

async function uploadFile(folder: 'thumbnails' | 'covers' | 'gallery', file: File) {
  validateImageFile(file)

  const client = assertSupabase()
  const path = buildPath(folder, file)

  const { error } = await client.storage.from(BUCKET_NAME).upload(path, file)

  if (error) {
    throw error
  }

  const { data } = client.storage.from(BUCKET_NAME).getPublicUrl(path)

  return {
    path,
    url: data.publicUrl,
  }
}

export const uploadService = {
  uploadThumbnail(file: File) {
    return uploadFile('thumbnails', file)
  },

  uploadCover(file: File) {
    return uploadFile('covers', file)
  },

  async uploadGalleryImages(files: File[]) {
    return Promise.all(files.map((file) => uploadFile('gallery', file)))
  },

  async removeFile(path: string) {
    const client = assertSupabase()
    const { error } = await client.storage.from(BUCKET_NAME).remove([path])

    if (error) {
      throw error
    }
  },
}
