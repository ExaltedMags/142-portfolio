import { useState, useEffect } from 'react'
import { Achievement } from '@/content/achievements'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import { Folder } from './Folder'
import { ImageLightbox } from './ImageLightbox'
import { LinkPreview } from '@/components/ui/link-preview'
import { HoverVideoPlayer } from '@/components/ui/hover-video-player'
import SquigglyArrow from '@/components/ui/squiggle-arrow'

interface PreviewRailProps {
  activeItem: Achievement | null
}

// Helper function to convert Spotify URL to embed URL
function getSpotifyEmbedUrl(url: string): string {
  // Extract track ID from URL like: https://open.spotify.com/track/4vaNwLCX5wiN5aFDZuTnXi?si=...
  const match = url.match(/\/track\/([a-zA-Z0-9]+)/)
  if (match && match[1]) {
    return `https://open.spotify.com/embed/track/${match[1]}?utm_source=generator&theme=0`
  }
  return url
}

// Spotify Embed Component
function SpotifyEmbed({ url }: { url: string }) {
  const embedUrl = getSpotifyEmbedUrl(url)
  
  return (
    <iframe
      style={{ borderRadius: '12px' }}
      src={embedUrl}
      width="100%"
      height="352"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title="Spotify Embed"
    />
  )
}

export function PreviewRail({ activeItem }: PreviewRailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [folderOpen, setFolderOpen] = useState(false)

  // Reset folder state when active item changes
  useEffect(() => {
    setFolderOpen(false)
  }, [activeItem?.id])

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
            {/* Video, Spotify embed, or Image display: Folder for multiple images, single image otherwise */}
            {activeItem.videoUrl ? (
              <div className="relative w-full aspect-[16/10] bg-paper-dark rounded-md mb-4 overflow-visible">
                {/* Hover me! indicator - absolute positioned above container */}
                {activeItem.id === 'musician' && (
                  <div className="absolute left-1/2 -translate-x-1/2 -top-[5rem] z-20 flex flex-col items-center pointer-events-none select-none">
                    <span className="font-display text-sm text-accent italic whitespace-nowrap mb-[-4px]">Hover me!</span>
                    <SquigglyArrow 
                      width={50} 
                      height={45} 
                      strokeWidth={2} 
                      direction="down" 
                      variant="smooth"
                      className="text-accent"
                    />
                  </div>
                )}
                <div className="relative w-full h-full overflow-hidden rounded-md">
                  <HoverVideoPlayer
                    videoSrc={activeItem.videoUrl}
                    thumbnailSrc={activeItem.videoThumbnail}
                    muted={false}
                    loop={true}
                    className="w-full h-full"
                  />
                </div>
              </div>
            ) : activeItem.spotifyUrl ? (
              <div className="relative w-full bg-paper-dark rounded-md mb-4 overflow-hidden">
                <SpotifyEmbed url={activeItem.spotifyUrl} />
              </div>
            ) : (
              <div className={cn(
                "relative mb-4",
                (activeItem.id === 'venue-checker' || activeItem.id === 'alaga-network')
                  ? "aspect-square" 
                  : "aspect-[4/3]"
              )}>
                {/* Click me! indicator - absolute positioned above container */}
                {activeItem.previewImages && activeItem.previewImages.length > 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 -top-[5rem] z-20 flex flex-col items-center pointer-events-none select-none">
                    <span className="font-display text-sm text-accent italic whitespace-nowrap mb-[-4px]">Click me!</span>
                    <SquigglyArrow 
                      width={50} 
                      height={45} 
                      strokeWidth={2} 
                      direction="down" 
                      variant="smooth"
                      className="text-accent"
                    />
                  </div>
                )}
                <div className={cn(
                  "relative w-full h-full bg-paper-dark rounded-md flex items-center justify-center",
                  folderOpen ? "overflow-visible" : "overflow-hidden"
                )}>
                  {activeItem.previewImages && activeItem.previewImages.length > 1 ? (
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
                      onOpenChange={setFolderOpen}
                    />
                  ) : activeItem.previewImage ? (
                  <img
                    src={activeItem.previewImage}
                    alt={activeItem.label}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "w-full h-full cursor-pointer",
                      (activeItem.id === 'venue-checker' || activeItem.id === 'alaga-network')
                        ? "object-contain" 
                        : "object-cover"
                    )}
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
              </div>
            )}

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-display text-lg font-medium text-ink leading-tight mb-2">
              {activeItem.id === 'somnium' && activeItem.link ? (
                // Special handling for SOMNIUM - make only "SOMNIUM" clickable
                (() => {
                  const label = activeItem.label
                  const somniumIndex = label.indexOf('(SOMNIUM)')
                  if (somniumIndex !== -1) {
                    const beforeSomnium = label.substring(0, somniumIndex + 1)
                    const somniumText = 'SOMNIUM'
                    const afterSomnium = label.substring(somniumIndex + 1 + somniumText.length + 1)
                    return (
                      <>
                        {beforeSomnium}
                        <LinkPreview
                          url={activeItem.link}
                          className="inline-block text-accent cursor-pointer underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors font-medium"
                        >
                          {somniumText}
                        </LinkPreview>
                        {afterSomnium}
                      </>
                    )
                  }
                  return label
                })()
              ) : activeItem.link ? (
                <LinkPreview
                  url={activeItem.link}
                  className="block"
                >
                  <span className="hover:text-accent transition-colors cursor-pointer">
                    {activeItem.label}
                  </span>
                </LinkPreview>
              ) : (
                activeItem.label
              )}
            </h3>

            {activeItem.detailCopy && (
              <p className="text-sm text-ink-muted leading-relaxed">
                {activeItem.detailCopy}
              </p>
            )}

            {activeItem.link && (
              <LinkPreview
                url={activeItem.link}
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                <>
                  {activeItem.linkLabel || 'Learn more'}
                  <ExternalLink className="w-3.5 h-3.5" />
                </>
              </LinkPreview>
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
