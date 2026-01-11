import { narrativeContent } from '@/content/achievements'
import { Tooltip } from '@/components/ui/tooltip-card'

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
            <Tooltip content="A lightweight tool that scrapes and displays real-time availability of campus venues. Releasing soon — this class hears it first.">
              <span className="text-accent cursor-help underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors">
                college venue availability checker
              </span>
            </Tooltip>
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

          {/* Trajectory */}
          <div className="pt-4 border-t border-ink/10 fade-in-up delay-4">
            <p className="text-sm text-ink-muted leading-relaxed font-mono">
              Trajectory: 10 yrs → Product architect solving{' '}
              <Tooltip content="The final step in data delivery — getting information to end users in remote or underserved areas where infrastructure is limited.">
                <span className="text-accent cursor-help underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors">
                  last-mile data & access problems
                </span>
              </Tooltip>
              . 15 yrs → Founder/CTO of a rural tech startup. 20+ yrs →{' '}
              <Tooltip content="Early-stage investor and advisor on technology policy, especially around rural connectivity and health data infrastructure.">
                <span className="text-accent cursor-help underline decoration-accent/30 underline-offset-2 hover:decoration-accent/60 transition-colors">
                  Angel & policy advisor
                </span>
              </Tooltip>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
