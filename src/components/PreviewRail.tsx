import { useState } from 'react'
import { Achievement } from '@/content/achievements'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import { Folder } from './Folder'
import { ImageLightbox } from './ImageLightbox'

interface PreviewRailProps {
  activeItem: Achievement | null
}

export function PreviewRail({ activeItem }: PreviewRailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const handleImageClick = (index: number) => {
    if (activeItem?.previewImages) {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }

  const handleSingleImageClick = () => {
    if (activeItem?.previewImage) {
      setLightboxIndex(0)
      setLightboxOpen(true)
    }
  }

  const imagesToShow = activeItem?.previewImages || (activeItem?.previewImage ? [activeItem.previewImage] : [])

  return (
    <>
      <aside
        className={cn(
          'preview-rail p-6',
          !activeItem && 'preview-rail--empty'
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {activeItem ? (
          <div className="h-full flex flex-col" key={activeItem.id}>
            {/* Image display: Folder for multiple images, single image otherwise */}
            <div className={cn(
              "relative aspect-[4/3] bg-paper-dark rounded-md mb-4 flex items-center justify-center",
              activeItem.previewImages && activeItem.previewImages.length > 1 
                ? "overflow-visible" 
                : "overflow-hidden"
            )}>
              {activeItem.previewImages && activeItem.previewImages.length > 1 ? (
                <div className="relative z-10">
                  <Folder
                    color="#c45d3a"
                    size={1.5}
                    items={activeItem.previewImages.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleImageClick(idx)}
                        className="w-full h-full cursor-pointer"
                      >
                        <img
                          src={img}
                          alt={`${activeItem.label} - Image ${idx + 1}`}
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
              ) : activeItem.previewImage ? (
                <img
                  src={activeItem.previewImage}
                  alt={activeItem.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={handleSingleImageClick}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : null}
            {/* Placeholder overlay when no image or image fails */}
            {!activeItem.previewImage && !activeItem.previewImages && (
              <div className="absolute inset-0 flex items-center justify-center text-ink-faint pointer-events-none">
                <svg
                  className="w-12 h-12 opacity-30"
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

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-display text-lg font-medium text-ink leading-tight mb-2">
              {activeItem.label}
            </h3>

            {activeItem.detailCopy && (
              <p className="text-sm text-ink-muted leading-relaxed">
                {activeItem.detailCopy}
              </p>
            )}

            {activeItem.link && (
              <a
                href={activeItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                {activeItem.linkLabel || 'Learn more'}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-center">
          <p className="text-sm text-ink-faint italic">
            Hover or focus an item to preview
          </p>
        </div>
      )}
    </aside>

    {/* Image Lightbox */}
    {imagesToShow.length > 0 && (
      <ImageLightbox
        images={imagesToShow}
        currentIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        alt={activeItem?.label || 'Image'}
      />
    )}
    </>
  )
}
