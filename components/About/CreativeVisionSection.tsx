import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'
import { PageContainer } from '@/components/Layout/PageContainer'

export default function CreativeVisionSection() {
  return (
    <section className="py-24">
      <PageContainer>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <FadeInOnScroll>
            <div className="space-y-6 max-w-3xl">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.4em] text-accent/80">
                  Mission
                </p>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
                  Our mission is to help fashion brands and businesses turn their vision into impactful collections that stand out with style and confidence.
                </h2>
              </div>

              <p className="text-lg text-foreground/70 font-light leading-relaxed">
                We believe every design should be both beautiful and wearable. By combining creativity, precision, and passion, we deliver fashion solutions that resonate with customers and perform in the market.
              </p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={100}>
            <div className="rounded-[2rem] border border-border bg-muted/60 p-8 shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-1">
              <div className="space-y-6">
                <div className="text-foreground/70 leading-relaxed text-base">
                  <p>
                    Our design process is built around collaboration, accuracy, and visual refinement — so every collection feels thoughtful, polished, and ready for presentation.
                  </p>
                </div>
                <blockquote className="rounded-3xl border border-accent/20 bg-white/5 p-6 text-2xl italic text-foreground/90">
                  "Designing fashion with creativity, precision, and passion."
                </blockquote>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </PageContainer>
    </section>
  )
}
