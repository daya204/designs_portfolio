'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'

interface UploadSecretPromptProps {
  onLogin: (secret: string) => Promise<boolean>
  onCancel: () => void
}

export default function UploadSecretPrompt({ onLogin, onCancel }: UploadSecretPromptProps) {
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!secret.trim()) return
    setLoading(true)
    setError('')
    const ok = await onLogin(secret.trim())
    if (!ok) {
      setError('Incorrect password')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Lock size={18} className="text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-light tracking-wider">Upload Access</h2>
            <p className="text-xs text-foreground/50">Enter your upload password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 bg-background"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !secret.trim()} className="flex-1">
              {loading ? 'Checking...' : 'Unlock'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
