import { FadeInOnScroll } from '@/components/Common/FadeInOnScroll'

export default function MapSection() {
  return (
    <FadeInOnScroll className="mt-16">
      <div className="rounded-sm overflow-hidden border border-border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.7500954269253!2d77.20704761508707!3d28.61403009241701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce28c74b5a2a1%3A0x7e42b08c0!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </FadeInOnScroll>
  )
}
