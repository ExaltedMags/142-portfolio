// ============================================
// Content Data — Kodi Magadia Portfolio
// ============================================

export interface Achievement {
  id: string
  label: string
  kind: 'major' | 'minor'
  interaction: 'previewRail' | 'dialog' | 'tooltip'
  previewImage?: string
  previewImages?: string[] // Multiple images for Folder component
  detailCopy?: string
  tooltipText?: string
  link?: string
  linkLabel?: string
}

// Header content (verbatim from brief)
export const headerContent = {
  name: 'Kodi Magadia',
  program: 'BS Management Information Systems',
  specialization: 'Data Science & Analytics | 4th year',
  tagline: 'Aspiring Product Architect. Digital bridge-builder.',
}

// Achievement items
export const achievements: Achievement[] = [
  {
    id: 'unilab',
    label: 'Corporate Digital Transformation Intern, Unilab Inc.',
    kind: 'major',
    interaction: 'previewRail',
    previewImage: '/assets/unilab.svg',
    detailCopy:
      'Analyzed e-commerce data for flagship consumer health brands. Prototyped a rural health-tech app — a doctor on the review panel called it "his dream."',
    link: undefined,
    linkLabel: undefined,
  },
  {
    id: 'gdsc',
    label: 'COO, Google Developer Student Clubs (ADMU)',
    kind: 'major',
    interaction: 'dialog',
    previewImage: '/assets/gdsc.svg', // Fallback for single image view
    previewImages: [
      '/assets/gdsc.svg',
      '/assets/gdsc.svg',
      '/assets/gdsc.svg',
    ], // Multiple images for Folder
    detailCopy:
      'Orchestrated operations for one of the largest tech communities on campus. Coordinated workshops, hackathons, and speaker events.',
  },
  {
    id: 'somnium',
    label: 'Led ₱650K benefit concert, 2,000+ attendees (SOMNIUM)',
    kind: 'major',
    interaction: 'dialog',
    previewImage: '/assets/somnium.svg', // Fallback for single image view
    previewImages: [
      '/assets/somnium/somnium-1.png',
      '/assets/somnium/somnium-2.jpg',
      '/assets/somnium/somnium-3.jpg',
    ], // Multiple images for Folder
    detailCopy:
      'Directed the logistics and tech infrastructure for SOMNIUM, a benefit concert that raised ₱650,000 for charity. Managed vendor coordination, ticketing systems, and on-ground operations for over 2,000 attendees.',
  },
  {
    id: 'alaga-network',
    label: 'Built early-stage health & campus tools (quietly shipped)',
    kind: 'major',
    interaction: 'dialog',
    previewImage: '/assets/alaga-network.svg', // Fallback for single image view
    previewImages: ['/assets/alaga-network.svg', '/assets/alaga-network.svg', '/assets/alaga-network.svg'], // Multiple images for Folder
    detailCopy:
      'AlagaNetwork — a rural health-tech platform connecting barangay health workers with real-time data. Currently in pilot conversations with municipal health offices.',
    link: undefined,
    linkLabel: 'Learn more',
  },
  {
    id: 'venue-checker',
    label: 'College venue availability checker (releasing soon)',
    kind: 'major',
    interaction: 'dialog',
    previewImage: '/assets/venue-checker.svg',
    detailCopy:
      'A lightweight tool that scrapes and displays real-time availability of campus venues. Releasing soon — this class hears it first.',
    link: undefined,
    linkLabel: 'Coming soon',
  },
  {
    id: 'pc-builder',
    label: 'PC enthusiast',
    kind: 'minor',
    interaction: 'tooltip',
    tooltipText:
      'Assembled custom rigs for gaming and productivity. Obsessed with cable management.',
  },
  {
    id: 'vainglory',
    label: 'Competitive strategist (Vainglory)',
    kind: 'minor',
    interaction: 'tooltip',
    tooltipText:
      'Former ranked player. Learned macro strategy, team coordination, and tilt management.',
  },
  {
    id: 'deans-lister',
    label: "Dean's Lister",
    kind: 'minor',
    interaction: 'tooltip',
    tooltipText: 'Consistent academic standing across multiple semesters.',
  },
  {
    id: 'valedictorian',
    label: 'Grade School Valedictorian',
    kind: 'minor',
    interaction: 'tooltip',
    tooltipText:
      'An early indicator of stubbornness and an obsession with doing things well.',
  },
]

// Narrative content (verbatim from brief)
export const narrativeContent = {
  whatIDo: `I design and test products across layers—hardware constraints, data, software, and human behavior.`,

  unilab: `At Unilab, I analyzed e-commerce data for flagship consumer health brands and prototyped a rural health-tech app. A doctor on the review panel called it "his dream." I plan to return to this after graduation—starting with Unilab.`,

  tools: `Outside work, I build small, practical tools to remove everyday friction: AlagaNetwork (rural health-tech), a college venue availability checker (releasing soon — this class hears it first).`,

  howIOperate: `How I operate: Radical candor. Slow productivity. Ship early → learn → refine.`,

  trajectory: `Trajectory: 10 yrs → Product architect solving last-mile data & access problems. 15 yrs → Founder/CTO of a rural tech startup. 20+ yrs → Angel & policy advisor.`,
}

// Footer content
export const footerContent = {
  currentStatus: 'Currently open to product & data roles post-graduation.',
  email: undefined, // Add email if desired
}
