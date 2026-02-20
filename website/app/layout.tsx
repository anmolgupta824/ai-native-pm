import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'The AI-Native PM | AI-Powered PM Workflows in 30 Minutes',
  description:
    'Practical modules that teach Product Managers to use Claude Code through hands-on projects. Generate PRDs, automate workflows, and ship prototypes.',
  openGraph: {
    title: 'The AI-Native PM',
    description: 'Build AI-powered PM workflows in 30 minutes.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <NavBar />
        <Analytics />
        <SpeedInsights />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
