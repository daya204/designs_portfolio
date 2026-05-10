import { SocialLinks } from '@/components/Common/SocialLinks'
import { PageContainer } from './PageContainer'
import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <PageContainer className="py-20">
        <FadeInOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-4">
              <h3 className="text-3xl font-light tracking-tighter text-foreground">
                SAHANA
              </h3>
              <p className="text-sm font-light text-foreground/60 leading-relaxed">
                Premium fashion & garment design solutions for modern brands and creators.
              </p>
              <div className="w-12 h-px bg-accent" />
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-accent/80 font-light">
                Navigation
              </p>
              <nav className="flex flex-col gap-3">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/about', label: 'About' },
                  { href: '/portfolio', label: 'Portfolio' },
                  { href: '/contact', label: 'Contact' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-light text-foreground/60 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Social Links Column */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-accent/80 font-light">
                Follow
              </p>
              <SocialLinks />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 pt-8">
            <p className="text-xs font-light text-foreground/40 text-center">
              © {currentYear} Sahana Design Studio. All rights reserved.
            </p>
          </div>
        </FadeInOnScroll>
      </PageContainer>
    </footer>
  )
}
