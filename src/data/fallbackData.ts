import type { Portfolio, PortfolioFormValues } from '../types/portfolio'

export const siteProfile = {
  name: 'Gymnastiar Ramadhan',
  headline: 'UI/UX Designer and Frontend Developer Focused on Functional, Aesthetic Digital Products',
  shortBio:
    'UI/UX Designer with 5 years of experience, focused on problem-solving and creating functional, aesthetic designs through a user-centered approach. Experienced in shaping ideas from research, wireframing, and prototyping into responsive frontend code using React, HTML, CSS, and JavaScript.',
  profileImage:
    '/img/profile-new.png',
  location: 'Jakarta, Indonesia',
  availability: 'Freelance and in-house collaboration information available by email',
  yearsOfExperience: '5+ years',
  email: 'gymnastiar32@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/gymnastiar-ramadhan-4406a231b/',
    behance: '',
    dribbble: '',
    figma: 'https://www.figma.com/@gymnastiar32',
    github: 'https://github.com/gymnastiar32',
  },
}

export const skillGroups = [
  {
    title: "UI/UX Design",
    description: "Designing intuitive, user-centered interfaces from flows to polished screens.",
    skills: ["User Flow", "Wireframing", "Prototyping", "UI Design", "Design Systems"],
  },
  {
    title: "Research & Strategy",
    description: "Understanding users and defining the right problems to solve.",
    skills: ["User Research", "Usability Testing", "A/B Testing"],
  },
  {
    title: "Frontend Development",
    description: "Coding responsive, interactive interfaces with clean structure and smooth UI behavior.",
    skills: ["React", "HTML", "CSS", "JavaScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Tools & Collaboration",
    description: "Working effectively with tools and cross-functional teams.",
    skills: ["Figma", "Developer Handoff", "Design-to-Code", "GitHub", "Agile Workflow"],
  },
];

export const portfolioCategories = ['SaaS Platform', 'E-Commerce', 'Mobile App', 'UX Audit', 'Dashboard']

export const fallbackPortfolios: Portfolio[] = [
  {
    id: 'fallback-lattice',
    title: 'LatticePay Merchant Console Redesign',
    slug: 'latticepay-merchant-console-redesign',
    category: 'Dashboard',
    short_description:
      'A B2B dashboard redesign that reduced reconciliation confusion and gave finance teams clearer daily visibility.',
    overview:
      'LatticePay needed to modernize a dense merchant console used by support, finance, and operations teams. The previous interface buried transaction context behind tables and modals, making routine reconciliation slower than it needed to be.',
    role: 'Lead UI/UX Designer',
    timeline: '12 weeks, from discovery to design QA',
    status: 'publish',
    featured: true,
    thumbnail_url:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    cover_image_url:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    problem_statement:
      'Finance teams were relying on spreadsheet exports because the dashboard could not answer basic questions quickly enough. Important account signals were visible, but not structured for decision-making.',
    goals:
      'Simplify transaction review, create clearer hierarchy for key merchant metrics, and help internal teams resolve issues without leaving the product.',
    process:
      'I ran stakeholder interviews, mapped high-frequency operational tasks, audited support tickets, built low-fidelity task flows, then translated those insights into a modular dashboard framework with prioritised KPI zones.',
    solution:
      'The redesign introduced a layered overview with summary cards, an activity panel, contextual transaction states, and a reusable filter system. Dense tables were preserved where necessary but wrapped in a clearer narrative and stronger defaults.',
    result:
      'Internal testing showed faster task completion for reconciliation and fewer support escalations caused by unclear transaction states. The console also became easier for product managers to demo to enterprise merchants.',
    lessons_learned:
      'In B2B products, visual simplicity alone is not enough. Teams trust interfaces that make operational exceptions obvious, not hidden.',
    created_at: '2026-01-14T09:00:00.000Z',
    updated_at: '2026-03-02T09:00:00.000Z',
    tools: [
      { tool_name: 'Figma', sort_order: 0 },
      { tool_name: 'Notion', sort_order: 1 },
      { tool_name: 'Maze', sort_order: 2 },
      { tool_name: 'Miro', sort_order: 3 },
    ],
    gallery: [
      {
        image_url:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        caption: 'Dashboard overview balancing KPIs, alerts, and transaction context.',
        sort_order: 0,
      },
      {
        image_url:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
        caption: 'Operational detail pages designed for fast issue resolution.',
        sort_order: 1,
      },
    ],
  },
  {
    id: 'fallback-serein',
    title: 'Serein Skincare Guided Checkout Experience',
    slug: 'serein-skincare-guided-checkout-experience',
    category: 'E-Commerce',
    short_description:
      'A guided skincare purchase flow designed to reduce decision fatigue and increase bundle confidence.',
    overview:
      'Serein sells curated skincare routines but visitors often hesitated at checkout because they were unsure whether products worked well together. The experience needed stronger reassurance and a more coherent routine-based story.',
    role: 'Senior Product Designer',
    timeline: '8 weeks, including validation and handoff',
    status: 'publish',
    featured: true,
    thumbnail_url:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    cover_image_url:
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=80',
    problem_statement:
      'Customers wanted confidence, not just product cards. Existing checkout patterns treated the purchase as a transaction, while the brand promise was about routine clarity and trust.',
    goals:
      'Clarify product sequencing, encourage routine bundles, and create a smoother path from product discovery to payment.',
    process:
      'I reviewed funnel drop-off, grouped questions from customer support, and tested alternative narrative structures. I then designed a guided routine builder with informative checkpoints and social proof at key moments.',
    solution:
      'The final flow reframed checkout as a routine confirmation journey. Users could review regimen steps, compare bundle savings, and understand what each item contributed before committing.',
    result:
      'The concept direction helped the team align brand storytelling and performance goals. The new checkout also created a reusable framework for future seasonal bundles.',
    lessons_learned:
      'Trust-building in commerce often depends on sequencing information, not simply adding more persuasive elements.',
    created_at: '2026-02-01T09:00:00.000Z',
    updated_at: '2026-03-09T09:00:00.000Z',
    tools: [
      { tool_name: 'Figma', sort_order: 0 },
      { tool_name: 'Google Analytics', sort_order: 1 },
      { tool_name: 'Hotjar', sort_order: 2 },
    ],
    gallery: [
      {
        image_url:
          'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
        caption: 'Guided routine builder interface with clear bundle logic.',
        sort_order: 0,
      },
      {
        image_url:
          'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Checkout reassurance points and calm visual hierarchy.',
        sort_order: 1,
      },
    ],
  },
  {
    id: 'fallback-harbor',
    title: 'Harbor Health Appointment Flow Audit',
    slug: 'harbor-health-appointment-flow-audit',
    category: 'UX Audit',
    short_description:
      'A diagnostic UX audit for a healthcare booking product focused on clarity, trust, and drop-off recovery.',
    overview:
      'Harbor Health wanted a practical audit of its appointment booking flow after seeing high abandonment on mobile. The goal was not a full redesign, but a sharp diagnosis teams could act on quickly.',
    role: 'UX Consultant',
    timeline: '3 weeks',
    status: 'draft',
    featured: false,
    thumbnail_url:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    cover_image_url:
      'https://images.unsplash.com/photo-1580281657527-47e01d3251a1?auto=format&fit=crop&w=1600&q=80',
    problem_statement:
      'Users encountered friction at several points but the team lacked a structured way to prioritize fixes without overhauling the entire flow.',
    goals:
      'Identify the most costly friction points, recommend low-effort fixes, and provide a prioritised roadmap for future redesign work.',
    process:
      'I completed a heuristic review, annotated problem moments in the booking journey, and grouped findings by confidence, severity, and implementation complexity.',
    solution:
      'The output was an action-oriented audit with annotated screens, copy recommendations, accessibility notes, and recovery opportunities for mobile users.',
    result:
      'The product team gained a sharper picture of where confusion accumulated and which changes could improve confidence without rebuilding the booking engine.',
    lessons_learned:
      'Audits work best when they explain not only what is broken, but what teams can ship next week.',
    created_at: '2026-03-10T09:00:00.000Z',
    updated_at: '2026-03-20T09:00:00.000Z',
    tools: [
      { tool_name: 'Figma', sort_order: 0 },
      { tool_name: 'Loom', sort_order: 1 },
      { tool_name: 'Google Sheets', sort_order: 2 },
    ],
    gallery: [
      {
        image_url:
          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Annotated booking screens with friction hotspots.',
        sort_order: 0,
      },
    ],
  },
]

export const defaultPortfolioFormValues: PortfolioFormValues = {
  title: '',
  slug: '',
  category: portfolioCategories[0],
  short_description: '',
  overview: '',
  role: '',
  timeline: '',
  status: 'draft',
  featured: false,
  thumbnail_url: '',
  cover_image_url: '',
  problem_statement: '',
  goals: '',
  process: '',
  solution: '',
  result: '',
  lessons_learned: '',
  tools: [{ name: 'Figma' }],
  gallery: [{ image_url: '', caption: '' }],
}
