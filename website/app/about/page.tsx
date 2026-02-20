'use client'

import { track } from '@vercel/analytics'

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-brand-50 to-white">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-full mb-6">
              About
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Hi, I&apos;m{' '}
              <span className="gradient-text">Anmol Gupta</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Product Manager at Careem (Uber) &middot; Payments &amp; Fintech &middot; Ex-Visa
            </p>
            <p className="mt-6 text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
              I&apos;ve spent 7+ years building payment products that serve millions of people.
              Now I&apos;m teaching Product Managers how to 10x their output with AI tools
              &mdash; because the PMs who learn this first will define the next decade of product.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://www.linkedin.com/in/anmol-gupta-21875a89/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('external_link', { destination: 'linkedin', page: 'about' })}
                className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#0A66C2] hover:bg-[#004182] px-5 py-2.5 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="https://anmolgupta774089.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('external_link', { destination: 'substack', page: 'about' })}
                className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#FF6719] hover:bg-[#e55a14] px-5 py-2.5 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
                Substack
              </a>
              <a
                href="https://medium.com/@anmolgupta824"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('external_link', { destination: 'medium', page: 'about' })}
                className="inline-flex items-center gap-2 text-sm font-medium text-white bg-black hover:bg-gray-800 px-5 py-2.5 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
                Medium
              </a>
              <a
                href="https://instagram.com/theainativepm"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('external_link', { destination: 'instagram', page: 'about' })}
                className="inline-flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90 px-5 py-2.5 rounded-lg transition-opacity"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>
              <a
                href="/modules/0-claude-basics"
                onClick={() => track('cta_click', { button: 'start_learning', page: 'about', destination: '/modules/0-claude-basics' })}
                className="inline-flex items-center gap-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 px-5 py-2.5 rounded-lg transition-colors"
              >
                Start Learning Free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { number: '7+', label: 'Years in Payments & Fintech' },
              { number: '50M', label: 'Customers Served' },
              { number: '$120M', label: 'Monthly Transaction Volume' },
              { number: '20+', label: 'Engineers & Designers Led' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-white rounded-xl border border-gray-200"
              >
                <p className="text-2xl sm:text-3xl font-bold text-brand-600">
                  {stat.number}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Journey */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              Career Journey
            </h2>

            <div className="space-y-0">
              {/* Timeline */}
              {[
                {
                  period: 'Oct 2023 &ndash; Present',
                  role: 'Product Manager, Payments',
                  company: 'Careem (Uber)',
                  location: 'Dubai, UAE',
                  description:
                    'Driving the mission of Careem\'s payment platform serving a customer base of 50 million and handling a monthly transaction volume of $120 million.',
                  color: 'brand',
                },
                {
                  period: 'Dec 2021 &ndash; Nov 2023',
                  role: 'Senior Product Manager, Checkout & Payments',
                  company: 'RAENA',
                  location: 'Abu Dhabi, UAE',
                  description:
                    'Built checkout and payments for a South East Asia beauty distributor platform, driving market entry and product growth from 0 to 1.',
                  color: 'purple',
                },
                {
                  period: '2019 &ndash; 2021',
                  role: 'MBA',
                  company: 'Nanyang Business School',
                  location: 'Singapore',
                  description:
                    'Master of Business Administration. Transitioned from engineering to product management with a focus on fintech and emerging markets.',
                  color: 'green',
                },
                {
                  period: 'Jul 2016 &ndash; Dec 2018',
                  role: 'Software Engineer',
                  company: 'Visa',
                  location: 'Bengaluru, India',
                  description:
                    'Configured payment decision rules handling ~1 million transactions every day. Built the technical foundation that shaped a product-minded engineering approach.',
                  color: 'amber',
                },
                {
                  period: '2012 &ndash; 2016',
                  role: 'B.Tech, Computer Science',
                  company: 'NIT Warangal',
                  location: 'India',
                  description:
                    'Bachelor of Technology in Computer Science from one of India\'s premier National Institutes of Technology.',
                  color: 'gray',
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                        item.color === 'brand'
                          ? 'bg-brand-600'
                          : item.color === 'purple'
                          ? 'bg-purple-500'
                          : item.color === 'green'
                          ? 'bg-green-500'
                          : item.color === 'amber'
                          ? 'bg-amber-500'
                          : 'bg-gray-400'
                      }`}
                    />
                    {index < 4 && (
                      <div className="w-px h-full bg-gray-200 min-h-[2rem]" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-8">
                    <p
                      className="text-xs text-gray-500 uppercase tracking-wider"
                      dangerouslySetInnerHTML={{ __html: item.period }}
                    />
                    <h3 className="mt-1 text-lg font-semibold text-gray-900">
                      {item.role}
                    </h3>
                    <p className="text-sm text-brand-600 font-medium">
                      {item.company}{' '}
                      <span className="text-gray-400 font-normal">
                        &middot; {item.location}
                      </span>
                    </p>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why I Built This */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8">
              Why I Built This
            </h2>
            <div className="space-y-6 text-base text-gray-600 leading-relaxed">
              <p>
                After years of building payment products at Visa, RAENA, and Careem, I noticed
                something: <strong className="text-gray-900">the best PMs weren&apos;t just strategic
                thinkers &mdash; they were the ones who could move fast with tools.</strong>
              </p>
              <p>
                When AI coding assistants like Claude Code arrived, I saw the same pattern.
                Some PMs immediately started using AI to write PRDs, automate status reports,
                and prototype features. Others watched from the sidelines, unsure where to start.
              </p>
              <p>
                The gap between &ldquo;AI-curious&rdquo; and &ldquo;AI-native&rdquo; PMs is growing
                every week. The PMs who figure this out first won&apos;t just be more productive
                &mdash; they&apos;ll be the ones who define how products get built in the next decade.
              </p>
              <p>
                <strong className="text-gray-900">That&apos;s why I created The AI-Native PM.</strong>{' '}
                Not theory. Not hype. Practical modules you can use on your real projects,
                starting today. Each one teaches a real PM workflow with hands-on tools &mdash;
                because the only way to learn AI is to use it.
              </p>
            </div>

            <div className="mt-10 bg-brand-50 border border-brand-100 rounded-xl p-6 sm:p-8">
              <p className="text-sm text-brand-800 leading-relaxed">
                <span className="font-semibold">&ldquo;The best time to learn AI was yesterday.
                The second best time is right now.&rdquo;</span>
                <br />
                <span className="text-brand-600 mt-2 inline-block">
                  &mdash; Start with Module 0, it takes 20 minutes.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Let&apos;s Connect
            </h2>
            <p className="text-gray-600 mb-8">
              I write about AI tools for PMs, payments, and building products.
              Follow along or reach out &mdash; I&apos;d love to hear what you&apos;re building.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://www.linkedin.com/in/anmol-gupta-21875a89/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('external_link', { destination: 'linkedin', page: 'about_connect' })}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-[#0A66C2] hover:bg-[#004182] px-6 py-3 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="https://anmolgupta774089.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('external_link', { destination: 'substack', page: 'about_connect' })}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-[#FF6719] hover:bg-[#e55a14] px-6 py-3 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
                Substack
              </a>
              <a
                href="https://medium.com/@anmolgupta824"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('external_link', { destination: 'medium', page: 'about_connect' })}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-black hover:bg-gray-800 px-6 py-3 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
                Medium
              </a>
              <a
                href="https://instagram.com/theainativepm"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('external_link', { destination: 'instagram', page: 'about_connect' })}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90 px-6 py-3 rounded-lg transition-opacity"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>
              <a
                href="/modules/0-claude-basics"
                onClick={() => track('cta_click', { button: 'start_learning', page: 'about_connect', destination: '/modules/0-claude-basics' })}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 px-6 py-3 rounded-lg transition-colors"
              >
                Start Learning Free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
