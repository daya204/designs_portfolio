'use client'

import { CATEGORIES, PortfolioCategory } from '@/lib/portfolio-data'

interface CategoryTabsProps {
  activeCategory: PortfolioCategory
  onCategoryChange: (category: PortfolioCategory) => void
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`text-sm font-light tracking-wide transition-all px-4 py-2 rounded-sm ${
            activeCategory === category
              ? 'bg-foreground text-background'
              : 'border border-border text-foreground/70 hover:text-foreground hover:border-foreground'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
