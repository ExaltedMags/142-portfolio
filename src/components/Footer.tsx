import { footerContent } from '@/content/achievements'

export function Footer() {
  return (
    <footer className="py-12 md:py-16">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-ink-muted">
            {footerContent.currentStatus}
          </p>

          <p className="text-xs text-ink-faint font-mono">
            Built with intention. © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
