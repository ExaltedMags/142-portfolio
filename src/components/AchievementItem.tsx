import { Achievement } from '@/content/achievements'
import { cn } from '@/lib/utils'
import { TooltipPreview } from './TooltipPreview'
import { ChevronRight } from 'lucide-react'

interface AchievementItemProps {
  item: Achievement
  isActive: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  animationDelay: number
}

export function AchievementItem({
  item,
  isActive,
  onHover,
  onLeave,
  onClick,
  animationDelay,
}: AchievementItemProps) {
  const baseContent = (
    <button
      type="button"
      className={cn(
        'achievement-item w-full text-left group',
        isActive && 'achievement-item--active'
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={onClick}
      aria-expanded={isActive}
    >
      <span className="flex items-start gap-3">
        <ChevronRight
          className={cn(
            'w-4 h-4 mt-0.5 flex-shrink-0 text-accent transition-transform duration-200',
            isActive && 'transform translate-x-0.5'
          )}
        />
        <span className="flex-1">
          <span
            className={cn(
              'text-ink transition-colors duration-200',
              item.kind === 'major' ? 'font-medium' : 'text-ink-muted',
              isActive && 'text-accent'
            )}
          >
            {item.label}
          </span>
        </span>
      </span>
    </button>
  )

  const wrappedContent =
    item.interaction === 'tooltip' ? (
      <TooltipPreview item={item}>{baseContent}</TooltipPreview>
    ) : (
      baseContent
    )

  return (
    <li
      className="fade-in-up"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {wrappedContent}
    </li>
  )
}
