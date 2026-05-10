import { SocialLinks } from '@/components/Common/SocialLinks'
import { PageContainer } from './PageContainer'
import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <PageContainer className="py-16">
        <FadeInOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Brand */}
            <div className="space-y-2">
              <h3 className="text-2xl font-light tracking-widest text-foreground">
                SAHANA DESIGNS
              </h3>
              <p className="text-sm font-light text-foreground/60">
                Fashion & Garment Design
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-light tracking-widest text-foreground/60 mb-3">
                  FOLLOW
                </p>
                <SocialLinks />
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-xs font-light text-foreground/50 text-center">
              © {currentYear} Sahana Designs. All rights reserved.
            </p>
          </div>
        </FadeInOnScroll>
      </PageContainer>
    </footer>
  )
}
