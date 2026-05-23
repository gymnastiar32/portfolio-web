import { apiClient } from './apiClient'
import { slugify } from '../utils/slugify'
import { validateImageFile } from '../utils/validators'

function buildPath(folder: 'thumbnails' | 'covers' | 'gallery', file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const name = slugify(file.name.replace(/\.[^.]+$/, '')) || 'portfolio-image'
  return `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${name}.${extension}`
}

async function uploadFile(folder: 'thumbnails' | 'covers' | 'gallery', file: File) {
  validateImageFile(file)

  const formData = new FormData()
  formData.append('folder', folder)
  formData.append('file', file, buildPath(folder, file))

  return apiClient.post<{ path: string, url: string }>('/uploads', formData)
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
    void path
  },
}
