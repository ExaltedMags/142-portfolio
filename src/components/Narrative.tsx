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
            <LinkPreview 
              url="https://alaga-network.vercel.app/" 
              className="inline-block text-accent cursor-pointer underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors"
            >
              AlagaNetwork
            </LinkPreview>
            {' '}(yes, that same health-tech app), a{' '}
            <LinkPreview 
              url="https://admu-vac.vercel.app/" 
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
                    <div className="w-full">
                      <img 
                        src="/assets/radical-candor-fully-revised-updated-edition.jpg" 
                        alt="Radical Candor book cover"
                        className="w-32 rounded-sm mb-2 mx-auto"
                      />
                      <p className="text-sm">I aim to be direct and honest in feedback, while staying respectful and invested in the people I work with.</p>
                    </div>
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
                    <div className="w-full">
                      <img 
                        src="/assets/slowprod.jpg" 
                        alt="Slow Productivity book cover"
                        className="w-32 rounded-sm mb-2 mx-auto"
                      />
                      <p className="text-sm">Focusing on fewer things at a time and doing them well, rather than optimizing for constant busyness.</p>
                    </div>
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
        <p className="font-mono mb-4 text-lg md:text-xl text-ink font-semibold">Hybrid role</p>
        <p className="text-sm md:text-base text-ink-faint leading-relaxed">
          Fulfill the "MIS prophecy" and work at the intersection of strategy and tech; owning product systems while helping teams address data, access, and adoption challenges, especially in the margins.
        </p>
      </div>
    ),
  },
  {
    title: '15 yrs',
    content: (
      <div className="text-base md:text-lg text-ink-muted leading-relaxed">
        <p className="font-mono mb-4 text-lg md:text-xl text-ink font-semibold">Builder phase</p>
        <p className="text-sm md:text-base text-ink-faint leading-relaxed">
          Building and leading (or at least working for) a digital-divide tech company aimed at bridging gaps across healthcare, connectivity, and essential digital services.
        </p>
      </div>
    ),
  },
  {
    title: '20 yrs',
    content: (
      <div className="text-base md:text-lg text-ink-muted leading-relaxed">
        <p className="font-mono mb-4 text-lg md:text-xl text-ink font-semibold">Leverage phase</p>
        <p className="text-sm md:text-base text-ink-faint leading-relaxed">
          Remain active in the field: working on my craft, advising founders, investing in early-stage efforts, and contributing to technology policy around digital inclusion, connectivity, and infrastructure.
        </p>
      </div>
    ),
  },
]
