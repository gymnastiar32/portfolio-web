import { apiClient } from './apiClient'
import type { DashboardStats, Portfolio, PortfolioGalleryItem, PortfolioPayload, PortfolioTool } from '../types/portfolio'

function normalizeTools(rows: unknown): PortfolioTool[] {
  if (!Array.isArray(rows)) {
    return []
  }

  return rows
    .map((row) => row as PortfolioTool)
    .sort((first, second) => first.sort_order - second.sort_order)
}

function normalizeGallery(rows: unknown): PortfolioGalleryItem[] {
  if (!Array.isArray(rows)) {
    return []
  }

  return rows
    .map((row) => row as PortfolioGalleryItem)
    .sort((first, second) => first.sort_order - second.sort_order)
}

function normalizePortfolio(row: Record<string, unknown>): Portfolio {
  const tools = row.tools ?? row.portfolio_tools
  const gallery = row.gallery ?? row.portfolio_gallery

  return {
    id: String(row.id),
    title: String(row.title ?? ''),
    slug: String(row.slug ?? ''),
    category: String(row.category ?? ''),
    short_description: String(row.short_description ?? ''),
    overview: String(row.overview ?? ''),
    role: String(row.role ?? ''),
    timeline: String(row.timeline ?? ''),
    status: row.status === 'publish' ? 'publish' : 'draft',
    featured: Boolean(row.featured),
    thumbnail_url: String(row.thumbnail_url ?? ''),
    cover_image_url: row.cover_image_url ? String(row.cover_image_url) : '',
    problem_statement: String(row.problem_statement ?? ''),
    goals: String(row.goals ?? ''),
    process: String(row.process ?? ''),
    solution: String(row.solution ?? ''),
    result: String(row.result ?? ''),
    lessons_learned: row.lessons_learned ? String(row.lessons_learned) : '',
    created_by: row.created_by ? String(row.created_by) : '',
    created_at: row.created_at ? String(row.created_at) : '',
    updated_at: row.updated_at ? String(row.updated_at) : '',
    tools: normalizeTools(tools),
    gallery: normalizeGallery(gallery),
  }
}

function sortPortfolios(portfolios: Portfolio[]) {
  return [...portfolios].sort((first, second) => {
    const firstDate = new Date(first.updated_at ?? first.created_at ?? 0).getTime()
    const secondDate = new Date(second.updated_at ?? second.created_at ?? 0).getTime()
    return secondDate - firstDate
  })
}

async function queryPortfolios(status?: 'draft' | 'publish') {
  const query = status ? `?status=${encodeURIComponent(status)}` : ''
  const data = await apiClient.get<Record<string, unknown>[]>(`/portfolios${query}`)

  return data.map((row) => normalizePortfolio(row))
}

async function querySinglePortfolio(column: 'id' | 'slug', value: string) {
  const path = column === 'slug'
    ? `/portfolios/slug/${encodeURIComponent(value)}`
    : `/portfolios/${encodeURIComponent(value)}`

  try {
    const data = await apiClient.get<Record<string, unknown>>(path)
    return normalizePortfolio(data)
  } catch (error) {
    if (error instanceof Error && error.message === 'Portfolio not found.') {
      return null
    }

    throw error
  }
}

function mapPortfolioPayload(payload: PortfolioPayload) {
  return {
    title: payload.title,
    slug: payload.slug,
    category: payload.category,
    short_description: payload.short_description,
    overview: payload.overview,
    role: payload.role,
    timeline: payload.timeline,
    status: payload.status,
    featured: payload.featured,
    thumbnail_url: payload.thumbnail_url,
    cover_image_url: payload.cover_image_url || null,
    problem_statement: payload.problem_statement,
    goals: payload.goals,
    process: payload.process,
    solution: payload.solution,
    result: payload.result,
    lessons_learned: payload.lessons_learned || null,
  }
}

export const portfolioService = {
  async getPublishedPortfolios() {
    return queryPortfolios('publish')
  },

  async getAllPortfolios() {
    const data = await queryPortfolios()
    return sortPortfolios(data)
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const portfolios = await this.getAllPortfolios()
    return {
      total: portfolios.length,
      published: portfolios.filter((portfolio) => portfolio.status === 'publish').length,
      draft: portfolios.filter((portfolio) => portfolio.status === 'draft').length,
    }
  },

  async getPortfolioById(id: string) {
    return querySinglePortfolio('id', id)
  },

  async getPortfolioBySlug(slug: string) {
    const portfolio = await querySinglePortfolio('slug', slug)
    return portfolio?.status === 'publish' ? portfolio : null
  },

  async createPortfolio(payload: PortfolioPayload) {
    const data = await apiClient.post<Record<string, unknown>>('/portfolios', {
      ...mapPortfolioPayload(payload),
      tools: payload.tools,
      gallery: payload.gallery,
    })

    return normalizePortfolio(data)
  },

  async updatePortfolio(id: string, payload: PortfolioPayload) {
    const data = await apiClient.put<Record<string, unknown>>(`/portfolios/${encodeURIComponent(id)}`, {
      ...mapPortfolioPayload(payload),
      tools: payload.tools,
      gallery: payload.gallery,
    })

    return normalizePortfolio(data)
  },

  async deletePortfolio(id: string) {
    await apiClient.delete<{ ok: boolean }>(`/portfolios/${encodeURIComponent(id)}`)
  },

  async getPortfolioTools(portfolioId: string) {
    const portfolio = await this.getPortfolioById(portfolioId)
    return portfolio?.tools ?? []
  },

  async replacePortfolioTools(portfolioId: string, tools: PortfolioPayload['tools']) {
    const portfolio = await this.getPortfolioById(portfolioId)
    if (!portfolio) {
      throw new Error('Portfolio not found.')
    }
    await this.updatePortfolio(portfolioId, { ...portfolio, tools })
  },

  async getPortfolioGallery(portfolioId: string) {
    const portfolio = await this.getPortfolioById(portfolioId)
    return portfolio?.gallery ?? []
  },

  async replacePortfolioGallery(portfolioId: string, gallery: PortfolioPayload['gallery']) {
    const portfolio = await this.getPortfolioById(portfolioId)
    if (!portfolio) {
      throw new Error('Portfolio not found.')
    }
    await this.updatePortfolio(portfolioId, { ...portfolio, gallery })
  },
}
