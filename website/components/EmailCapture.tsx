'use client'

import { useState } from 'react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to Substack signup with email pre-filled
    const substackUrl = `https://ainativepm.substack.com/subscribe?email=${encodeURIComponent(email)}`
    window.open(substackUrl, '_blank')
    setSubmitted(true)
  }

  return (
    <section id="signup" className="section-padding bg-gray-50">
      <div className="container-max text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Get the Free PRD Generator
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          Join the newsletter and get instant access to Module 1. Generate your
          first production-ready PRD in 30 minutes.
        </p>

        {submitted ? (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto">
            <p className="text-green-800 font-semibold">
              Check your email for the download link!
            </p>
            <p className="text-green-600 text-sm mt-1">
              You&apos;ll also get updates when new modules launch.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/25 text-sm whitespace-nowrap"
            >
              Get Free Access
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-gray-400">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
