// All personal content for the site lives here.

export const profile = {
  name: 'Nicola Richli',
  handle: 'nicolaric',
  partOfSpeech: 'noun',
  tagline: 'Software engineer who builds frontends people enjoy using. Terminal-first, keyboard-driven, lifts weights in between deploys.',
  email: 'nicola@akenza.io',
  avatar: 'https://avatars.githubusercontent.com/u/64309148?v=4',
  siteUrl: 'https://github.com/nicolaric',
  goodreadsId: '174138101',
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
        end: '2026-10',
        // From the akenza-ui git history, Oct 2026: 2,094 commits, 47% of surviving lines by git blame.
        highlights: [
          'Primary frontend engineer: wrote 47% of the current codebase across four Angular apps in a repository dating back to 2019.',
          'Built the frontend of Genio, the AI assistant, from scratch, then embedded it as AI-driven workspace health analysis.',
          'Led platform-wide migrations end to end: Nx monorepo, Tailwind v4, Keycloak auth, Transloco i18n, Angular 18 to 21, each finished with a CI guard.',
          'Designed the white-labeling and dark-mode theming system used by enterprise and on-prem customers.',
          'Shipped Setup Assistant, Audit Logs, Workspace Health, a new dashboards chart engine and a shared authorization layer.',
          'Set up E2E testing, error monitoring and AI-assisted development workflows for the team.',
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

export const honorary: { organisation: string; href?: string; logo: string; title: string }[] = [
  {
    organisation: 'FDP Bezirk Laufenburg',
    href: 'https://www.fdp-bezirk-laufenburg.ch',
    logo: '/logos/fdp.svg',
    title: 'President',
  },
  {
    organisation: 'Stützpunktfeuerwehr Frick',
    // TODO(nicola): add the brigade's website and swap in its logo.
    logo: '/logos/feuerwehr.svg',
    title: 'Firefighter',
  },
];

// Source: LinkedIn and the CV. Years only.
export const education: { school: string; program: string; start: number; end: number; note?: string; href?: string; logo?: string }[] = [
  {
    school: 'Unternehmer Campus',
    program: 'Young Leader programme · Gewerbeverband Basel-Stadt',
    start: 2020,
    end: 2021,
    href: 'https://gewerbe-basel.ch',
    logo: '/logos/gvbs.svg',
  },
  {
    school: 'GIB Muttenz',
    program: 'Vocational school, IT apprenticeship',
    start: 2015,
    end: 2019,
    note: 'Graduated with 5.5 / 6',
    // Now part of BBZ BL.
    href: 'https://www.bbzbl.ch',
  },
  { school: 'Bezirksschule Rheinfelden', program: 'Secondary school', start: 2011, end: 2015 },
];

// Courses from Google's Project Management certificate on Coursera, newest first.
export const certifications: { name: string; issuer: string; date: string; href: string }[] = [
  { name: 'Agile Project Management', issuer: 'Google', date: '2022-12', href: 'https://www.coursera.org/verify/WLJALZ4LF67G' },
  { name: 'Project Execution: Running the Project', issuer: 'Google', date: '2022-01', href: 'https://www.coursera.org/verify/LM6URJYAV4VK' },
  { name: 'Project Planning: Putting It All Together', issuer: 'Google', date: '2021-08', href: 'https://www.coursera.org/verify/AYYXNW25Y3HG' },
  { name: 'Project Initiation: Starting a Successful Project', issuer: 'Google', date: '2021-07', href: 'https://www.coursera.org/verify/UWDCY5AEM4UZ' },
  { name: 'Foundations of Project Management', issuer: 'Google', date: '2021-07', href: 'https://www.coursera.org/verify/SXXCPF3MW62P' },
];

// Newest first. Dates are publication dates in Swiss time.
export const press: { outlet: string; title: string; date: string; href: string }[] = [
  {
    outlet: 'Aargauer Zeitung',
    title: 'Dieser Jungpolitiker erstellt ein KI-Tool zum Rahmenabkommen mit der EU',
    date: '2025-09-01',
    href: 'https://www.aargauerzeitung.ch/aargau/fricktal/gipf-oberfrick-ich-haette-nicht-damit-gerechnet-dieser-jungpolitiker-erstellt-tool-mit-kuenstlicher-intelligenz-zum-rahmenabkommen-mit-eu-ld.2809485',
  },
  {
    outlet: 'Heute',
    title: '1.900 Seiten erklärt: Mann baut KI-Tool für EU-Abkommen',
    date: '2025-08-15',
    href: 'https://www.heute.at/s/1900-seiten-erklaert-mann-baut-ki-tool-fuer-eu-abkommen-120124990',
  },
  {
    outlet: '20 Minuten',
    title: "Von 1'900 Seiten zu präzisen Antworten: Aargauer entwickelt KI-Tool für EU-Abkommen",
    date: '2025-08-12',
    href: 'https://www.20min.ch/story/keine-lust-zum-lesen-1900-seiten-schnell-erfassen-aargauer-baut-ki-fuer-eu-abkommen-103396486',
  },
  {
    outlet: 'Neue Fricktaler Zeitung',
    title: 'Auf Tüscher folgt Richli',
    date: '2025-03-25',
    href: 'https://www.nfz.ch/auf-tuescher-folgt-richli',
  },
  {
    outlet: 'Fricktal.info',
    title: 'FDP Bezirk Laufenburg mit neuem Präsidenten',
    date: '2025-03-23',
    href: 'https://fricktal.info/laufenburg/fdp-bezirk-laufenburg-mit-neuem-praesidenten.html',
  },
  {
    outlet: 'Aargauer Zeitung',
    title: 'Nicola Richli (FDP) im Porträt: Grossratswahlen Aargau 2024',
    date: '2024-09-17',
    href: 'https://www.aargauerzeitung.ch/aargau/kanton-aargau/portrait-nicola-richli-aargau-grossratswahlen-2024-ld.2671976',
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
