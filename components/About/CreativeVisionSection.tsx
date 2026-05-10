import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'
import { PageContainer } from '@/components/Layout/PageContainer'

export default function CreativeVisionSection() {
  return (
    <section className="py-24">
      <PageContainer>
        <FadeInOnScroll>
          <div className="max-w-3xl space-y-8">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
                Our Mission
              </h2>
              <div className="w-16 h-px bg-accent" />
            </div>

            <div className="space-y-6 text-foreground/70 font-light leading-relaxed text-lg">
              <p>
                Our mission is to help fashion brands and businesses turn their vision into impactful collections that stand out with style and confidence.
              </p>

              <blockquote className="border-l-2 border-accent pl-6 italic text-xl">
                "Designing fashion with creativity, precision, and passion."
              </blockquote>
            </div>
          </div>
        </FadeInOnScroll>
      </PageContainer>
    </section>
  )
}
