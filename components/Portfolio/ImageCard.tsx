'use client'

import Image from 'next/image'
import { PortfolioItem } from '@/lib/portfolio-data'

interface ImageCardProps {
  item: PortfolioItem
  onClick: () => void
}

export function ImageCard({ item, onClick }: ImageCardProps) {
  return (
    <div
      className="group relative aspect-square overflow-hidden cursor-pointer rounded-2xl bg-muted shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-accent border border-transparent"
      onClick={onClick}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start">
        <div className="p-6 text-white space-y-2 w-full">
          <p className="text-sm font-light tracking-widest uppercase">View</p>
          {item.title && <p className="text-base font-light truncate">{item.title}</p>}
        </div>
      </div>
    </div>
  )
}
