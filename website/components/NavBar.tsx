'use client'

import { track } from '@vercel/analytics'

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-gray-900">
          The AI-Native <span className="text-brand-600">PM</span>
        </a>
        <div className="hidden sm:flex items-center gap-8">
          <a
            href="/modules"
            onClick={() => track('nav_click', { item: 'modules' })}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Modules
          </a>
          <a
            href="/about"
            onClick={() => track('nav_click', { item: 'about' })}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            About
          </a>
          <a
            href="/modules/0-claude-basics"
            onClick={() => track('cta_click', { button: 'nav_get_started', page: 'global', destination: '/modules/0-claude-basics' })}
            className="text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-lg transition-colors"
          >
            Get Started Free
          </a>
        </div>
      </div>
    </nav>
  )
}
