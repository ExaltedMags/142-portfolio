import { useState, lazy, Suspense } from 'react'
import { achievements, Achievement } from '@/content/achievements'
import { AchievementItem } from './AchievementItem'
import { PreviewRail } from './PreviewRail'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

// Lazy load the dialog for code splitting
const ArtifactDialog = lazy(() =>
  import('./ArtifactDialog').then((m) => ({ default: m.ArtifactDialog }))
)

interface AchievementListProps {
  achievementsToShow?: Achievement[]
}

export function AchievementList({ achievementsToShow = achievements }: AchievementListProps) {
  const [activeItem, setActiveItem] = useState<Achievement | null>(null)
  const [dialogItem, setDialogItem] = useState<Achievement | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleHover = (item: Achievement) => {
    // Only update preview rail for items that use it
    if (item.interaction === 'previewRail' || item.interaction === 'dialog') {
      setActiveItem(item)
    }
  }

  const handleLeave = () => {
    // Keep the last item visible for a moment
  }

  const handleClick = (item: Achievement) => {
    if (item.interaction === 'dialog') {
      setDialogItem(item)
      setDialogOpen(true)
    }
  }

  return (
    <TooltipProvider>
      <section className="section py-8 md:py-12" aria-labelledby="achievements-heading">
        <div className="container-editorial">
          <h2 id="achievements-heading" className="sr-only">
            Achievements & Experience
          </h2>

          {/* Responsive layout: stacked on mobile, two-column on desktop */}
          <div className={cn(
            "grid grid-cols-1 gap-8 md:gap-12 lg:gap-16",
            activeItem?.id === 'songwriting-contest'
              ? "md:grid-cols-[1fr_520px]"
              : "md:grid-cols-[1fr_420px]"
          )}>
            {/* Left: Achievement list */}
            <div>
              <ul className="space-y-1" role="list">
                {achievementsToShow.map((item, index) => (
                  <AchievementItem
                    key={item.id}
                    item={item}
                    isActive={activeItem?.id === item.id}
                    onHover={() => handleHover(item)}
                    onLeave={handleLeave}
                    onClick={() => handleClick(item)}
                    animationDelay={0.3 + index * 0.08}
                  />
                ))}
              </ul>
            </div>

            {/* Right: Preview rail (hidden on mobile, visible on desktop) */}
            <div className="hidden md:block">
              <PreviewRail activeItem={activeItem} />
            </div>
          </div>
        </div>

        {/* Dialog (lazy loaded) */}
        <Suspense fallback={null}>
          <ArtifactDialog
            item={dialogItem}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
          />
        </Suspense>
      </section>
    </TooltipProvider>
  )
}
