// All personal content for the site lives here.

export const profile = {
  name: 'Nicola Richli',
  handle: 'nicolaric',
  partOfSpeech: 'noun',
  tagline: 'Software engineer who builds frontends people enjoy using. Terminal-first, keyboard-driven, lifts weights in between deploys.',
  email: 'nicola@akenza.io',
  avatar: 'https://avatars.githubusercontent.com/u/64309148?v=4',
  siteUrl: 'https://github.com/nicolaric',
};

export type SocialKind = 'github' | 'x' | 'linkedin' | 'email';

export const socials: { kind: SocialKind; label: string; href: string }[] = [
  { kind: 'github', label: 'GitHub', href: 'https://github.com/nicolaric' },
  { kind: 'x', label: 'X', href: 'https://x.com/NicolaRic2' },
  { kind: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/nicola-richli' },
  { kind: 'email', label: 'Email', href: `mailto:${profile.email}` },
];

export type Role = {
  title: string;
  // 'YYYY-MM'; omit `end` for a current role.
  start: string;
  end?: string;
  // Shown when the row is expanded.
  highlights?: string[];
};

export type Job = {
  company: string;
  href: string;
  // Square logo in /public/logos, taken from each company's own site.
  logo: string;
  location?: string;
  // Most recent role first.
  roles: Role[];
};

// Titles and dates from LinkedIn, highlights from the CV.
export const experience: Job[] = [
  {
    company: 'yeos',
    href: 'https://yeos.ai',
    logo: '/logos/yeos.png',
    roles: [
      {
        title: 'Co-founder',
        start: '2026-08',
        highlights: ['AI knowledge platform for Swiss SMEs: answers grounded in your own documents, hosted in Switzerland.'],
      },
    ],
  },
  {
    company: 'akenza',
    href: 'https://akenza.io',
    logo: '/logos/akenza.svg',
    location: 'Zurich',
    roles: [
      {
        title: 'Frontend Engineer',
        start: '2024-02',
        highlights: [
          'Brought in industry-standard monorepo tooling for future scalability.',
          'Working across multiple projects: AI assistant, core application and dashboards (Angular, TypeScript, Nx, Tailwind, Jest).',
          'Focused on constantly improving the pace of innovation and quality.',
        ],
      },
    ],
  },
  {
    company: 'Nexxiot',
    href: 'https://nexxiot.com',
    logo: '/logos/nexxiot.svg',
    location: 'Zurich',
    roles: [
      {
        title: 'Product Owner',
        start: '2023-03',
        end: '2024-02',
        highlights: [
          'Multiple wins: customer app, e-commerce product, API migration.',
          'Cross-functional collaboration; managed designs and execution.',
          'Set standards, prioritized, and ensured seamless execution in a very agile team.',
        ],
      },
      { title: 'Junior Product Owner', start: '2022-10', end: '2023-03' },
      {
        title: 'Frontend Developer',
        start: '2020-05',
        end: '2022-10',
        highlights: ['Migrated the application from AngularJS to Angular.', 'Developed the platform for visualizing data coming from IoT devices.', 'Drove proactive product improvements.'],
      },
    ],
  },
  {
    company: 'Roche',
    href: 'https://roche.com',
    logo: '/logos/roche.png',
    location: 'Kaiseraugst',
    roles: [
      {
        title: 'IT Specialist',
        start: '2019-07',
        end: '2020-05',
        highlights: ['Streamlined efficiency via a Jenkins CI/CD pipeline.', 'Built a frontend app with Angular across the full DevOps lifecycle.', 'Worked within the processes of a large corporate company.'],
      },
      {
        title: 'Apprentice, Business IT',
        start: '2015-08',
        end: '2019-07',
        highlights: ['Developed frontend apps using Angular and jQuery.', 'Managed the apprenticeship program.', 'Automated VMware ESXi cluster installations.', 'Graduated with a final grade of 5.5/6.'],
      },
    ],
  },
];

// Cycled one at a time under the intro.
export const interests: { emoji: string; verb: string; subject: string }[] = [
  { emoji: '🏋️', verb: 'Lifting', subject: 'heavy things, consistently' },
  { emoji: '⚡', verb: 'Writing', subject: 'Zig for fun' },
  { emoji: '⌨️', verb: 'Tuning', subject: 'a split keyboard running ZMK' },
  { emoji: '📟', verb: 'Reading', subject: 'teletext from the terminal' },
  { emoji: '🛠️', verb: 'Tweaking', subject: 'Neovim and tmux configs' },
  { emoji: '🚀', verb: 'Betting', subject: 'on acceleration' },
];

// Repos shown under "Builds", in this order. Stars, forks and language are fetched live.
export const featuredRepos = ['rahmenabkommen-gpt', 'minicode', 'teletext-cli', 'auto-translate-cli', 'alarm', 'nvim-config'];
