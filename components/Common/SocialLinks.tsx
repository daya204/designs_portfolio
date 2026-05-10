import { Instagram, Linkedin, Twitter, Mail } from 'lucide-react'

interface SocialLinksProps {
  className?: string
  iconClassName?: string
}

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter,
  },
  {
    name: 'Email',
    href: 'mailto:hello@sahanadesigns.com',
    icon: Mail,
  },
]

export function SocialLinks({
  className = 'flex gap-4',
  iconClassName = 'w-5 h-5',
}: SocialLinksProps) {
  return (
    <div className={className}>
      {socialLinks.map((link) => {
        const Icon = link.icon
        return (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-accent transition-colors"
            aria-label={link.name}
          >
            <Icon className={iconClassName} />
          </a>
        )
      })}
    </div>
  )
}
