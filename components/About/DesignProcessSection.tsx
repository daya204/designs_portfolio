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
          <div className="space-y-5 mb-12 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-accent/80">
              Expertise
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
              What We Do Best
            </h2>
            <p className="text-lg text-foreground/70 font-light leading-relaxed">
              From idea to finished collection, we provide a full range of fashion design services that support every step of the creative and production process.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item, index) => (
            <FadeInOnScroll key={item} delay={index * 60}>
              <div className="group rounded-[2rem] border border-border bg-muted/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent hover:bg-muted/70">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-accent">0{index + 1}</span>
                  <div className="h-10 w-10 rounded-3xl border border-border bg-foreground/5 transition group-hover:bg-accent/10" />
                </div>
                <p className="mt-6 text-base text-foreground/80 font-light leading-relaxed">
                  {item}
                </p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
