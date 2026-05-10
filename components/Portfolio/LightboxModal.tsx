'use client'

import Image from 'next/image'
import { PortfolioImage } from '@/lib/types'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'

interface LightboxModalProps {
  image: PortfolioImage
  images: PortfolioImage[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  canShowPrev: boolean
  canShowNext: boolean
}

export default function LightboxModal({
  image,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  canShowPrev,
  canShowNext,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && canShowPrev) onPrev()
      if (e.key === 'ArrowRight' && canShowNext) onNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [onClose, onPrev, onNext, canShowPrev, canShowNext])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:bg-white/10 p-2 rounded-full transition-colors z-10"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        disabled={!canShowPrev}
        className={`absolute left-4 p-2 rounded-full transition-colors ${
          canShowPrev
            ? 'text-white hover:bg-white/10 cursor-pointer'
            : 'text-white/30 cursor-not-allowed'
        }`}
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        disabled={!canShowNext}
        className={`absolute right-4 p-2 rounded-full transition-colors ${
          canShowNext
            ? 'text-white hover:bg-white/10 cursor-pointer'
            : 'text-white/30 cursor-not-allowed'
        }`}
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Content */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-96 md:h-[500px] flex items-center justify-center">
          <Image
            src={image.image_url}
            alt={image.title || 'Portfolio image'}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Info */}
        <div className="text-center text-white mt-6 space-y-2">
          {image.title && <h3 className="text-lg font-light tracking-wide">{image.title}</h3>}
          {image.description && (
            <p className="text-sm text-white/70 font-light">{image.description}</p>
          )}
          <p className="text-xs text-white/50 font-light tracking-widest">
            {currentIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  )
}
