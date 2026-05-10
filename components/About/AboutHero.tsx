import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'
import { PageContainer } from '@/components/Layout/PageContainer'

export default function AboutHero() {
  return (
    <div className="pt-32 pb-20 border-b border-border">
      <PageContainer>
        <FadeInOnScroll>
          <div className="space-y-10 max-w-4xl">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-light tracking-tighter text-foreground">
                About Sahana Design Studio
              </h1>
              <div className="w-20 h-px bg-accent" />
            </div>

            <p className="text-xl md:text-2xl text-foreground/70 font-light leading-relaxed tracking-wide max-w-3xl">
              Welcome to Sahana Design Studio — where creativity meets fashion innovation. We are a passionate garment design studio dedicated to transforming ideas into stylish, wearable collections with precision, trend awareness, and artistic excellence.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 max-w-3xl">
              {[
                'Creative fashion concepts',
                'Production-ready garment design',
                'Trend-aware collections',
                'Precision-driven finishes',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-border bg-muted/70 p-5 text-sm text-foreground/70 transition hover:-translate-y-1 hover:border-accent hover:text-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </FadeInOnScroll>
      </PageContainer>
    </div>
  )
}
