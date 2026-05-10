import Link from 'next/link'
import { Navigation } from '@/components/Layout/Navigation'
import { PageContainer } from '@/components/Layout/PageContainer'
import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'
import { getCategories } from '@/lib/portfolio'

export const metadata = {
  title: 'Portfolio - Sahana Design Studio',
  description: 'Explore our portfolio categories and design work',
}

export default async function PortfolioPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <Navigation />
      <PageContainer>
        <FadeInOnScroll>
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-light tracking-wider mb-4 text-balance">
              Portfolio
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl">
              Explore our design work across various specializations and projects
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/portfolio/${category.slug}`}>
              <div className="group relative bg-muted rounded-lg overflow-hidden aspect-square cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <h3 className="text-2xl font-light tracking-wide text-center text-foreground group-hover:text-accent transition-colors duration-300 text-balance">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-foreground/60 text-center mt-2">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </div>
  )
}
