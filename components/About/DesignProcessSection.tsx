import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'
import { PageContainer } from '@/components/Layout/PageContainer'

export default function DesignProcessSection() {
  const expertise = [
    'Flat Sketch Development',
    'Men\'s Wear Collections',
    'Women\'s Wear Collections',
    'Kidswear & Infant Wear Design',
    'Textile Print Design',
    'Tech Pack Creation',
    'Graphic Designing for Fashion',
    'T-Shirt Mockups & Presentation Artwork',
    'Fashion Illustration & Collection Development',
  ]

  return (
    <section className="py-24 border-b border-border">
      <PageContainer>
        <FadeInOnScroll>
          <div className="space-y-3 mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
              Our Expertise
            </h2>
            <div className="w-16 h-px bg-accent" />
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={100}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, index) => (
              <div key={item} className="space-y-2">
                <div className="text-sm font-light text-foreground/60 border border-border px-4 py-3 rounded-sm hover:bg-muted/50 transition-colors">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </FadeInOnScroll>
      </PageContainer>
    </section>
  )
}
