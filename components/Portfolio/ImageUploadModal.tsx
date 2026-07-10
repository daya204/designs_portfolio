'use client'

import { useState, useRef } from 'react'
import { PortfolioImage } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { X, Upload, CheckCircle2 } from 'lucide-react'
import { getStoredSecret } from '@/lib/upload-auth'

interface ImageUploadModalProps {
  categoryId: string
  categoryName: string
  onClose: () => void
  onImageAdded: (image: PortfolioImage) => void
}

interface FileEntry {
  file: File
  title: string
  preview: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

export default function ImageUploadModal({
  categoryId,
  categoryName,
  onClose,
  onImageAdded,
}: ImageUploadModalProps) {
  const [entries, setEntries] = useState<FileEntry[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addFiles = (files: FileList | File[]) => {
    const newEntries: FileEntry[] = Array.from(files).map((file) => ({
      file,
      title: file.name.replace(/\.[^/.]+$/, ''),
      preview: URL.createObjectURL(file),
      status: 'pending',
    }))
    setEntries((prev) => [...prev, ...newEntries])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
  }

  const removeEntry = (index: number) => {
    setEntries((prev) => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const updateTitle = (index: number, title: string) => {
    setEntries((prev) => prev.map((e, i) => (i === index ? { ...e, title } : e)))
  }

  const handleUploadAll = async () => {
    const pending = entries.filter((e) => e.status === 'pending')
    if (!pending.length) return

    const secret = getStoredSecret()
    if (!secret) {
      setGlobalError('Session expired. Please refresh and log in again.')
      return
    }

    setIsUploading(true)
    setGlobalError(null)

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry.status !== 'pending') continue

      setEntries((prev) =>
        prev.map((e, idx) => (idx === i ? { ...e, status: 'uploading' } : e)),
      )

      try {
        const formData = new FormData()
        formData.append('file', entry.file)
        formData.append('categoryId', categoryId)
        formData.append('title', entry.title)

        const res = await fetch('/api/portfolio/upload', {
          method: 'POST',
          headers: { 'x-upload-secret': secret },
          body: formData,
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Upload failed')
        }

        const { image } = await res.json()
        setEntries((prev) =>
          prev.map((e, idx) => (idx === i ? { ...e, status: 'done' } : e)),
        )
        onImageAdded(image)
      } catch (err) {
        setEntries((prev) =>
          prev.map((e, idx) =>
            idx === i
              ? { ...e, status: 'error', error: err instanceof Error ? err.message : 'Failed' }
              : e,
          ),
        )
      }
    }

    setIsUploading(false)
  }

  const allDone = entries.length > 0 && entries.every((e) => e.status === 'done')

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg w-full max-w-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
          <div>
            <h2 className="text-xl font-light tracking-wider">Add Images</h2>
            <p className="text-sm text-foreground/50 mt-0.5">{categoryName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-foreground/50 hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-foreground/40 transition-colors"
          >
            <Upload className="w-8 h-8 text-foreground/40 mx-auto mb-2" />
            <p className="text-sm text-foreground/60">Drag & drop images here</p>
            <p className="text-xs text-foreground/40 mt-1">or click to select — multiple allowed</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* File list */}
          {entries.map((entry, i) => (
            <div key={i} className="flex gap-3 items-start p-3 bg-muted/50 rounded-lg">
              {/* Thumbnail */}
              <div className="w-14 h-14 shrink-0 rounded overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={entry.preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title input + status */}
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={entry.title}
                  onChange={(e) => updateTitle(i, e.target.value)}
                  disabled={entry.status !== 'pending'}
                  placeholder="Image title (optional)"
                  className="w-full text-sm px-2 py-1.5 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50"
                />
                {entry.status === 'uploading' && (
                  <p className="text-xs text-foreground/50 mt-1">Uploading...</p>
                )}
                {entry.status === 'done' && (
                  <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Uploaded
                  </p>
                )}
                {entry.status === 'error' && (
                  <p className="text-xs text-red-500 mt-1">{entry.error}</p>
                )}
              </div>

              {/* Remove button */}
              {entry.status === 'pending' && (
                <button
                  onClick={() => removeEntry(i)}
                  className="text-foreground/40 hover:text-foreground/70 transition-colors mt-1 shrink-0"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}

          {globalError && <p className="text-sm text-red-500">{globalError}</p>}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex gap-3 shrink-0">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            {allDone ? 'Close' : 'Cancel'}
          </Button>
          {!allDone && (
            <Button
              onClick={handleUploadAll}
              disabled={isUploading || entries.filter((e) => e.status === 'pending').length === 0}
              className="flex-1"
            >
              {isUploading
                ? 'Uploading...'
                : `Upload ${entries.filter((e) => e.status === 'pending').length} image${entries.filter((e) => e.status === 'pending').length !== 1 ? 's' : ''}`}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
