'use client'

import { PortfolioItem } from '@/lib/portfolio-data'
import { ImageCard } from './ImageCard'

interface GalleryGridProps {
  items: PortfolioItem[]
  onImageClick: (item: PortfolioItem) => void
}

export function GalleryGrid({ items, onImageClick }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-foreground/50 font-light">No items in this category</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
      {items.map((item) => (
        <ImageCard key={item.id} item={item} onClick={() => onImageClick(item)} />
      ))}
    </div>
  )
}
