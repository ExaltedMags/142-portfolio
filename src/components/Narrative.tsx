import { narrativeContent } from '@/content/achievements'
import { Tooltip } from '@/components/ui/tooltip-card'
import { LinkPreview } from '@/components/ui/link-preview'
import { Timeline } from '@/components/ui/timeline'

export function Narrative() {
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
            {' '}— a doctor on the review panel called it "his dream." I plan to return to this after graduation—starting with Unilab.
          </p>

          {/* Tools */}
          <p className="text-ink-muted leading-relaxed fade-in-up delay-2">
            Outside work, I build small, practical tools to remove everyday friction:{' '}
            <Tooltip content="A platform connecting barangay health workers with real-time data. Currently in pilot conversations with municipal health offices.">
              <span className="text-accent cursor-help underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors">
                AlagaNetwork
              </span>
            </Tooltip>
            {' '}(rural health-tech), a{' '}
            <LinkPreview url="https://admu-vac.onrender.com" className="inline-block">
              <a
                href="https://admu-vac.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent cursor-pointer underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors"
              >
                college venue availability checker
              </a>
            </LinkPreview>
            {' '}(releasing soon — this class hears it first).
          </p>

          {/* How I Operate */}
          <p className="text-ink font-medium fade-in-up delay-3">
            How I operate:{' '}
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
            .{' '}
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
            . Ship early → learn → refine.
          </p>
        </div>
      </div>

      {/* Trajectory Timeline - Full Width */}
      <div className="w-screen relative -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] mt-12 pt-8 border-t border-ink/10 fade-in-up delay-4">
        <Timeline
          data={[
            {
              title: '10 yrs',
              content: (
                <div className="text-base md:text-lg text-ink-muted leading-relaxed">
                  <p className="font-mono mb-4 text-lg md:text-xl text-ink font-semibold">Product architect</p>
                  <p className="text-sm md:text-base text-ink-faint leading-relaxed">
                    Solving{' '}
                    <Tooltip content="The final step in data delivery — getting information to end users in remote or underserved areas where infrastructure is limited.">
                      <span className="text-accent cursor-help underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors">
                        last-mile data & access problems
                      </span>
                    </Tooltip>
                    .
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
                    <Tooltip content="Early-stage investor and advisor on technology policy, especially around rural connectivity and health data infrastructure.">
                      <span className="text-accent cursor-help underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors">
                        Investing and advising
                      </span>
                    </Tooltip>
                    {' '}on technology policy, especially around rural connectivity and health data infrastructure.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>
    </section>
  )
}
