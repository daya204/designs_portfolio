'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CategoryWithImages, PortfolioImage } from '@/lib/types'
import LightboxModal from './LightboxModal'
import ImageUploadModal from './ImageUploadModal'
import { Button } from '@/components/ui/button'

interface CategoryGalleryProps {
  category: CategoryWithImages
  onImageAdded?: () => void
}

export default function CategoryGallery({
  category,
  onImageAdded,
}: CategoryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [images, setImages] = useState(category.images)

  const handleImageClick = (image: PortfolioImage, index: number) => {
    setSelectedImage(image)
    setSelectedIndex(index)
  }

  const handleImageAdded = (newImage: PortfolioImage) => {
    setImages([newImage, ...images])
    setShowUploadModal(false)
    onImageAdded?.()
  }

  const handlePrevImage = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1
      setSelectedIndex(newIndex)
      setSelectedImage(images[newIndex])
    }
  }

  const handleNextImage = () => {
    if (selectedIndex < images.length - 1) {
      const newIndex = selectedIndex + 1
      setSelectedIndex(newIndex)
      setSelectedImage(images[newIndex])
    }
  }

  return (
    <div className="w-full">
      {/* Header with title and upload button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-light tracking-wider text-balance">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-foreground/60 mt-3 text-lg">{category.description}</p>
          )}
        </div>
        <Button
          onClick={() => setShowUploadModal(true)}
          className="whitespace-nowrap"
          variant="outline"
        >
          + Add Image
        </Button>
      </div>

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden bg-muted cursor-pointer"
              onClick={() => handleImageClick(image, index)}
            >
              <Image
                src={image.image_url}
                alt={image.title || 'Portfolio image'}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-sm font-light tracking-widest">VIEW</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-96 flex items-center justify-center bg-muted/50 rounded-lg">
          <div className="text-center">
            <p className="text-foreground/50 mb-4">No images yet</p>
            <Button onClick={() => setShowUploadModal(true)}>Add First Image</Button>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <ImageUploadModal
          categoryId={category.id}
          categoryName={category.name}
          onClose={() => setShowUploadModal(false)}
          onImageAdded={handleImageAdded}
        />
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <LightboxModal
          image={selectedImage}
          images={images}
          currentIndex={selectedIndex}
          onClose={() => setSelectedImage(null)}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          canShowPrev={selectedIndex > 0}
          canShowNext={selectedIndex < images.length - 1}
        />
      )}
    </div>
  )
}
