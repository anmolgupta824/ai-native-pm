'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to Substack signup with email pre-filled
    track('email_subscribe', { page: 'global' })
    const substackUrl = `https://ainativepm.substack.com/subscribe?email=${encodeURIComponent(email)}`
    window.open(substackUrl, '_blank')
    setSubmitted(true)
  }

  return (
    <section id="newsletter" className="section-padding bg-gray-50">
      <div className="container-max text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Stay in the Loop
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          Get notified when new modules launch, plus weekly PM + AI tips.
          The free modules are already available &mdash; no signup required.
        </p>

        {submitted ? (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto">
            <p className="text-green-800 font-semibold">
              You&apos;re on the list!
            </p>
            <p className="text-green-600 text-sm mt-1">
              You&apos;ll get updates when new modules and content drop.
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
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-gray-400">
          No spam, ever. Unsubscribe anytime. Free modules need zero signup.
        </p>
      </div>
    </section>
  )
}
