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
import { Trash2, X, CheckCircle2 } from 'lucide-react'

interface CategoryGalleryProps {
  category: CategoryWithImages
  onImageAdded?: () => void
}

type PendingAction = 'upload' | 'delete' | null

export default function CategoryGallery({ category, onImageAdded }: CategoryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showSecretPrompt, setShowSecretPrompt] = useState(false)
  const [pendingAction, setPendingAction] = useState<PendingAction>(null)
  const [images, setImages] = useState(category.images)
  const [deleteMode, setDeleteMode] = useState(false)
  const [selectedForDelete, setSelectedForDelete] = useState<Set<string>>(new Set())
  const [isDeleting, setIsDeleting] = useState(false)

  const { isAuthorized, isChecking, login } = useUploadAuth()

  // --- Auth flow ---
  const requireAuth = (action: PendingAction) => {
    if (isAuthorized) {
      triggerAction(action)
    } else {
      setPendingAction(action)
      setShowSecretPrompt(true)
    }
  }

  const triggerAction = (action: PendingAction) => {
    if (action === 'upload') setShowUploadModal(true)
    if (action === 'delete') setDeleteMode(true)
  }

  const handleLogin = async (secret: string) => {
    const ok = await login(secret)
    if (ok) {
      setShowSecretPrompt(false)
      triggerAction(pendingAction)
      setPendingAction(null)
    }
    return ok
  }

  // --- Upload ---
  const handleImageAdded = (newImage: PortfolioImage) => {
    setImages((prev) => [newImage, ...prev])
    onImageAdded?.()
  }

  // --- Delete mode ---
  const toggleSelectForDelete = (id: string) => {
    setSelectedForDelete((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleCancelDelete = () => {
    setDeleteMode(false)
    setSelectedForDelete(new Set())
  }

  const handleConfirmDelete = async () => {
    if (selectedForDelete.size === 0) return
    const secret = getStoredSecret()
    if (!secret) return

    setIsDeleting(true)
    const toDelete = images.filter((img) => selectedForDelete.has(img.id))

    for (const image of toDelete) {
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
        }
      } catch (e) {
        console.error('Delete failed for', image.id, e)
      }
    }

    setIsDeleting(false)
    setDeleteMode(false)
    setSelectedForDelete(new Set())
  }

  // --- Lightbox ---
  const handleImageClick = (image: PortfolioImage, index: number) => {
    if (deleteMode) {
      toggleSelectForDelete(image.id)
      return
    }
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

        {!isChecking && (
          <div className="flex items-center gap-3">
            {deleteMode ? (
              /* Delete mode controls */
              <>
                <span className="text-sm text-foreground/60">
                  {selectedForDelete.size} selected
                </span>
                <Button
                  variant="outline"
                  onClick={handleCancelDelete}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting || selectedForDelete.size === 0}
                  className="gap-2"
                >
                  <Trash2 size={15} />
                  {isDeleting ? 'Deleting...' : `Delete ${selectedForDelete.size > 0 ? selectedForDelete.size : ''}`}
                </Button>
              </>
            ) : (
              /* Normal controls */
              <>
                <Button
                  onClick={() => requireAuth('upload')}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  + Add Images
                </Button>
                {images.length > 0 && (
                  <Button
                    onClick={() => requireAuth('delete')}
                    variant="outline"
                    className="whitespace-nowrap gap-2 text-red-500 border-red-200 hover:bg-red-50 hover:border-red-400"
                  >
                    <Trash2 size={15} />
                    Delete Images
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Delete mode hint */}
      {deleteMode && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          Tap images to select them for deletion, then click <strong>Delete</strong> to confirm.
        </div>
      )}

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((image, index) => {
            const isSelected = selectedForDelete.has(image.id)
            return (
              <div
                key={image.id}
                className={`group relative aspect-square overflow-hidden bg-muted cursor-pointer transition-all duration-200 ${
                  deleteMode && isSelected ? 'ring-4 ring-red-500 opacity-70' : ''
                }`}
                onClick={() => handleImageClick(image, index)}
              >
                <Image
                  src={image.image_url}
                  alt={image.title || 'Portfolio image'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Normal hover overlay */}
                {!deleteMode && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-sm font-light tracking-widest text-white">VIEW</p>
                  </div>
                )}

                {/* Delete mode overlay */}
                {deleteMode && (
                  <div className={`absolute inset-0 transition-opacity duration-200 flex items-center justify-center ${isSelected ? 'bg-red-500/30 opacity-100' : 'bg-black/20 opacity-0 group-hover:opacity-100'}`}>
                    {isSelected ? (
                      <CheckCircle2 size={40} className="text-white drop-shadow" />
                    ) : (
                      <div className="w-8 h-8 rounded-full border-2 border-white/80 bg-black/20" />
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="min-h-96 flex items-center justify-center bg-muted/50 rounded-lg">
          <div className="text-center">
            <p className="text-foreground/50 mb-4">No images yet</p>
            <Button onClick={() => requireAuth('upload')}>Add First Image</Button>
          </div>
        </div>
      )}

      {/* Secret prompt */}
      {showSecretPrompt && (
        <UploadSecretPrompt
          onLogin={handleLogin}
          onCancel={() => { setShowSecretPrompt(false); setPendingAction(null) }}
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
      {selectedImage && !deleteMode && (
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
