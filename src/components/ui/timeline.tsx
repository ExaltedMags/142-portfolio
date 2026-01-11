"use client";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  MotionValue,
} from "motion/react";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

// Custom scrollbar component that's always interactive
function ScrollbarTrack({
  scrollYProgress,
  contentWidth,
  containerWidth,
  containerRef,
  scrollableHeight,
}: {
  scrollYProgress: MotionValue<number>;
  contentWidth: number;
  containerWidth: number;
  containerRef: React.RefObject<HTMLDivElement>;
  scrollableHeight: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Calculate thumb width - ensure minimum size for easy grabbing
  const thumbWidthPercent = contentWidth > 0 
    ? Math.max(5, (containerWidth / contentWidth) * 100) 
    : 20;
  
  // Track width for calculations
  const [trackWidth, setTrackWidth] = useState(0);
  
  useEffect(() => {
    const updateTrackWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.offsetWidth);
      }
    };
    updateTrackWidth();
    window.addEventListener('resize', updateTrackWidth);
    return () => window.removeEventListener('resize', updateTrackWidth);
  }, []);
  
  // Calculate actual thumb width in pixels, ensuring minimum 40px
  const thumbWidthPx = trackWidth > 0 
    ? Math.max(40, (thumbWidthPercent / 100) * trackWidth)
    : 40;
  
  // Effective thumb width percent (accounting for minimum)
  const effectiveThumbWidthPercent = trackWidth > 0
    ? (thumbWidthPx / trackWidth) * 100
    : thumbWidthPercent;

  // Handle clicking on track to jump to position
  const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || !containerRef.current || trackWidth === 0) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - trackRect.left;
    
    // Calculate progress based on click position (accounting for thumb width)
    const thumbWidth = (effectiveThumbWidthPercent / 100) * trackWidth;
    const maxThumbLeft = trackWidth - thumbWidth;
    const targetLeft = Math.max(0, Math.min(clickX - thumbWidth / 2, maxThumbLeft));
    const progress = maxThumbLeft > 0 ? targetLeft / maxThumbLeft : 0;
    
    // Scroll to position
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + containerRect.top;
    const scrollableRange = scrollableHeight - window.innerHeight;
    
    window.scrollTo({
      top: containerTop + progress * scrollableRange,
      behavior: 'smooth'
    });
  }, [containerRef, scrollableHeight, effectiveThumbWidthPercent, trackWidth]);

  // Handle thumb drag start
  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    // Store the offset from mouse click to thumb center for smooth dragging
    if (trackRef.current) {
      const trackRect = trackRef.current.getBoundingClientRect();
      const thumbWidth = (effectiveThumbWidthPercent / 100) * trackWidth;
      const currentProgress = scrollYProgress.get();
      const currentThumbLeft = currentProgress * (trackWidth - thumbWidth);
      const thumbCenter = currentThumbLeft + thumbWidth / 2;
      const mouseX = e.clientX - trackRect.left;
      setDragStartX(mouseX - thumbCenter); // Store offset from thumb center
    }
  }, [scrollYProgress, effectiveThumbWidthPercent, trackWidth]);

  // Handle drag move and end
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!trackRef.current || !containerRef.current || trackWidth === 0) return;
      
      const trackRect = trackRef.current.getBoundingClientRect();
      const mouseX = e.clientX - trackRect.left;
      const thumbWidth = (effectiveThumbWidthPercent / 100) * trackWidth;
      const maxThumbLeft = trackWidth - thumbWidth;
      
      // Calculate where thumb center should be (mouse position minus offset)
      const targetThumbCenter = mouseX - dragStartX;
      // Convert to thumb left position
      const targetThumbLeft = targetThumbCenter - thumbWidth / 2;
      // Clamp to valid range [0, maxThumbLeft]
      const clampedThumbLeft = Math.max(0, Math.min(targetThumbLeft, maxThumbLeft));
      // Convert to progress [0, 1]
      const progress = maxThumbLeft > 0 ? clampedThumbLeft / maxThumbLeft : 0;
      
      // Scroll to new position
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerTop = window.scrollY + containerRect.top;
      const scrollableRange = scrollableHeight - window.innerHeight;
      
      window.scrollTo({
        top: containerTop + progress * scrollableRange,
        behavior: 'auto'
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStartX, containerRef, scrollableHeight, effectiveThumbWidthPercent, trackWidth]);

  // Calculate thumb position from scroll progress
  const thumbLeft = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${100 - effectiveThumbWidthPercent}%`]
  );

  return (
    <div 
      ref={trackRef}
      className="absolute bottom-6 left-4 right-4 py-2 cursor-pointer"
      onClick={handleTrackClick}
    >
      {/* Track background */}
      <div className="h-2 bg-ink/10 rounded-full" />
      
      {/* Thumb */}
      <motion.div
        className={`absolute top-2 h-2 rounded-full transition-colors ${
          isDragging ? 'bg-accent' : 'bg-ink/40 hover:bg-ink/60'
        }`}
        style={{
          width: `${effectiveThumbWidthPercent}%`,
          minWidth: '40px', // Ensure minimum grabbable size
          left: thumbLeft,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleThumbMouseDown}
      />
    </div>
  );
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Content box has max-w-2xl (672px), so use that as the visual "box" width
  const contentBoxMaxWidth = 672;
  const itemWidth = containerWidth > 0 ? containerWidth : 800;
  const itemGap = 0;
  const totalItemWidth = itemWidth + itemGap;
  const dotOuterSize = 64;
  const dotInnerSize = 24;
  
  // The visual content box width (for threshold calculation)
  const contentBoxWidth = Math.min(itemWidth, contentBoxMaxWidth);

  // Measure timeline width
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && contentRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContentWidth(contentRef.current.scrollWidth);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [data]);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll calculation
  const maxScroll = Math.max(0, contentWidth - containerWidth);
  
  // Raw transform for content (no spring for dots to reference)
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);
  
  // Smoothed version for content animation
  const smoothX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Progress line
  const widthTransform = useTransform(scrollYProgress, [0, 1], [0, contentWidth]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);


  // Container height for scroll capture - more height for smoother scrolling
  const scrollableHeight = Math.max(
    contentWidth * 1.5, // 1.5x content width for slower, more controlled scroll
    typeof window !== 'undefined' ? window.innerHeight * 3 : 2400
  );

  const wallPosition = containerWidth / 2;
  const lineTopPosition = 160;
  const dotTopPosition = lineTopPosition - dotOuterSize / 2;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${scrollableHeight}px` }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Background line */}
        <div 
          className="absolute left-0 right-0 h-[2px] bg-[linear-gradient(to_right,var(--tw-gradient-stops))] from-transparent from-[0%] via-ink/15 dark:via-neutral-700 to-transparent to-[100%] [mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)]"
          style={{ top: `${lineTopPosition}px` }}
        />
        
        {/* Progress line */}
        <motion.div
          className="absolute left-0 h-[2px] bg-gradient-to-r from-accent via-accent to-transparent from-[0%] via-[90%] rounded-full"
          style={{ 
            top: `${lineTopPosition}px`,
            width: widthTransform,
            opacity: opacityTransform,
          }}
        />

        {/* Scrolling content */}
        <motion.div
          ref={contentRef}
          className="relative flex items-start"
          style={{ 
            x: smoothX,
            paddingTop: `${dotTopPosition}px`
          }}
        >
          {/* Start spacer - positions first item center at wall */}
          <div className="shrink-0" style={{ width: `${wallPosition - itemWidth / 2}px` }} />
          
          {data.map((item, index) => {
            // When does this item's center reach the wall (center of screen)?
            const thisItemAtWall = index * totalItemWidth;
            
            // CSS sticky behavior: element sticks until parent container's edge passes the threshold
            // For horizontal: dot sticks until content box's RIGHT edge passes the wall (center of screen)
            // Content box is centered, so its right edge is at contentBoxWidth/2 from center
            const maxStickyDistance = contentBoxWidth / 2;
            const releaseThreshold = thisItemAtWall + maxStickyDistance;
            
            // STICKY BEHAVIOR
            const dotX = useTransform(
              x,
              (xValue) => {
                const scrolled = -xValue;
                
                // PHASE 1: Before this item reaches wall
                // Dot moves naturally with content
                if (scrolled <= thisItemAtWall) {
                  return 0;
                }
                
                // PHASE 2: Sticky - dot at wall, card scrolling underneath
                // Dot counters scroll to stay at wall
                if (scrolled > thisItemAtWall && scrolled < releaseThreshold) {
                  return scrolled - thisItemAtWall;
                }
                
                // PHASE 3: Card's right edge has passed wall
                // Release - dot stays at max offset (right edge of its card)
                return maxStickyDistance;
              }
            );

            const isLast = index === data.length - 1;

            return (
              <div
                key={index}
                className="relative shrink-0 flex flex-col items-center"
                style={{ 
                  width: itemWidth,
                  marginRight: isLast ? 0 : itemGap
                }}
              >
                {/* DOT - sticks at wall position */}
                <motion.div
                  className="relative z-40 flex flex-col items-center"
                  style={{ x: dotX }}
                >
                  {/* Outer circle - background covers line, creating gap */}
                  <div 
                    className="flex items-center justify-center rounded-full bg-paper-warm dark:bg-neutral-950"
                    style={{ 
                      width: `${dotOuterSize}px`, 
                      height: `${dotOuterSize}px` 
                    }}
                  >
                    {/* Middle circle with border */}
                    <div 
                      className="rounded-full bg-paper dark:bg-black shadow-lg border-2 border-accent/30 dark:border-neutral-700 flex items-center justify-center"
                      style={{ 
                        width: `${dotOuterSize - 16}px`, 
                        height: `${dotOuterSize - 16}px` 
                      }}
                    >
                      {/* Inner accent dot */}
                      <div 
                        className="rounded-full bg-accent"
                        style={{ 
                          width: `${dotInnerSize}px`, 
                          height: `${dotInnerSize}px` 
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Year label */}
                  <h3 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-bold text-ink dark:text-neutral-300 font-mono whitespace-nowrap text-center">
                    {item.title}
                  </h3>
                </motion.div>

                {/* Content card - max width for readability */}
                <div className="w-full max-w-2xl bg-paper dark:bg-neutral-900 rounded-2xl p-8 md:p-10 lg:p-12 border border-ink/10 dark:border-neutral-700 shadow-lg mt-8">
                  {item.content}
                </div>
              </div>
            );
          })}

          {/* End spacer - extra large to ensure last milestone is fully visible */}
          <div className="shrink-0" style={{ width: `${wallPosition + itemWidth / 2}px` }} />
        </motion.div>

        {/* Custom horizontal scrollbar */}
        <ScrollbarTrack 
          scrollYProgress={scrollYProgress}
          contentWidth={contentWidth}
          containerWidth={containerWidth}
          containerRef={containerRef}
          scrollableHeight={scrollableHeight}
        />

      </div>
    </div>
  );
};

// Alternative: Non-scroll-jacking horizontal timeline
export const HorizontalTimeline = ({ data }: { data: TimelineEntry[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 shadow-lg flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 shadow-lg flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={updateScrollButtons}
        className="flex overflow-x-auto gap-0 py-8 px-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center min-w-[300px] sm:min-w-[350px] md:min-w-[400px] px-4 snap-center"
          >
            <div className="relative w-full flex items-center justify-center mb-6">
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-neutral-200 dark:bg-neutral-700 -translate-y-1/2" />
              <motion.div
                className="relative z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-black shadow-md border-2 border-neutral-200 dark:border-neutral-700"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
              </motion.div>
            </div>

            <motion.h3
              className="text-lg md:text-2xl font-bold text-neutral-500 dark:text-neutral-400 mb-3 text-center"
              initial={{ y: 15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
            >
              {item.title}
            </motion.h3>

            <motion.div
              className="w-full bg-white dark:bg-neutral-900 rounded-lg p-5 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.05 + 0.15 }}
            >
              {item.content}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};
