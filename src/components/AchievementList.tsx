import { useState, lazy, Suspense, useEffect } from 'react'
import { achievements, Achievement } from '@/content/achievements'
import { AchievementItem } from './AchievementItem'
import { PreviewRail } from './PreviewRail'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

// Lazy load the dialog for code splitting
const ArtifactDialog = lazy(() =>
  import('./ArtifactDialog').then((m) => ({ default: m.ArtifactDialog }))
)

// Hook to detect touch-only devices (no hover capability)
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkTouch = () => setIsTouch(window.matchMedia('(hover: none)').matches)
    checkTouch()
    const mediaQuery = window.matchMedia('(hover: none)')
    mediaQuery.addEventListener('change', checkTouch)
    return () => mediaQuery.removeEventListener('change', checkTouch)
  }, [])

  return isTouch
}

interface AchievementListProps {
  achievementsToShow?: Achievement[]
}

export function AchievementList({ achievementsToShow = achievements }: AchievementListProps) {
  const isTouchDevice = useIsTouchDevice()
  
  // Initialize with the first achievement to have it hovered by default
  const [activeItem, setActiveItem] = useState<Achievement | null>(
    achievementsToShow.length > 0 && 
    (achievementsToShow[0].interaction === 'previewRail' || achievementsToShow[0].interaction === 'dialog')
      ? achievementsToShow[0]
      : null
  )
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
    const isAlreadyActive = activeItem?.id === item.id

    // Update the active item for preview rail
    if (item.interaction === 'previewRail' || item.interaction === 'dialog') {
      setActiveItem(item)
    }

    // Open dialog for dialog-type items:
    // - On desktop (hover devices): always open dialog on click
    // - On mobile (touch devices): only open if item is already active (second tap)
    if (item.interaction === 'dialog') {
      if (!isTouchDevice || isAlreadyActive) {
        setDialogItem(item)
        setDialogOpen(true)
      }
    }
  }

  return (
    <TooltipProvider>
      <section className="section py-8 md:py-12" aria-labelledby="achievements-heading">
        <div className="container-editorial">
          <h2 id="achievements-heading" className="sr-only">
            Achievements & Experience
          </h2>

          {/* Mobile: Preview rail above the list */}
          <div className="md:hidden mb-6">
            <PreviewRail activeItem={activeItem} />
          </div>

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
