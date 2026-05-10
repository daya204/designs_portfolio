import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'
import { PageContainer } from '@/components/Layout/PageContainer'

export default function AboutMeSection() {
  return (
    <section className="py-24 border-b border-border">
      <PageContainer>
        <FadeInOnScroll>
          <div className="max-w-4xl space-y-6">
            <p className="text-lg text-foreground/70 font-light leading-relaxed">
              At Sahana Design Studio, we specialize in creating professionally crafted fashion solutions for brands, startups, manufacturers, and clothing businesses. From concept development to final garment presentation, we bring designs to life with a strong focus on detail, aesthetics, and market trends.
            </p>
            <p className="text-lg text-foreground/70 font-light leading-relaxed">
              We believe every garment tells a story. Our design approach combines creativity, functionality, and modern fashion trends to create collections that are visually appealing, production-ready, and commercially successful.
            </p>
          </div>
        </FadeInOnScroll>
      </PageContainer>
    </section>
  )
}
