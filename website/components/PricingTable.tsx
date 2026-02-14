'use client'

import { useState } from 'react'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'Start building AI workflows today',
    features: [
      'Module 1: PRD Generator',
      'Module 2: Rollout Plan Generator',
      '3 PRD templates',
      'QUICKSTART guide',
      'Community access',
    ],
    cta: 'Get Started — No Signup',
    href: 'https://github.com/anmolgupta824/ai-native-pm',
    highlighted: false,
  },
  {
    name: 'Pro Bundle',
    price: '$99',
    priceNote: 'Save $30+',
    description: 'All modules, one price',
    features: [
      'Everything in Free',
      'Module 3: MCP Google Workspace ($39)',
      'Module 4: Vibe Coding Projects ($29)',
      '6 production-ready automations',
      '3 project templates',
      'All future module updates',
      'Priority support',
    ],
    cta: 'Get Pro Bundle',
    href: '#',
    highlighted: true,
  },
]

const individualModules = [
  {
    name: 'MCP Google Workspace',
    price: '$39',
    description: 'Automate 5+ hours of weekly busy work',
    roi: '$5,200/year value',
  },
  {
    name: 'Vibe Coding Projects',
    price: '$29',
    description: 'Ship your first prototype this weekend',
    roi: 'Career development',
  },
]

export default function PricingTable() {
  const [hoursPerWeek, setHoursPerWeek] = useState(5)
  const hourlyRate = 50
  const annualSavings = hoursPerWeek * hourlyRate * 52
  const roi = Math.round((annualSavings / 99) * 100)

  return (
    <div>
      {/* Pricing tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-2xl border p-8 flex flex-col ${
              tier.highlighted
                ? 'border-brand-300 bg-white shadow-xl ring-1 ring-brand-200'
                : 'border-gray-200 bg-white'
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Best Value
                </span>
              </div>
            )}

            <h3 className="text-lg font-bold text-gray-900">{tier.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-gray-900">
                {tier.price}
              </span>
              {tier.priceNote && (
                <span className="text-sm text-green-600 font-medium">
                  {tier.priceNote}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600">{tier.description}</p>

            <ul className="mt-6 space-y-3 flex-1">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="text-sm text-gray-600 flex items-start gap-2"
                >
                  <svg
                    className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={tier.href}
              className={`mt-8 block text-center text-sm font-semibold py-3 rounded-xl transition-colors ${
                tier.highlighted
                  ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/25'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      {/* Individual modules */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
          Or buy modules individually
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {individualModules.map((mod) => (
            <div
              key={mod.name}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
            >
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {mod.name}
                </p>
                <p className="text-xs text-gray-500">{mod.description}</p>
              </div>
              <div className="text-right ml-4">
                <p className="font-bold text-gray-900">{mod.price}</p>
                <p className="text-xs text-green-600">{mod.roi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="mt-16 max-w-xl mx-auto bg-gray-50 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-gray-900 text-center">
          ROI Calculator
        </h3>
        <p className="text-sm text-gray-600 text-center mt-1">
          See how much time and money you&apos;ll save
        </p>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hours saved per week with AI automations
          </label>
          <input
            type="range"
            min={1}
            max={15}
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full accent-brand-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1 hr</span>
            <span className="font-semibold text-brand-600 text-sm">
              {hoursPerWeek} hrs/week
            </span>
            <span>15 hrs</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">
              {hoursPerWeek * 52} hrs
            </p>
            <p className="text-xs text-gray-500">Saved per year</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-2xl font-bold text-green-600">
              ${annualSavings.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              Value at ${hourlyRate}/hr
            </p>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          The Pro Bundle costs <span className="font-bold">$99</span> &mdash;
          that&apos;s a{' '}
          <span className="font-bold text-green-600">{roi}% ROI</span> in
          your first year.
        </p>
      </div>
    </div>
  )
}
