import type { ReactNode } from 'react';

import { formatDay, formatDuration, formatMonth } from '~/lib/dates';
import type { Repo } from '~/lib/github.server';
import { certifications, education, experience, honorary, press, profile } from '~/lib/profile';
import { ArrowIcon, ArrowUpRightIcon, BriefcaseIcon, ChevronIcon, ForkIcon, GitHubIcon, GoogleIcon, GraduationIcon, HammerIcon, NewspaperIcon, RepoIcon, StarIcon } from './icons';

const LANGUAGE_COLORS: Record<string, string> = {
  'C++': '#f34b7d',
  HTML: '#e34c26',
  JavaScript: '#f1e05a',
  Lua: '#000080',
  Ruby: '#701516',
  Shell: '#89e051',
  TypeScript: '#3178c6',
  Zig: '#ec915c',
};

export function SectionLabel({ icon, tint, children }: { icon: ReactNode; tint: string; children: ReactNode }) {
  return (
    <h2 className="chip section__label" style={{ ['--chip-tint' as string]: tint }}>
      {icon}
      {children}
    </h2>
  );
}

function Highlights({ items }: { items?: string[] }) {
  if (!items?.length) {
    return null;
  }
  return (
    <ul className="job__highlights">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function Experience() {
  return (
    <section className="section" id="experience">
      <SectionLabel icon={<BriefcaseIcon />} tint="var(--color-accent-green)">
        Experience
      </SectionLabel>
      <ol className="jobs">
        {experience.map((each) => {
          const latest = each.roles[0];
          const first = each.roles[each.roles.length - 1];
          const expandable = each.roles.length > 1 || Boolean(latest.highlights?.length);

          return (
            <li key={each.company}>
              <details className="job">
                <summary className={`job__summary${expandable ? '' : ' job__summary--static'}`} tabIndex={expandable ? undefined : -1}>
                  <img className="tile" src={each.logo} alt="" width={36} height={36} />
                  <span className="job__title">
                    <span className="job__company">{each.company}</span>
                    <span className="job__role">{each.roles.length > 1 ? `${each.roles.length} roles` : latest.title}</span>
                  </span>
                  <span className="job__period">
                    {formatMonth(first.start)} — {formatMonth(latest.end)}
                    <span className="job__duration"> · {formatDuration(first.start, latest.end)}</span>
                  </span>
                  <ChevronIcon className="job__chevron" style={{ visibility: expandable ? undefined : 'hidden' }} />
                </summary>
                {each.roles.length > 1 ? (
                  <ol className="job__roles">
                    {each.roles.map((role) => (
                      <li key={role.title}>
                        <div className="job__roleHead">
                          <span className="job__roleTitle">{role.title}</span>
                          <span className="job__period">
                            {formatMonth(role.start)} — {formatMonth(role.end)}
                            <span className="job__duration"> · {formatDuration(role.start, role.end)}</span>
                          </span>
                        </div>
                        <Highlights items={role.highlights} />
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="job__single">
                    <Highlights items={latest.highlights} />
                  </div>
                )}
              </details>
            </li>
          );
        })}
      </ol>

      <h3 className="jobs__subhead">Honorary work</h3>
      <ul className="jobs">
        {honorary.map((each) => {
          const content = (
            <>
              <img className="tile" src={each.logo} alt="" width={36} height={36} />
              <span className="job__title">
                <span className="job__company">{each.organisation}</span>
                <span className="job__role">{each.title}</span>
              </span>
              {each.href ? <ArrowUpRightIcon className="job__chevron job__link" /> : null}
            </>
          );
          return (
            <li key={each.organisation}>
              {each.href ? (
                <a className="job__summary" href={each.href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div className="job__summary job__summary--static">{content}</div>
              )}
            </li>
          );
        })}
      </ul>

      <h3 className="jobs__subhead">Education</h3>
      <ul className="jobs">
        {education.map((each) => {
          const content = (
            <>
              {each.logo ? (
                <img className="tile" src={each.logo} alt="" width={36} height={36} />
              ) : (
                <span className="tile tile--icon" aria-hidden="true">
                  <GraduationIcon width={18} height={18} />
                </span>
              )}
              <span className="job__title">
                <span className="job__company">{each.school}</span>
                <span className="job__role">
                  {each.program}
                  {each.note ? ` · ${each.note}` : ''}
                </span>
              </span>
              <span className="job__period">
                {each.start} — {each.end}
              </span>
              <span className="job__chevron" aria-hidden="true">
                {each.href ? <ArrowUpRightIcon /> : null}
              </span>
            </>
          );
          return (
            <li key={each.school}>
              {each.href ? (
                <a className="job__summary" href={each.href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div className="job__summary job__summary--static">{content}</div>
              )}
            </li>
          );
        })}
      </ul>

      <h3 className="jobs__subhead">Certifications</h3>
      <ul className="jobs">
        <li>
          <details className="job">
            <summary className="job__summary">
              <span className="tile tile--icon" aria-hidden="true">
                <GoogleIcon width={18} height={18} />
              </span>
              <span className="job__title">
                <span className="job__company">Google Project Management</span>
                <span className="job__role">{certifications.length} courses · Coursera</span>
              </span>
              <span className="job__period">
                {formatMonth(certifications[certifications.length - 1].date)} — {formatMonth(certifications[0].date)}
              </span>
              <ChevronIcon className="job__chevron" />
            </summary>
            <ol className="job__roles">
              {certifications.map((each) => (
                <li key={each.href}>
                  <a className="job__roleHead job__roleHead--link" href={each.href} target="_blank" rel="noreferrer">
                    <span className="job__roleTitle">{each.name}</span>
                    <span className="job__period">{formatMonth(each.date)}</span>
                  </a>
                </li>
              ))}
            </ol>
          </details>
        </li>
      </ul>
    </section>
  );
}

export function Builds({ repos }: { repos: Repo[] }) {
  if (!repos.length) {
    return null;
  }

  const stars = repos.reduce((sum, each) => sum + each.stars, 0);

  return (
    <section className="section" id="builds">
      <SectionLabel icon={<HammerIcon />} tint="var(--color-accent-clay)">
        Builds
      </SectionLabel>
      <div className="builds__head">
        <p>
          <strong>{stars.toLocaleString('en-US')}</strong> stars across {repos.length} repositories
        </p>
        <a className="builds__profile" href={`https://github.com/${profile.handle}`} target="_blank" rel="noreferrer">
          <GitHubIcon width={12} height={12} />
          {profile.handle}
        </a>
      </div>
      <ul className="repos">
        {repos.map((each) => (
          <li key={each.name}>
            <a className="card repo" href={each.href} target="_blank" rel="noreferrer">
              <span className="repo__head">
                <RepoIcon />
                <span className="repo__name">{each.name}</span>
                <span className="repo__badge">Public</span>
              </span>
              {each.description ? <span className="repo__desc">{each.description}</span> : <span className="repo__desc" />}
              <span className="repo__meta">
                {each.language ? (
                  <span>
                    <span className="repo__dot" style={{ background: LANGUAGE_COLORS[each.language] ?? 'var(--color-faint)' }} />
                    {each.language}
                  </span>
                ) : null}
                <span>
                  <StarIcon width={12} height={12} />
                  {each.stars}
                </span>
                <span>
                  <ForkIcon width={12} height={12} />
                  {each.forks}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a className="more" href={`https://github.com/${profile.handle}?tab=repositories`} target="_blank" rel="noreferrer">
        All repositories <ArrowIcon width={12} height={12} />
      </a>
    </section>
  );
}

export function Press() {
  return (
    <section className="section" id="press">
      <SectionLabel icon={<NewspaperIcon />} tint="var(--color-accent-indigo)">
        Press
      </SectionLabel>
      <ul className="press">
        {press.map((each) => (
          <li key={each.href}>
            <a className="press__item" href={each.href} target="_blank" rel="noreferrer">
              <span className="press__text">
                <span className="press__title">{each.title}</span>
                <span className="press__outlet">{each.outlet}</span>
              </span>
              <time className="press__date" dateTime={each.date}>
                {formatDay(each.date)}
              </time>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function WorkWithMe() {
  return (
    <section className="section" id="contact">
      <div className="card cta">
        <img className="cta__avatar" src={profile.avatar} alt="" width={56} height={56} />
        <div className="cta__body">
          <h2 className="cta__title">Work with me</h2>
          <p className="cta__text">Hiring for a role, or have something you want built? Tell me what you have in mind.</p>
        </div>
        <a className="button" href={`mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}`}>
          Send me a note <ArrowUpRightIcon width={12} height={12} />
        </a>
      </div>
    </section>
  );
}
