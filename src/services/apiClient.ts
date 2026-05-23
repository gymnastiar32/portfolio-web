import { env } from '../config/env'

export interface ApiUser {
  id: string
  email: string
}

export interface ApiSession {
  authenticated: boolean
}

interface RequestOptions extends RequestInit {
  parseJson?: boolean
}

function buildUrl(path: string) {
  const baseUrl = env.apiBaseUrl.replace(/\/$/, '')
  const nextPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${nextPath}`
}

async function parseResponse<T>(response: Response, parseJson = true): Promise<T> {
  const payload = parseJson ? await response.json().catch(() => null) : null

  if (!response.ok) {
    const message = payload && typeof payload === 'object' && 'message' in payload
      ? String(payload.message)
      : 'Request failed.'
    throw new Error(message)
  }

  return payload as T
}

export const apiClient = {
  async get<T>(path: string, options?: RequestOptions) {
    const response = await fetch(buildUrl(path), {
      ...options,
      method: 'GET',
      credentials: 'include',
    })

    return parseResponse<T>(response, options?.parseJson)
  },

  async post<T>(path: string, body?: unknown, options?: RequestOptions) {
    const isFormData = body instanceof FormData
    const response = await fetch(buildUrl(path), {
      ...options,
      method: 'POST',
      credentials: 'include',
      headers: isFormData ? options?.headers : {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: isFormData ? body : JSON.stringify(body ?? {}),
    })

    return parseResponse<T>(response, options?.parseJson)
  },

  async put<T>(path: string, body?: unknown, options?: RequestOptions) {
    const response = await fetch(buildUrl(path), {
      ...options,
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body ?? {}),
    })

    return parseResponse<T>(response, options?.parseJson)
  },

  async delete<T>(path: string, options?: RequestOptions) {
    const response = await fetch(buildUrl(path), {
      ...options,
      method: 'DELETE',
      credentials: 'include',
    })

    return parseResponse<T>(response, options?.parseJson)
  },
}

