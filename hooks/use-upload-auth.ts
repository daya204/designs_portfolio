'use client'

import { useState, useEffect, useCallback } from 'react'
import { getStoredSecret, setStoredSecret, clearStoredSecret } from '@/lib/upload-auth'

export function useUploadAuth() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const secret = getStoredSecret()
    setIsAuthorized(!!secret)
    setIsChecking(false)
  }, [])

  const login = useCallback(async (secret: string): Promise<boolean> => {
    // Verify against the API
    const res = await fetch('/api/portfolio/verify-secret', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret }),
    })
    if (res.ok) {
      setStoredSecret(secret)
      setIsAuthorized(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    clearStoredSecret()
    setIsAuthorized(false)
  }, [])

  return { isAuthorized, isChecking, login, logout }
}
