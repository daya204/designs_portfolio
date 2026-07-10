import { createPublicClient } from '@/lib/supabase/public'
import { Category, PortfolioImage, CategoryWithImages } from './types'
import { PORTFOLIO_ITEMS } from './portfolio-data'

const HARDCODED_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Kids Wear',
    slug: 'kids-wear',
    description: 'Playful fashion for children',
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Infant Wear',
    slug: 'infant-wear',
    description: 'Comfortable infant clothing collections',
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Men Wear',
    slug: 'men-wear',
    description: 'Elegant menswear and tailored outfits',
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Women Wear',
    slug: 'women-wear',
    description: 'Chic womenswear collections for modern style',
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Home Textile',
    slug: 'home-textile',
    description: 'Luxury home textiles and décor fabrics',
    display_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Logo & Branding',
    slug: 'logo-branding',
    description: 'Brand identity and logo design work',
    display_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Flat Sketches',
    slug: 'flat-sketches',
    description: 'Technical flat sketches for styling and patterns',
    display_order: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Patterns',
    slug: 'patterns',
    description: 'Textile pattern designs and repeat artwork',
    display_order: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

function isSupabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return HARDCODED_CATEGORIES

  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true })

    if (error || !data || data.length === 0) {
      console.warn('Supabase categories unavailable, using fallback:', error?.message)
      return HARDCODED_CATEGORIES
    }

    return data
  } catch (e) {
    console.warn('Supabase error, using fallback:', e)
    return HARDCODED_CATEGORIES
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isSupabaseConfigured()) {
    return HARDCODED_CATEGORIES.find((c) => c.slug === slug) ?? null
  }

  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      console.warn('getCategoryBySlug error:', error.message)
      return null
    }

    return data ?? null
  } catch (e) {
    console.warn('getCategoryBySlug exception:', e)
    return null
  }
}

export async function getImagesByCategory(categoryId: string): Promise<PortfolioImage[]> {
  if (!isSupabaseConfigured()) return []

  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('portfolio_images')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching images:', error.message)
      return []
    }

    return data || []
  } catch {
    return []
  }
}

export async function getCategoryWithImages(slug: string): Promise<CategoryWithImages | null> {
  const category = await getCategoryBySlug(slug)
  if (!category) return null

  if (isSupabaseConfigured()) {
    const images = await getImagesByCategory(category.id)
    return { ...category, images }
  }

  // Fallback: hardcoded placeholder images
  const images = PORTFOLIO_ITEMS.filter(
    (item) =>
      item.category
        .toLowerCase()
        .replace(/ & /g, '-')
        .replace(/ /g, '-') === slug.toLowerCase(),
  ).map((item) => ({
    id: item.id,
    category_id: category.id,
    image_url: item.image,
    title: item.title,
    description: item.description,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }))
  return { ...category, images }
}
