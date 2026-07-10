'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CategoryWithImages, PortfolioImage } from '@/lib/types'
import LightboxModal from './LightboxModal'
import ImageUploadModal from './ImageUploadModal'
import UploadSecretPrompt from './UploadSecretPrompt'
import { Button } from '@/components/ui/button'
import { useUploadAuth } from '@/hooks/use-upload-auth'
import { getStoredSecret } from '@/lib/upload-auth'
import { Trash2 } from 'lucide-react'

interface CategoryGalleryProps {
  category: CategoryWithImages
  onImageAdded?: () => void
}

export default function CategoryGallery({ category, onImageAdded }: CategoryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showSecretPrompt, setShowSecretPrompt] = useState(false)
  const [images, setImages] = useState(category.images)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { isAuthorized, isChecking, login } = useUploadAuth()

  const handleAddImageClick = () => {
    if (isAuthorized) {
      setShowUploadModal(true)
    } else {
      setShowSecretPrompt(true)
    }
  }

  const handleLogin = async (secret: string) => {
    const ok = await login(secret)
    if (ok) {
      setShowSecretPrompt(false)
      setShowUploadModal(true)
    }
    return ok
  }

  const handleImageAdded = (newImage: PortfolioImage) => {
    setImages((prev) => [newImage, ...prev])
    onImageAdded?.()
  }

  const handleDelete = async (image: PortfolioImage, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm(`Delete this image?`)) return

    const secret = getStoredSecret()
    if (!secret) return

    setDeletingId(image.id)
    try {
      const res = await fetch('/api/portfolio/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-upload-secret': secret,
        },
        body: JSON.stringify({ imageId: image.id, imageUrl: image.image_url }),
      })
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== image.id))
        if (selectedImage?.id === image.id) setSelectedImage(null)
      }
    } finally {
      setDeletingId(null)
    }
  }

  const handleImageClick = (image: PortfolioImage, index: number) => {
    setSelectedImage(image)
    setSelectedIndex(index)
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-light tracking-wider text-balance">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-foreground/60 mt-3 text-lg">{category.description}</p>
          )}
        </div>
        {/* Add Image button — only shown once auth is resolved */}
        {!isChecking && (
          <Button
            onClick={handleAddImageClick}
            className="whitespace-nowrap"
            variant="outline"
          >
            + Add Images
          </Button>
        )}
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
                <p className="text-sm font-light tracking-widest text-white">VIEW</p>
              </div>
              {/* Delete button (only for authorized users) */}
              {isAuthorized && (
                <button
                  onClick={(e) => handleDelete(image, e)}
                  disabled={deletingId === image.id}
                  className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-50"
                  title="Delete image"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-96 flex items-center justify-center bg-muted/50 rounded-lg">
          <div className="text-center">
            <p className="text-foreground/50 mb-4">No images yet</p>
            <Button onClick={handleAddImageClick}>Add First Image</Button>
          </div>
        </div>
      )}

      {/* Secret prompt */}
      {showSecretPrompt && (
        <UploadSecretPrompt
          onLogin={handleLogin}
          onCancel={() => setShowSecretPrompt(false)}
        />
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

      {/* Lightbox */}
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
