import { createClient } from '@/lib/supabase/server'
import { Category, PortfolioImage, CategoryWithImages } from './types'
import { PORTFOLIO_ITEMS } from './portfolio-data'

export async function getCategories(): Promise<Category[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Return hardcoded categories if Supabase not configured
    return [
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
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }

  return data
}

export async function getImagesByCategory(categoryId: string): Promise<PortfolioImage[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portfolio_images')
    .select('*')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching images:', error)
    return []
  }

  return data || []
}

export async function getCategoryWithImages(slug: string): Promise<CategoryWithImages | null> {
  const hardcodedCategories = [
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

  const category =
    (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      ? hardcodedCategories.find((c) => c.slug === slug)
      : (await getCategoryBySlug(slug)) ?? hardcodedCategories.find((c) => c.slug === slug)

  if (!category) return null

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Use hardcoded images
    const images = PORTFOLIO_ITEMS
      .filter(
        (item) =>
          item.category
            .toLowerCase()
            .replace(/ & /g, '-')
            .replace(/ /g, '-') === slug.toLowerCase()
      )
      .map((item) => ({
        id: item.id,
        category_id: category.id,
        image_url: item.image,
        title: item.title,
        description: item.description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))
    return {
      ...category,
      images,
    }
  }

  const images = await getImagesByCategory(category.id)
  return {
    ...category,
    images,
  }
}

export async function uploadImage(
  categoryId: string,
  file: File,
  title?: string,
  description?: string
): Promise<PortfolioImage | null> {
  const supabase = await createClient()

  // Generate a unique filename
  const timestamp = Date.now()
  const fileName = `${categoryId}/${timestamp}-${file.name}`

  // Upload file to storage
  const { error: uploadError } = await supabase.storage
    .from('portfolio-images')
    .upload(fileName, file)

  if (uploadError) {
    console.error('Error uploading file:', uploadError)
    return null
  }

  // Get public URL
  const { data } = supabase.storage
    .from('portfolio-images')
    .getPublicUrl(fileName)

  // Create database record
  const { data: imageData, error: dbError } = await supabase
    .from('portfolio_images')
    .insert({
      category_id: categoryId,
      image_url: data.publicUrl,
      title: title || null,
      description: description || null,
    })
    .select()
    .single()

  if (dbError) {
    console.error('Error creating image record:', dbError)
    return null
  }

  return imageData
}
