import { useState } from 'react'
import { Achievement } from '@/content/achievements'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ExternalLink } from 'lucide-react'
import { Folder } from './Folder'
import { ImageLightbox } from './ImageLightbox'
import { cn } from '@/lib/utils'

interface ArtifactDialogProps {
  item: Achievement | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ArtifactDialog({ item, open, onOpenChange }: ArtifactDialogProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (!item) return null

  const handleImageClick = (index: number) => {
    if (item.previewImages) {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }

  const handleSingleImageClick = () => {
    if (item.previewImage) {
      setLightboxIndex(0)
      setLightboxOpen(true)
    }
  }

  const imagesToShow = item.previewImages || (item.previewImage ? [item.previewImage] : [])

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-xl">
          {/* Image display: Folder for multiple images, single image otherwise */}
          {(item.previewImage || item.previewImages) && (
            <div className={cn(
              "relative aspect-video bg-paper-dark rounded-md mb-6 -mt-2 flex items-center justify-center",
              item.previewImages && item.previewImages.length > 1 
                ? "overflow-visible" 
                : "overflow-hidden"
            )}>
              {item.previewImages && item.previewImages.length > 1 ? (
                <div className="relative z-10">
                  <Folder
                    color="#c45d3a"
                    size={2}
                    items={item.previewImages.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleImageClick(idx)}
                        className="w-full h-full cursor-pointer"
                      >
                        <img
                          src={img}
                          alt={`${item.label} - Image ${idx + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    ))}
                    className="mx-auto"
                  />
                </div>
              ) : item.previewImage ? (
                <img
                  src={item.previewImage}
                  alt={item.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={handleSingleImageClick}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : null}
            {/* Placeholder */}
            {!item.previewImage && !item.previewImages && (
              <div className="absolute inset-0 flex items-center justify-center text-ink-faint pointer-events-none">
                <svg
                  className="w-16 h-16 opacity-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        )}

        <DialogHeader>
          <DialogTitle>{item.label}</DialogTitle>
          {item.detailCopy && (
            <DialogDescription className="text-base leading-relaxed pt-2">
              {item.detailCopy}
            </DialogDescription>
          )}
        </DialogHeader>

        {item.link && (
          <div className="mt-4 pt-4 border-t border-paper-dark">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              {item.linkLabel || 'Learn more'}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {!item.link && item.linkLabel && (
          <div className="mt-4 pt-4 border-t border-paper-dark">
            <span className="text-sm text-ink-faint italic">
              {item.linkLabel}
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>

    {/* Image Lightbox */}
    {imagesToShow.length > 0 && (
      <ImageLightbox
        images={imagesToShow}
        currentIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        alt={item.label}
      />
    )}
    </>
  )
}
