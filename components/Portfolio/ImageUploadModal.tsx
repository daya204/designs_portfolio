'use client'

import { useState, useRef } from 'react'
import { PortfolioImage } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { X, Upload } from 'lucide-react'

interface ImageUploadModalProps {
  categoryId: string
  categoryName: string
  onClose: () => void
  onImageAdded: (image: PortfolioImage) => void
}

export default function ImageUploadModal({
  categoryId,
  categoryName,
  onClose,
  onImageAdded,
}: ImageUploadModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setFileName(file.name)
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        fileInputRef.current.files = dataTransfer.files
      }
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const file = fileInputRef.current?.files?.[0]
    if (!file) {
      setError('Please select an image')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('categoryId', categoryId)
      formData.append('title', title)
      formData.append('description', description)

      const response = await fetch('/api/portfolio/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Upload failed')
      }

      const { image } = await response.json()
      onImageAdded(image)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-md w-full relative max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border flex items-center justify-between p-6">
          <h2 className="text-xl font-light tracking-wider">Add Image</h2>
          <button
            onClick={onClose}
            className="text-foreground/50 hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-foreground/50 transition-colors"
          >
            <Upload className="w-8 h-8 text-foreground/50 mx-auto mb-2" />
            <p className="text-sm font-light text-foreground/70 mb-1">
              {fileName || 'Drag and drop your image here'}
            </p>
            <p className="text-xs text-foreground/50">or click to select</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Title input */}
          <div>
            <label className="block text-sm font-light text-foreground/70 mb-2">
              Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
              className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* Description input */}
          <div>
            <label className="block text-sm font-light text-foreground/70 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter image description"
              rows={3}
              className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />
          </div>

          {/* Error message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !fileInputRef.current?.files?.[0]}
              className="flex-1"
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
