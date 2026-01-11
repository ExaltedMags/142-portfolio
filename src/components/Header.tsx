import { headerContent } from '@/content/achievements'

export function Header() {
  return (
    <header className="section pt-16 pb-12 md:pt-24 md:pb-16">
      <div className="container-editorial">
        <div className="max-w-2xl">
          <h1 className="fade-in-up text-balance">{headerContent.name}</h1>

          <div className="mt-6 space-y-1 fade-in-up delay-1">
            <p className="text-lg md:text-xl font-medium text-ink">
              {headerContent.program}
            </p>
            <p className="text-ink-muted">
              {headerContent.specialization}
            </p>
          </div>

          <p className="mt-8 text-xl md:text-2xl font-display italic text-ink-muted fade-in-up delay-2">
            {headerContent.tagline}
          </p>
        </div>
      </div>
    </header>
  )
}
