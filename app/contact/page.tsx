import { Navigation } from '@/components/Layout/Navigation'
import { PageContainer } from '@/components/Layout/PageContainer'
import ContactInfo from '@/components/Contact/ContactInfo'
import Footer from '@/components/Layout/Footer'
import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Sahana Designs - Get in Touch',
  description: 'Reach out to Sahana Designs for collaboration, inquiries, and design projects. Located in New Delhi, India.',
}

export default async function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="pt-32">
        <PageContainer className="pb-24">
          {/* Page Header */}
          <FadeInOnScroll className="mb-16">
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-light tracking-tighter text-foreground">
                Contact
              </h1>
              <div className="w-16 h-px bg-accent" />
            </div>
          </FadeInOnScroll>

          {/* Contact Info */}
          <ContactInfo />

        </PageContainer>
      </main>

      <Footer />
    </>
  )
}
