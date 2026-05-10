import { Mail, MapPin, Phone } from 'lucide-react'
import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@sahanadesigns.com',
      href: 'mailto:hello@sahanadesigns.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 (555) 123-4567',
      href: 'tel:+915551234567',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'New Delhi, India',
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

      <div className="grid md:grid-cols-3 gap-8">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon
          return (
            <FadeInOnScroll key={detail.label} delay={index * 100}>
              <a
                href={detail.href}
                className="group space-y-3 p-6 border border-border rounded-sm hover:border-foreground transition-colors"
              >
                <Icon className="w-6 h-6 text-accent group-hover:text-foreground transition-colors" />
                <div>
                  <p className="text-sm font-light tracking-widest text-foreground/60 mb-1">
                    {detail.label}
                  </p>
                  <p className="text-base font-light text-foreground group-hover:text-accent transition-colors">
                    {detail.value}
                  </p>
                </div>
              </a>
            </FadeInOnScroll>
          )
        })}
      </div>
    </div>
  )
}
