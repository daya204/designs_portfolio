import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'
import { PageContainer } from '@/components/Layout/PageContainer'

export default function AboutHero() {
  return (
    <div className="pt-32 pb-20 border-b border-border">
      <PageContainer>
        <FadeInOnScroll>
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-light tracking-tighter text-foreground">
                About Sahana Design Studio
              </h1>
              <div className="w-16 h-px bg-accent" />
            </div>
            <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-3xl">
              Welcome to Sahana Design Studio — where creativity meets fashion innovation. We are a passionate garment design studio dedicated to transforming ideas into stylish, wearable collections with precision, trend awareness, and artistic excellence.
            </p>
          </div>
        </FadeInOnScroll>
      </PageContainer>
    </div>
  )
}
