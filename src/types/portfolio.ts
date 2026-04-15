export type PortfolioStatus = 'draft' | 'publish'

export interface PortfolioTool {
  id?: string
  tool_name: string
  sort_order: number
  created_at?: string
}

export interface PortfolioGalleryItem {
  id?: string
  image_url: string
  caption?: string | null
  sort_order: number
  created_at?: string
}

export interface Portfolio {
  id: string
  title: string
  slug: string
  category: string
  short_description: string
  overview: string
  role: string
  timeline: string
  status: PortfolioStatus
  featured: boolean
  thumbnail_url: string
  cover_image_url?: string | null
  problem_statement: string
  goals: string
  process: string
  solution: string
  result: string
  lessons_learned?: string | null
  created_by?: string | null
  created_at?: string
  updated_at?: string
  tools: PortfolioTool[]
  gallery: PortfolioGalleryItem[]
}

export interface DashboardStats {
  total: number
  published: number
  draft: number
}

export type PortfolioPayload = Omit<Portfolio, 'id' | 'created_at' | 'updated_at' | 'created_by'>

export interface PortfolioFormValues {
  title: string
  slug: string
  category: string
  short_description: string
  overview: string
  role: string
  timeline: string
  status: PortfolioStatus
  featured: boolean
  thumbnail_url: string
  cover_image_url: string
  problem_statement: string
  goals: string
  process: string
  solution: string
  result: string
  lessons_learned: string
  tools: Array<{
    name: string
  }>
  gallery: Array<{
    image_url: string
    caption: string
  }>
}
