import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'
import { PageContainer } from '@/components/Layout/PageContainer'

const highlights = [
  'Market-aware collections designed for modern brands.',
  'Production-ready artwork and tech-pack support.',
  'Designs crafted with precision, quality, and commercial impact.',
  'Dedicated service for brands, startups, manufacturers, and retailers.',
]

export default function AboutMeSection() {
  return (
    <section className="py-24 border-b border-border">
      <PageContainer>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.9fr] items-start">
          <FadeInOnScroll>
            <div className="space-y-8">
              <div className="space-y-6 max-w-3xl">
                <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed tracking-wide">
                  At Sahana Design Studio, we specialize in creating professionally crafted fashion solutions for brands, startups, manufacturers, and clothing businesses. From concept development to final garment presentation, we bring designs to life with a strong focus on detail, aesthetics, and market trends.
                </p>
                <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed tracking-wide">
                  We believe every garment tells a story. Our design approach combines creativity, functionality, and modern fashion trends to create collections that are visually appealing, production-ready, and commercially successful.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {highlights.map((text) => (
                  <div
                    key={text}
                    className="rounded-3xl border border-border bg-muted/70 p-6 text-sm text-foreground/70 transition-transform duration-300 hover:-translate-y-1 hover:bg-muted"
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={100}>
            <div className="rounded-[2rem] border border-border bg-foreground/5 p-8 shadow-lg shadow-black/5 transition-transform duration-300 hover:-translate-y-1">
              <div className="space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-accent/90">Studio Focus</p>
                  <h2 className="mt-4 text-3xl md:text-4xl font-light text-foreground">
                    Elegant design systems with strong commercial appeal.
                  </h2>
                </div>

                <div className="space-y-4 text-foreground/70 font-light leading-relaxed">
                  <p>
                    Every project is delivered with careful attention to fit, fabric, and finish so that your collection is ready for presentation and production.
                  </p>
                  <p>
                    Our work is built to stand out in the market through thoughtful styling, polished visuals, and design details that communicate quality.
                  </p>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </PageContainer>
    </section>
  )
}
