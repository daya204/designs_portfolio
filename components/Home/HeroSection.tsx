'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'
import { PageContainer } from '@/components/Layout/PageContainer'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="pt-32 pb-20">
      <PageContainer>
        <FadeInOnScroll>
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-light tracking-tighter text-foreground text-balance">
                SAHANA DESIGN STUDIO
              </h1>
              <div className="w-16 h-px bg-accent mx-auto" />
            </div>

            <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed tracking-wide">
              Fashion & Garment Design Excellence
            </p>

            <p className="text-base md:text-lg text-foreground/60 font-light leading-relaxed max-w-2xl mx-auto">
              Discover curated collections of premium fashion designs, innovative garment work, and creative branding solutions crafted with precision and passion.
            </p>

            <div className="pt-4">
              <Link
                href="/portfolio"
                className="inline-block px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-sm tracking-widest font-light"
              >
                VIEW PORTFOLIO
              </Link>
            </div>
          </div>
        </FadeInOnScroll>
      </PageContainer>
    </section>
  )
}
