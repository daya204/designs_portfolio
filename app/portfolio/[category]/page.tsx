import { Navigation } from '@/components/Layout/Navigation'
import { getCategoryWithImages } from '@/lib/portfolio'
import CategoryGallery from '@/components/Portfolio/CategoryGallery'
import { PageContainer } from '@/components/Layout/PageContainer'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryData = await getCategoryWithImages(category)

  if (!categoryData) {
    return {
      title: 'Not Found',
      description: 'The portfolio category you are looking for does not exist.',
    }
  }

  return {
    title: `${categoryData.name} - Sahana Design Studio`,
    description: categoryData.description || `Browse ${categoryData.name} portfolio`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryData = await getCategoryWithImages(category)

  if (!categoryData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageContainer className="py-16 md:py-24">
        <CategoryGallery category={categoryData!} />
      </PageContainer>
    </div>
  )
}
