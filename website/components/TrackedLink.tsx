'use client'

import { track } from '@vercel/analytics'
import { ReactNode } from 'react'

interface TrackedLinkProps {
  href: string
  event: string
  properties?: Record<string, string>
  className?: string
  children: ReactNode
  target?: string
  rel?: string
}

export default function TrackedLink({
  href,
  event,
  properties = {},
  className,
  children,
  target,
  rel,
}: TrackedLinkProps) {
  const handleClick = () => {
    track(event, { ...properties, destination: href })
  }

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
