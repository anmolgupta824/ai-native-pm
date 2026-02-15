import type { Metadata } from 'next'
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
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-gray-900">
              The AI-Native <span className="text-brand-600">PM</span>
            </a>
            <div className="hidden sm:flex items-center gap-8">
              <a
                href="/modules"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Modules
              </a>
              <a
                href="/pricing"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </a>
              <a
                href="/about"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </a>
              <a
                href="/modules/0-claude-basics"
                className="text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-lg transition-colors"
              >
                Get Started Free
              </a>
            </div>
          </div>
        </nav>
        <main className="pt-16">{children}</main>
        <footer className="border-t border-gray-100 py-12 px-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; 2026 The AI-Native PM. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com/anmolgupta824/ai-native-pm"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                GitHub
              </a>
              <a
                href="/about"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                About
              </a>
              <a
                href="https://www.linkedin.com/in/anmol-gupta-21875a89/"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                LinkedIn
              </a>
              <a
                href="https://substack.com"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Newsletter
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
