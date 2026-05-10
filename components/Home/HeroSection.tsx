'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center pt-16 px-4 bg-background relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {/* Main Content */}
        <div
          className={`text-center space-y-8 max-w-2xl transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
        {/* Logo/Brand */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-foreground text-balance">
            SAHANA DESIGNS
          </h1>
          <div className="w-16 h-px bg-accent mx-auto" />
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl font-light text-foreground/70 tracking-wide">
          Fashion & Garment Design Excellence
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-foreground/60 font-light leading-relaxed max-w-xl mx-auto">
          Discover curated collections of premium fashion designs, innovative garment work, and creative branding solutions crafted with precision and passion.
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <Link
            href="/portfolio"
            className="inline-block px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-sm tracking-widest font-light"
          >
            VIEW PORTFOLIO
          </Link>
        </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 z-10 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-xs text-foreground/50 tracking-widest">SCROLL</span>
            <div className="w-0.5 h-6 bg-foreground/50" />
          </div>
        </div>
      </div>
    </div>
  )
}
