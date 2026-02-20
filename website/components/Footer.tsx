'use client'

import { track } from '@vercel/analytics'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          &copy; 2026 The AI-Native PM. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/anmolgupta824/ai-native-pm"
            onClick={() => track('external_link', { destination: 'github', page: 'footer' })}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            GitHub
          </a>
          <a
            href="/about"
            onClick={() => track('nav_click', { item: 'about_footer' })}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            About
          </a>
          <a
            href="https://www.linkedin.com/in/anmol-gupta-21875a89/"
            onClick={() => track('external_link', { destination: 'linkedin', page: 'footer' })}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            LinkedIn
          </a>
          <a
            href="https://anmolgupta774089.substack.com"
            onClick={() => track('external_link', { destination: 'newsletter', page: 'footer' })}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Newsletter
          </a>
        </div>
      </div>
    </footer>
  )
}
