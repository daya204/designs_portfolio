'use client'

const STORAGE_KEY = 'portfolio_upload_secret'

export function getStoredSecret(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(STORAGE_KEY)
}

export function setStoredSecret(secret: string) {
  sessionStorage.setItem(STORAGE_KEY, secret)
}

export function clearStoredSecret() {
  sessionStorage.removeItem(STORAGE_KEY)
}
