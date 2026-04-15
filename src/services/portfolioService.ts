import { supabase } from '../config/supabase'
import type { DashboardStats, Portfolio, PortfolioGalleryItem, PortfolioPayload, PortfolioTool } from '../types/portfolio'

const portfolioSelect = `
  *,
  portfolio_tools (
    id,
    tool_name,
    sort_order,
    created_at
  ),
  portfolio_gallery (
    id,
    image_url,
    caption,
    sort_order,
    created_at
  )
`

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
    tools: normalizeTools(row.portfolio_tools),
    gallery: normalizeGallery(row.portfolio_gallery),
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
  if (!supabase) {
    return []
  }

  let query = supabase.from('portfolios').select(portfolioSelect).order('updated_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return (data ?? []).map((row) => normalizePortfolio(row as Record<string, unknown>))
}

async function querySinglePortfolio(column: 'id' | 'slug', value: string) {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('portfolios')
    .select(portfolioSelect)
    .eq(column, value)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data ? normalizePortfolio(data as Record<string, unknown>) : null
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

function mapTools(payload: PortfolioPayload['tools'], portfolioId: string) {
  return payload.map((tool, index) => ({
    portfolio_id: portfolioId,
    tool_name: tool.tool_name,
    sort_order: index,
  }))
}

function mapGallery(payload: PortfolioPayload['gallery'], portfolioId: string) {
  return payload
    .filter((item) => item.image_url)
    .map((item, index) => ({
      portfolio_id: portfolioId,
      image_url: item.image_url,
      caption: item.caption || null,
      sort_order: index,
    }))
}

function assertSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. CRUD actions are unavailable.')
  }

  return supabase
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
    const client = assertSupabase()
    const { data: authData } = await client.auth.getUser()

    const { data, error } = await client
      .from('portfolios')
      .insert({
        ...mapPortfolioPayload(payload),
        created_by: authData.user?.id ?? null,
      })
      .select('id')
      .single()

    if (error) {
      throw error
    }

    await this.replacePortfolioTools(data.id, payload.tools)
    await this.replacePortfolioGallery(data.id, payload.gallery)

    const created = await this.getPortfolioById(data.id)
    if (!created) {
      throw new Error('Portfolio was created but could not be loaded.')
    }

    return created
  },

  async updatePortfolio(id: string, payload: PortfolioPayload) {
    const client = assertSupabase()
    const { error } = await client.from('portfolios').update(mapPortfolioPayload(payload)).eq('id', id)

    if (error) {
      throw error
    }

    await this.replacePortfolioTools(id, payload.tools)
    await this.replacePortfolioGallery(id, payload.gallery)

    const updated = await this.getPortfolioById(id)
    if (!updated) {
      throw new Error('Portfolio was updated but could not be loaded.')
    }

    return updated
  },

  async deletePortfolio(id: string) {
    const client = assertSupabase()
    const { error } = await client.from('portfolios').delete().eq('id', id)

    if (error) {
      throw error
    }
  },

  async getPortfolioTools(portfolioId: string) {
    const portfolio = await this.getPortfolioById(portfolioId)
    return portfolio?.tools ?? []
  },

  async replacePortfolioTools(portfolioId: string, tools: PortfolioPayload['tools']) {
    const client = assertSupabase()
    const { error: deleteError } = await client.from('portfolio_tools').delete().eq('portfolio_id', portfolioId)

    if (deleteError) {
      throw deleteError
    }

    if (tools.length === 0) {
      return
    }

    const { error } = await client.from('portfolio_tools').insert(mapTools(tools, portfolioId))

    if (error) {
      throw error
    }
  },

  async getPortfolioGallery(portfolioId: string) {
    const portfolio = await this.getPortfolioById(portfolioId)
    return portfolio?.gallery ?? []
  },

  async replacePortfolioGallery(portfolioId: string, gallery: PortfolioPayload['gallery']) {
    const client = assertSupabase()
    const { error: deleteError } = await client.from('portfolio_gallery').delete().eq('portfolio_id', portfolioId)

    if (deleteError) {
      throw deleteError
    }

    const preparedGallery = mapGallery(gallery, portfolioId)

    if (preparedGallery.length === 0) {
      return
    }

    const { error } = await client.from('portfolio_gallery').insert(preparedGallery)

    if (error) {
      throw error
    }
  },
}
