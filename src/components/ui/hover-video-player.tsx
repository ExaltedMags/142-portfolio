import React, { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface HoverVideoPlayerProps {
  videoSrc: string
  thumbnailSrc?: string
  className?: string
  style?: React.CSSProperties
  muted?: boolean
  loop?: boolean
  preload?: 'auto' | 'metadata' | 'none'
}

// Check if device supports hover (not a touch-only device)
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Check for touch capability
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(hover: none)').matches)
    }
    checkTouch()
    window.matchMedia('(hover: none)').addEventListener('change', checkTouch)
    return () => window.matchMedia('(hover: none)').removeEventListener('change', checkTouch)
  }, [])

  return isTouch
}

export function HoverVideoPlayer({
  videoSrc,
  thumbnailSrc,
  className,
  style,
  muted = false,
  loop = true,
  preload = 'metadata',
}: HoverVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isTouchDevice = useIsTouchDevice()
  const [isHovering, setIsHovering] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(muted ? 0 : 1)
  const [isMuted, setIsMuted] = useState(muted)
  const [showControls, setShowControls] = useState(false)

  // Auto-hide controls after inactivity on touch devices
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isTouchDevice && showControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        if (!isPlaying) return // Keep controls visible when paused
        setShowControls(false)
      }, 3000)
    }
  }, [isTouchDevice, showControls, isPlaying])

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return // Ignore mouse events on touch devices
    setIsHovering(true)
    setShowControls(true)
  }, [isTouchDevice])

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return // Ignore mouse events on touch devices
    setIsHovering(false)
    setShowControls(false)
  }, [isTouchDevice])

  // Handle tap/click on video container for touch devices
  const handleContainerClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Don't handle if clicking on controls
    const target = e.target as HTMLElement
    if (target.closest('.video-controls')) return

    if (isTouchDevice) {
      // On touch: toggle controls visibility, and play/pause
      if (!showControls) {
        setShowControls(true)
        resetControlsTimeout()
      } else {
        // If controls are visible and we tap, toggle play/pause
        if (isPlaying) {
          videoRef.current?.pause()
          setIsPlaying(false)
        } else {
          videoRef.current?.play()
          setIsPlaying(true)
          setShowThumbnail(false)
        }
        resetControlsTimeout()
      }
    }
  }, [isTouchDevice, showControls, isPlaying, resetControlsTimeout])

  const playVideo = useCallback(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    setIsLoading(true)

    const attemptPlay = () => {
      video
        .play()
        .then(() => {
          setIsLoading(false)
          setIsPlaying(true)
          setShowThumbnail(false)
        })
        .catch((error) => {
          console.error('Video play error:', error)
          setIsLoading(false)
          setShowThumbnail(true)
        })
    }

    if (video.readyState >= 3) {
      attemptPlay()
    } else {
      const handleCanPlay = () => {
        video.removeEventListener('canplay', handleCanPlay)
        attemptPlay()
      }
      video.addEventListener('canplay', handleCanPlay)
    }
  }, [])

  const pauseVideo = useCallback(() => {
    if (!videoRef.current) return
    videoRef.current.pause()
    setIsPlaying(false)
    setShowThumbnail(true)
  }, [])

  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      pauseVideo()
    } else {
      playVideo()
    }
  }, [isPlaying, playVideo, pauseVideo])

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    const newMuted = !isMuted
    setIsMuted(newMuted)
    videoRef.current.muted = newMuted
    if (newMuted) {
      setVolume(0)
    } else {
      setVolume(1)
      videoRef.current.volume = 1
    }
  }, [isMuted])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    videoRef.current.volume = newVolume
    setIsMuted(newVolume === 0)
    videoRef.current.muted = newVolume === 0
  }, [])

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressBarRef.current || duration === 0) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }, [duration])

  const formatTime = useCallback((seconds: number) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  // Handle hover state changes (desktop only)
  useEffect(() => {
    if (isTouchDevice) return // Skip for touch devices
    if (isHovering && !isPlaying) {
      playVideo()
    } else if (!isHovering && isPlaying) {
      pauseVideo()
    }
  }, [isHovering, isPlaying, playVideo, pauseVideo, isTouchDevice])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlaying = () => {
      setIsLoading(false)
      setIsPlaying(true)
      setShowThumbnail(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
      setShowThumbnail(true)
    }

    const handleLoadStart = () => {
      setIsLoading(true)
    }

    const handleLoadedData = () => {
      setIsLoading(false)
      setDuration(video.duration || 0)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleDurationChange = () => {
      setDuration(video.duration || 0)
    }

    const handleVolumeChange = () => {
      setVolume(video.volume)
      setIsMuted(video.muted)
    }

    video.addEventListener('playing', handlePlaying)
    video.addEventListener('pause', handlePause)
    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('durationchange', handleDurationChange)
    video.addEventListener('volumechange', handleVolumeChange)

    // Set video source if not already set
    if (!video.src) {
      video.src = videoSrc
      video.load()
    }

    return () => {
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('loadstart', handleLoadStart)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('durationchange', handleDurationChange)
      video.removeEventListener('volumechange', handleVolumeChange)
    }
  }, [videoSrc])

  // Set video properties
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = muted
    video.loop = loop
    video.preload = preload
    video.playsInline = true
  }, [muted, loop, preload])

  return (
    <motion.div
      ref={containerRef}
      className={cn('relative overflow-hidden rounded-md cursor-pointer', className)}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted={muted}
        loop={loop}
        preload={preload}
        playsInline
        aria-label="Video player"
      />

      {/* Thumbnail */}
      {thumbnailSrc && showThumbnail && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={thumbnailSrc}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Play indicator for touch devices */}
          {isTouchDevice && !isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}

      {/* Video Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-end pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            
            {/* Controls */}
            <div className="video-controls relative z-10 p-2 sm:p-3 pointer-events-auto">
              {/* Progress bar */}
              <div
                ref={progressBarRef}
                className="relative h-1 bg-white/20 rounded-full mb-2 cursor-pointer group"
                onClick={handleProgressClick}
              >
                <div
                  className="absolute left-0 top-0 h-full bg-accent rounded-full transition-all"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `calc(${duration > 0 ? (currentTime / duration) * 100 : 0}% - 6px)` }}
                />
              </div>

              {/* Bottom controls bar */}
              <div className="flex items-center gap-2">
                {/* Play/Pause button */}
                <button
                  onClick={togglePlayPause}
                  className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors shrink-0"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  ) : (
                    <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  )}
                </button>

                {/* Volume control */}
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors shrink-0"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                    ) : (
                      <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-accent"
                    style={{
                      background: `linear-gradient(to right, rgb(196, 93, 58) 0%, rgb(196, 93, 58) ${(isMuted ? 0 : volume) * 100}%, rgba(255, 255, 255, 0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255, 255, 255, 0.2) 100%)`
                    }}
                  />
                </div>

                {/* Time display */}
                <div className="text-white text-xs sm:text-sm font-mono shrink-0 px-1.5">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
