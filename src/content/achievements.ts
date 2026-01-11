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
  spotifyUrl?: string
  videoUrl?: string
  videoThumbnail?: string
}

// Header content (verbatim from brief)
export const headerContent = {
  name: 'Kodi Magadia',
  program: 'BS Management Information Systems',
  specialization: 'Data Science & Analytics | 4th year',
  tagline: 'Aspiring Product Engineer. Digital bridge-builder.',
}

// Achievement items
export const achievements: Achievement[] = [
  {
    id: 'unilab',
    label: 'Corporate Digital Transformation Intern, Unilab Inc.',
    kind: 'major',
    interaction: 'previewRail',
    previewImage: '/assets/unilab.jpg',
    detailCopy:
      'Analyzed e-commerce data for flagship consumer health brands. Prototyped a rural health-tech app — a doctor on the review panel called it "his dream."',
    link: undefined,
    linkLabel: undefined,
  },
  {
    id: 'gdsc',
    label: 'COO, Google Developer Student Clubs - Loyola',
    kind: 'major',
    interaction: 'dialog',
    previewImage: '/assets/gdsc.svg', // Fallback for single image view
    previewImages: [
      '/assets/gdsc/gdsc-1.jpg',
      '/assets/gdsc/gdsc-2.jpg',
      '/assets/gdsc/gdsc-3.jpg',
    ], // Multiple images for Folder
    detailCopy:
      'Orchestrated operations for one of the largest tech communities on campus. Coordinated workshops, hackathons, and speaker events.',
  },
  {
    id: 'intact-facilitator',
    label: 'InTACT Student Facilitator',
    kind: 'major',
    interaction: 'previewRail',
    previewImage: '/assets/intact.png',
    detailCopy:
      'Guided freshmen through their first year, providing mentorship and support during their transition to university life.',
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
    link: 'https://www.facebook.com/somnium2020/',
    linkLabel: 'Visit Facebook page',
  },
  {
    id: 'alaga-network',
    label: 'AlagaNetwork',
    kind: 'major',
    interaction: 'dialog',
    previewImage: '/assets/alaga-network.svg',
    detailCopy:
      'A rural health-tech platform connecting barangay health workers in Geographically Isolated and Disadvantaged Areas (GIDAs) with real-time data.',
    link: undefined,
    linkLabel: 'Learn more',
  },
  {
    id: 'venue-checker',
    label: 'ADMU venue availability checker',
    kind: 'major',
    interaction: 'dialog',
    previewImage: '/assets/venue-qr.png',
    detailCopy:
      'A lightweight tool that scrapes and displays real-time availability of campus venues. Coming soon!',
    link: 'https://admu-vac.onrender.com',
    linkLabel: 'Visit site',
  },
  {
    id: 'pc-builder',
    label: 'PC enthusiast',
    kind: 'major',
    interaction: 'previewRail',
    previewImage: '/assets/ltt.jpg',
    detailCopy:
      'Thank you, Linus Tech Tips, for the inspiration, and for kicking off my MIS journey.',
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
    id: 'musician',
    label: 'A bit of an amateur musician; guitarist and drummer',
    kind: 'major',
    interaction: 'previewRail',
    detailCopy:
      'Belief - John Mayer',
    videoUrl: '/assets/music/guitar-playing.mov',
    videoThumbnail: '/assets/music/guitar-thumbnail.png',
    spotifyUrl: 'https://open.spotify.com/track/4vaNwLCX5wiN5aFDZuTnXi?si=a416d58d97a24404',
  },
  {
    id: 'songwriting-contest',
    label: '2nd place, high school songwriting contest',
    kind: 'major',
    interaction: 'previewRail',
    detailCopy:
      'Won 2nd place composing, playing instruments, and writing lyrics for a SHS music contest.',
    spotifyUrl: 'https://open.spotify.com/track/4vaNwLCX5wiN5aFDZuTnXi?si=a9be8ff4ee1947ac',
  },
  {
    id: 'coffee',
    label: 'Coffee connoisseur',
    kind: 'major',
    interaction: 'dialog',
    previewImage: '/assets/coffee.jfif',
    detailCopy:
      'Always on the hunt for the perfect cup. Fan of bright and fruity notes. Espresso boy.',
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
  whatIDo: `I work on products by thinking through constraints; technical, hardware, data-related, and human.`,

  unilab: `At Unilab, I analyzed e-commerce data for flagship consumer health brands and prototyped a rural health-tech app. A doctor on the review panel called it "his dream." I plan to return to this after graduation—starting with Unilab.`,

  tools: `Outside work, I build small, practical tools to remove everyday friction: AlagaNetwork (rural health-tech), a venue availability checker, and a TNVS price comparison platform.`,

  howIOperate: `How I operate: Radical candor. Slow productivity. Ship early → fail fast → learn → refine.`,

  trajectory: `Trajectory: 10 yrs → Product architect solving last-mile data & access problems. 15 yrs → Founder/CTO of a rural tech startup. 20+ yrs → Angel & policy advisor.`,
}

// Footer content
export const footerContent = {
  currentStatus: 'Currently open to product & data roles post-graduation.',
  email: undefined, // Add email if desired
}
