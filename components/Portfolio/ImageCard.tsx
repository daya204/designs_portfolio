'use client'

import Image from 'next/image'
import { PortfolioItem } from '@/lib/portfolio-data'

interface ImageCardProps {
  item: PortfolioItem
  onClick: () => void
}

export function ImageCard({ item, onClick }: ImageCardProps) {
  return (
    <button
      onClick={onClick}
      className="group overflow-hidden aspect-square rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      <div className="relative w-full h-full bg-muted">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white">
            <h3 className="text-sm font-light tracking-wide">{item.title}</h3>
            <p className="text-xs text-white/70 font-light">{item.description}</p>
          </div>
        </div>
      </div>
    </button>
  )
}
