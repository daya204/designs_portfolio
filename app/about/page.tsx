import { Navigation } from '@/components/Layout/Navigation'
import AboutHero from '@/components/About/AboutHero'
import AboutMeSection from '@/components/About/AboutMeSection'
import DesignProcessSection from '@/components/About/DesignProcessSection'
import CreativeVisionSection from '@/components/About/CreativeVisionSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Sahana Design Studio - Designer & Fashion Expert',
  description: 'Learn about Sahana Design Studio\'s creative journey, design philosophy, and expertise in fashion, garment design, and branding.',
}

export default async function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <AboutHero />
        <AboutMeSection />
        <DesignProcessSection />
        <CreativeVisionSection />
      </main>
    </>
  )
}
