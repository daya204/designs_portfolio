export type PortfolioCategory = 'Kids Wear' | 'Infant Wear' | 'Men Wear' | 'Women Wear' | 'Home Textile' | 'Logo & Branding' | 'Flat Sketches' | 'Patterns'

export interface PortfolioItem {
  id: string
  title: string
  category: PortfolioCategory
  image: string
  description: string
}

// Placeholder portfolio data - replace with actual images
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Kids Wear
  {
    id: 'kids-1',
    title: 'Playful Summer Collection',
    category: 'Kids Wear',
    image: 'https://images.unsplash.com/photo-1503454537688-e6694a914d47?w=500&h=500&fit=crop',
    description: 'Colorful and comfortable summer wear for children',
  },
  {
    id: 'kids-2',
    title: 'School Wear Series',
    category: 'Kids Wear',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: 'Durable and stylish school uniforms',
  },
  {
    id: 'kids-3',
    title: 'Festival Collection',
    category: 'Kids Wear',
    image: 'https://images.unsplash.com/photo-1503454537688-e6694a914d47?w=500&h=500&fit=crop',
    description: 'Festive wear with traditional influences',
  },

  // Infant Wear
  {
    id: 'infant-1',
    title: 'Soft Cotton Basics',
    category: 'Infant Wear',
    image: 'https://images.unsplash.com/photo-1487537763898-cc1a59ee0739?w=500&h=500&fit=crop',
    description: 'Gentle and breathable infant clothing',
  },
  {
    id: 'infant-2',
    title: 'Newborn Essentials',
    category: 'Infant Wear',
    image: 'https://images.unsplash.com/photo-1503454537688-e6694a914d47?w=500&h=500&fit=crop',
    description: 'Premium comfort for babies',
  },
  {
    id: 'infant-3',
    title: 'Layering Collection',
    category: 'Infant Wear',
    image: 'https://images.unsplash.com/photo-1487537763898-cc1a59ee0739?w=500&h=500&fit=crop',
    description: 'Versatile pieces for all seasons',
  },

  // Men Wear
  {
    id: 'men-1',
    title: 'Formal Wear',
    category: 'Men Wear',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    description: 'Elegant formal wear collection',
  },
  {
    id: 'men-2',
    title: 'Casual Wear',
    category: 'Men Wear',
    image: 'https://images.unsplash.com/photo-1507238691169-30f46afb9b0e?w=500&h=500&fit=crop',
    description: 'Comfortable everyday clothing',
  },
  {
    id: 'men-3',
    title: 'Sports Collection',
    category: 'Men Wear',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    description: 'High-performance athletic wear',
  },

  // Women Wear
  {
    id: 'women-1',
    title: 'Evening Gowns',
    category: 'Women Wear',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: 'Sophisticated evening wear',
  },
  {
    id: 'women-2',
    title: 'Casual Elegance',
    category: 'Women Wear',
    image: 'https://images.unsplash.com/photo-1595777707802-e176fc7f913f?w=500&h=500&fit=crop',
    description: 'Modern casual collection',
  },
  {
    id: 'women-3',
    title: 'Traditional Wear',
    category: 'Women Wear',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop',
    description: 'Ethnic and traditional designs',
  },

  // Home Textile
  {
    id: 'home-1',
    title: 'Bedding Collection',
    category: 'Home Textile',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
    description: 'Premium home textiles',
  },
  {
    id: 'home-2',
    title: 'Curtain Design',
    category: 'Home Textile',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop',
    description: 'Elegant window treatments',
  },
  {
    id: 'home-3',
    title: 'Upholstery Fabrics',
    category: 'Home Textile',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
    description: 'Durable furnishing fabrics',
  },

  // Logo & Branding
  {
    id: 'brand-1',
    title: 'Fashion Brand Identity',
    category: 'Logo & Branding',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    description: 'Complete brand identity system',
  },
  {
    id: 'brand-2',
    title: 'Logo Design',
    category: 'Logo & Branding',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    description: 'Modern logo concepts',
  },
  {
    id: 'brand-3',
    title: 'Branding Guidelines',
    category: 'Logo & Branding',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    description: 'Comprehensive brand guidelines',
  },

  // Flat Sketches
  {
    id: 'sketch-1',
    title: 'Fashion Illustration 01',
    category: 'Flat Sketches',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    description: 'Detailed flat sketches',
  },
  {
    id: 'sketch-2',
    title: 'Fashion Illustration 02',
    category: 'Flat Sketches',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    description: 'Technical fashion drawings',
  },
  {
    id: 'sketch-3',
    title: 'Collection Sketches',
    category: 'Flat Sketches',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    description: 'Full collection sketches',
  },

  // Patterns
  {
    id: 'pattern-1',
    title: 'Print Pattern 01',
    category: 'Patterns',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Original pattern designs',
  },
  {
    id: 'pattern-2',
    title: 'Print Pattern 02',
    category: 'Patterns',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Textile patterns',
  },
  {
    id: 'pattern-3',
    title: 'Print Pattern 03',
    category: 'Patterns',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Decorative patterns',
  },
]

export const CATEGORIES: PortfolioCategory[] = [
  'Kids Wear',
  'Infant Wear',
  'Men Wear',
  'Women Wear',
  'Home Textile',
  'Logo & Branding',
  'Flat Sketches',
  'Patterns',
]
