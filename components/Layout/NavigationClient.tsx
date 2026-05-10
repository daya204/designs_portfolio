'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Category } from '@/lib/types'

interface NavigationClientProps {
  navLinks: Array<{ href: string; label: string }>
  categories: Category[]
}

export default function NavigationClient({
  navLinks,
  categories,
}: NavigationClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)

  const handleLinkClick = () => {
    setIsOpen(false)
    setIsPortfolioOpen(false)
  }

  return (
    <>
      {/* Desktop Portfolio Dropdown */}
      <div className="hidden md:block relative group">
        <button className="flex items-center gap-1 text-sm font-light tracking-wide text-foreground/70 hover:text-foreground transition-colors">
          Portfolio
          <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
        </button>
        <div className="absolute left-0 top-full mt-0 w-56 bg-background border border-border rounded hidden group-hover:block shadow-lg">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/portfolio/${category.slug}`}
              className="block px-4 py-3 text-sm font-light text-foreground/70 hover:text-foreground hover:bg-muted first:rounded-t last:rounded-b transition-colors border-b border-border last:border-b-0"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-foreground hover:bg-muted rounded transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border py-4 space-y-3 max-h-96 overflow-y-auto">
          {navLinks.map((link) => (
            link.label === 'Portfolio' ? (
              <div key={link.href}>
                <button
                  onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                  className="w-full text-left px-4 py-2 text-sm font-light tracking-wide text-foreground/70 hover:text-foreground hover:bg-muted rounded flex items-center justify-between transition-colors"
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isPortfolioOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isPortfolioOpen && (
                  <div className="bg-muted/50">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/portfolio/${category.slug}`}
                        className="block px-6 py-2 text-sm font-light text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-colors"
                        onClick={handleLinkClick}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm font-light tracking-wide text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-colors"
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      )}
    </>
  )
}
