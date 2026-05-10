export interface Category {
  id: string
  name: string
  slug: string
  description: string
  display_order: number
  created_at: string
  updated_at: string
}

export interface PortfolioImage {
  id: string
  category_id: string
  image_url: string
  title: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export interface CategoryWithImages extends Category {
  images: PortfolioImage[]
}
