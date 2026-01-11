import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Achievement } from '@/content/achievements'

interface TooltipPreviewProps {
  item: Achievement
  children: React.ReactNode
}

export function TooltipPreview({ item, children }: TooltipPreviewProps) {
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right" align="start" className="max-w-[280px]">
        <p className="text-sm leading-relaxed">{item.tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  )
}
