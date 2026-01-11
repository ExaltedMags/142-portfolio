import { useState, useEffect } from 'react'
import { narrativeContent } from '@/content/achievements'
import { Tooltip } from '@/components/ui/tooltip-card'
import { LinkPreview } from '@/components/ui/link-preview'
import { Timeline, HorizontalTimeline } from '@/components/ui/timeline'

// Simple hook to check if viewport is mobile
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  return isMobile
}

export function Narrative() {
  const isMobile = useIsMobile()
  return (
    <section className="section py-16 md:py-24 bg-paper-warm" aria-labelledby="narrative-heading">
      <div className="container-editorial">
        <h2 id="narrative-heading" className="sr-only">
          About Me
        </h2>

        <div className="max-w-2xl space-y-8">
          {/* What I Do */}
          <p className="text-lg md:text-xl leading-relaxed text-ink fade-in-up">
            {narrativeContent.whatIDo}
          </p>

          {/* Unilab story */}
          <p className="text-ink-muted leading-relaxed fade-in-up delay-1">
            At Unilab, I analyzed e-commerce data for flagship consumer health brands and prototyped a{' '}
            <Tooltip content="A mobile app connecting rural health workers with real-time patient data and telemedicine capabilities. Designed for low-bandwidth environments.">
              <span className="text-accent cursor-help underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors">
                rural health-tech app
              </span>
            </Tooltip>
            {' '}— a doctor on the panel called it "his dream." I plan to return to this after graduation—starting with Unilab.
          </p>

          {/* Tools */}
          <p className="text-ink-muted leading-relaxed fade-in-up delay-2">
            Outside work, I build small, practical tools to remove everyday friction:{' '}
            <Tooltip content="A platform connecting barangay health workers in Geographically Isolated and Disadvantaged Areas (GIDAs) with real-time data.">
              <span className="text-accent cursor-help underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors">
                AlagaNetwork
              </span>
            </Tooltip>
            {' '}(rural health-tech), a{' '}
            <LinkPreview 
              url="https://admu-vac.onrender.com" 
              className="inline-block text-accent cursor-pointer underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors"
            >
              venue availability checker
            </LinkPreview>
            , and a{' '}
            <Tooltip 
              content={
                <div>
                  <img 
                    src="/assets/video-capture-t0021.21seg-9382.png" 
                    alt="TNVS price comparison platform"
                    className="w-full rounded-sm mb-2"
                  />
                  <p className="text-sm">A platform for comparing prices across different Transportation Network Vehicle Services (TNVS) to help users find the best rates.</p>
                </div>
              }
            >
              <span className="text-accent cursor-help underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors">
                TNVS price comparison platform
              </span>
            </Tooltip>
            .
          </p>

          {/* How I Operate */}
          <div className="fade-in-up delay-3">
            <h3 className="text-ink font-medium mb-3">How I operate:</h3>
            <ul className="list-disc list-inside space-y-2 text-ink font-medium">
              <li>
                <Tooltip 
                  content={
                    <img 
                      src="/assets/radical-candor-fully-revised-updated-edition.jpg" 
                      alt="Radical Candor book cover"
                      className="max-w-[200px] rounded-sm"
                    />
                  }
                >
                  <span className="text-accent cursor-help underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors">
                    Radical candor
                  </span>
                </Tooltip>
              </li>
              <li>
                <Tooltip 
                  content={
                    <img 
                      src="/assets/slowprod.jpg" 
                      alt="Slow Productivity book cover"
                      className="max-w-[200px] rounded-sm"
                    />
                  }
                >
                  <span className="text-accent cursor-help underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors">
                    Slow productivity
                  </span>
                </Tooltip>
              </li>
              <li>Ship early → fail fast → learn → refine.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trajectory Timeline - Full Width */}
      <div className="w-screen relative -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] mt-12 pt-8 border-t border-ink/10 fade-in-up delay-4">
        <div className="w-full flex justify-center mb-4 md:mb-6 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-ink text-center">
            Where I want to be in x years
          </h2>
        </div>
        {isMobile ? (
          <HorizontalTimeline
            data={timelineData}
          />
        ) : (
          <Timeline
            data={timelineData}
          />
        )}
      </div>
    </section>
  )
}

// Timeline data extracted to avoid duplication
const timelineData = [
  {
    title: '10 yrs',
    content: (
      <div className="text-base md:text-lg text-ink-muted leading-relaxed">
        <p className="font-mono mb-4 text-lg md:text-xl text-ink font-semibold">Product architect</p>
        <p className="text-sm md:text-base text-ink-faint leading-relaxed">
          Solving last-mile data & access problems.
        </p>
      </div>
    ),
  },
  {
    title: '15 yrs',
    content: (
      <div className="text-base md:text-lg text-ink-muted leading-relaxed">
        <p className="font-mono mb-4 text-lg md:text-xl text-ink font-semibold">Founder/CTO</p>
        <p className="text-sm md:text-base text-ink-faint leading-relaxed">
          Leading a rural tech startup focused on bridging digital divides and improving access to essential services.
        </p>
      </div>
    ),
  },
  {
    title: '20+ yrs',
    content: (
      <div className="text-base md:text-lg text-ink-muted leading-relaxed">
        <p className="font-mono mb-4 text-lg md:text-xl text-ink font-semibold">Angel & policy advisor</p>
        <p className="text-sm md:text-base text-ink-faint leading-relaxed">
          Investing and advising on technology policy, especially around rural connectivity and health data infrastructure.
        </p>
      </div>
    ),
  },
]
