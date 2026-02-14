interface ModuleCardProps {
  number: number
  title: string
  description: string
  price: string
  tag: string
  features: string[]
  href: string
  highlighted?: boolean
}

export default function ModuleCard({
  number,
  title,
  description,
  price,
  tag,
  features,
  href,
  highlighted = false,
}: ModuleCardProps) {
  return (
    <div
      className={`relative rounded-2xl border p-6 flex flex-col transition-all hover:shadow-lg ${
        highlighted
          ? 'border-brand-200 bg-brand-50/50 shadow-md'
          : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Module {number}
        </span>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            price === 'Free'
              ? 'bg-green-100 text-green-700'
              : 'bg-brand-100 text-brand-700'
          }`}
        >
          {price}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {description}
      </p>

      <div className="flex-1">
        <ul className="space-y-2 mb-6">
          {features.map((feature) => (
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
      </div>

      <a
        href={href}
        target={price === 'Free' ? '_blank' : undefined}
        rel={price === 'Free' ? 'noopener noreferrer' : undefined}
        className={`block text-center text-sm font-semibold py-2.5 rounded-lg transition-colors ${
          price === 'Free'
            ? 'bg-brand-600 text-white hover:bg-brand-700'
            : 'border border-brand-600 text-brand-600 hover:bg-brand-50'
        }`}
      >
        {price === 'Free' ? 'Get Started — No Signup' : `Get Module - ${price}`}
      </a>
    </div>
  )
}
