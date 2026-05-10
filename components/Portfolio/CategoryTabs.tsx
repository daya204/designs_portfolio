'use client'

import { CATEGORIES, PortfolioCategory } from '@/lib/portfolio-data'

interface CategoryTabsProps {
  activeCategory: PortfolioCategory
  onCategoryChange: (category: PortfolioCategory) => void
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`relative px-6 py-3 text-sm font-light tracking-wide transition-all duration-300 rounded-full ${
            activeCategory === category
              ? 'bg-accent text-background shadow-lg shadow-accent/30'
              : 'border border-foreground/20 text-foreground/70 hover:text-foreground hover:border-accent hover:bg-accent/5 backdrop-blur-sm'
          }`}
        >
          {category}
          {activeCategory === category && (
            <span className="absolute inset-0 rounded-full border border-accent/30 animate-pulse" />
          )}
        </button>
      ))}
    </div>
  )
}
