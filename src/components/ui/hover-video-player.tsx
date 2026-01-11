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

export function HoverVideoPlayer({
  videoSrc,
  thumbnailSrc,
  className,
  style,
  muted: initialMuted = true,
  loop = true,
  preload = 'metadata',
}: HoverVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(initialMuted)
  const [showControls, setShowControls] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
    setShowControls(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    // Keep controls visible briefly, then hide
    setTimeout(() => {
      setShowControls(false)
    }, 300)
  }, [])

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

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      pauseVideo()
    } else {
      playVideo()
    }
  }, [isPlaying, playVideo, pauseVideo])

  // Toggle mute
  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev)
  }, [])

  // Handle volume change
  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume)
    if (newVolume > 0) {
      setMuted(false)
    }
  }, [])

  // Handle progress bar click
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressBarRef.current) return
    
    const rect = progressBarRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration
    
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }, [duration])

  // Handle progress bar drag
  const handleProgressMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!videoRef.current || !progressBarRef.current) return
      
      const rect = progressBarRef.current.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, clickX / rect.width))
      const newTime = percentage * duration
      
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, duration])

  // Handle hover state changes
  useEffect(() => {
    if (isHovering && !isPlaying && !isDragging) {
      playVideo()
    } else if (!isHovering && isPlaying && !isDragging) {
      pauseVideo()
    }
  }, [isHovering, isPlaying, isDragging, playVideo, pauseVideo])

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
    }

    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(video.currentTime)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleDurationChange = () => {
      setDuration(video.duration)
    }

    video.addEventListener('playing', handlePlaying)
    video.addEventListener('pause', handlePause)
    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('durationchange', handleDurationChange)

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
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('durationchange', handleDurationChange)
    }
  }, [videoSrc, isDragging])

  // Set video properties
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = muted
    video.volume = volume
    video.loop = loop
    video.preload = preload
    video.playsInline = true
  }, [muted, volume, loop, preload])

  // Format time helper
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <motion.div
      ref={containerRef}
      className={cn('relative overflow-hidden rounded-md', className)}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

      {/* Video Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => {
              if (!isHovering) {
                setTimeout(() => setShowControls(false), 300)
              }
            }}
          >
            {/* Progress Bar */}
            <div
              ref={progressBarRef}
              className="relative h-1.5 bg-white/20 rounded-full mb-3 cursor-pointer group"
              onClick={handleProgressClick}
              onMouseDown={handleProgressMouseDown}
            >
              <div
                className="absolute left-0 top-0 h-full bg-accent rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${progressPercentage}% - 6px)` }}
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between gap-4">
              {/* Left: Play/Pause and Time */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlayPause}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white" />
                  )}
                </button>
                <span className="text-xs text-white/80 font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Right: Volume Control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label={muted ? 'Unmute' : 'Mute'}
                >
                  {muted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
                <div className="flex items-center gap-2 w-24">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={muted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-accent"
                    style={{
                      background: `linear-gradient(to right, rgb(196, 93, 58) 0%, rgb(196, 93, 58) ${(muted ? 0 : volume) * 100}%, rgba(255, 255, 255, 0.2) ${(muted ? 0 : volume) * 100}%, rgba(255, 255, 255, 0.2) 100%)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
