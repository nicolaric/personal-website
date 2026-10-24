import type { Route } from './+types/home';

import { ContributionGraph } from '~/components/ContributionGraph';
import { Footer } from '~/components/Footer';
import { Hero } from '~/components/Hero';
import { GitHubIcon, GitLabIcon } from '~/components/icons';
import { Builds, Experience, SectionLabel, WorkWithMe } from '~/components/Sections';
import { getContributions, getRepos } from '~/lib/github.server';
import { profile } from '~/lib/profile';

const NAV = [
  { href: '#experience', label: 'Experience' },
  { href: '#builds', label: 'Builds' },
  { href: '#contact', label: 'Contact' },
];

export function meta({}: Route.MetaArgs) {
  const title = `${profile.name} (${profile.handle})`;
  return [
    { title },
    { name: 'description', content: profile.tagline },
    { property: 'og:title', content: title },
    { property: 'og:description', content: profile.tagline },
    { property: 'og:image', content: profile.avatar },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: '@NicolaRic2' },
  ];
}

export function headers() {
  return { 'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400' };
}

export async function loader() {
  const [contributions, repos] = await Promise.all([getContributions(), getRepos()]);
  return { contributions, repos };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { contributions, repos } = loaderData;

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="page">
        <nav className="nav">
          <ul className="nav__links">
            {NAV.map((each) => (
              <li key={each.href}>
                <a className="nav__link" href={each.href}>
                  {each.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="nav__cta" href={`mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}`}>
            Work with me
          </a>
        </nav>

        <main id="main">
          <Hero />

          {Object.keys(contributions.totals).length ? (
            <section className="section">
              <SectionLabel
                icon={
                  <>
                    <GitHubIcon />
                    <GitLabIcon />
                  </>
                }
                tint="var(--color-ink)"
              >
                Contributions
              </SectionLabel>
              <ContributionGraph {...contributions} />
            </section>
          ) : null}

          <Experience />
          <Builds repos={repos} />
          <WorkWithMe />
        </main>
      </div>
      <Footer />
    </>
  );
}
