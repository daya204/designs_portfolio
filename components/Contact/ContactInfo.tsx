import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react'
import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: 'f.designer.deepa@gmail.com',
      href: 'mailto:f.designer.deepa@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 99944 87778',
      href: 'tel:+919994487778',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Tiruppur, Tamil Nadu',
      href: '#',
    },
  ]

  return (
    <div className="space-y-12">
      <FadeInOnScroll>
        <div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-3">
            Get in Touch
          </h2>
          <div className="w-16 h-px bg-accent mb-6" />
          <p className="text-lg text-foreground/70 font-light">
            Ready to collaborate on your next design project? I&apos;d love to hear from you.
          </p>
        </div>
      </FadeInOnScroll>

      <div className="grid md:grid-cols-3 gap-6">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon
          return (
            <FadeInOnScroll key={detail.label} delay={index * 100}>
              <a
                href={detail.href}
                className="group relative rounded-[2rem] border border-border bg-foreground/5 p-8 transition-all duration-300 hover:border-accent hover:bg-muted/70 hover:shadow-lg hover:-translate-y-2 backdrop-blur-sm"
              >
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.3em] text-accent/80">
                      {detail.label}
                    </p>
                    <p className="text-lg font-light text-foreground group-hover:text-accent transition-colors duration-300">
                      {detail.value}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-foreground/40 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </a>
            </FadeInOnScroll>
          )
        })}
      </div>
    </div>
  )
}
