import gitlab from '~/data/gitlab-contributions.json';

import { featuredRepos, profile } from './profile';

const CACHE_MS = 60 * 60 * 1000;

export type ContributionDay = { date: string; count: number; github: number; gitlab: number; level: number };

export type YearTotal = { total: number; github: number; gitlab: number };

export type Contributions = {
  totals: Record<string, YearTotal>;
  days: ContributionDay[];
};

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  href: string;
};

const cache = new Map<string, { at: number; value: unknown }>();

async function cached<T>(key: string, fallback: T, load: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) {
    return hit.value as T;
  }
  try {
    const value = await load();
    cache.set(key, { at: Date.now(), value });
    return value;
  } catch {
    // Serve stale data if we have it, otherwise render the page without this section.
    return (hit?.value as T) ?? fallback;
  }
}

async function getJson(url: string) {
  const response = await fetch(url, { headers: { 'User-Agent': profile.handle } });
  if (!response.ok) {
    throw new Error(`${url} responded ${response.status}`);
  }
  return response.json();
}

function getGitHubDays(): Promise<{ date: string; count: number }[]> {
  return cached('github-contributions', [], async () => {
    // GitHub's own contribution calendar needs an auth token; this public mirror doesn't.
    const json = await getJson(`https://github-contributions-api.jogruber.de/v4/${profile.handle}`);
    return json.contributions ?? [];
  });
}

// Quartiles of a year's non-zero days, so levels stay comparable to GitHub's own chart.
function levelsFor(counts: number[]): (count: number) => number {
  const sorted = counts.filter((count) => count > 0).sort((a, b) => a - b);
  const at = (q: number) => sorted[Math.floor(q * (sorted.length - 1))] ?? 0;
  const [q1, q2, q3] = [at(0.25), at(0.5), at(0.75)];
  return (count) => (count === 0 ? 0 : count <= q1 ? 1 : count <= q2 ? 2 : count <= q3 ? 3 : 4);
}

// GitHub is fetched live; GitLab comes from a hand-exported snapshot in app/data.
export async function getContributions(): Promise<Contributions> {
  const byDate = new Map<string, ContributionDay>();
  const day = (date: string) => byDate.get(date) ?? byDate.set(date, { date, count: 0, github: 0, gitlab: 0, level: 0 }).get(date)!;

  for (const each of await getGitHubDays()) {
    day(each.date).github = each.count;
  }
  for (const [date, count] of Object.entries(gitlab.days as Record<string, number>)) {
    day(date).gitlab = count;
  }

  const days = [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
  const totals: Record<string, YearTotal> = {};
  for (const each of days) {
    each.count = each.github + each.gitlab;
    const year = (totals[each.date.slice(0, 4)] ??= { total: 0, github: 0, gitlab: 0 });
    year.total += each.count;
    year.github += each.github;
    year.gitlab += each.gitlab;
  }

  for (const year of Object.keys(totals)) {
    const yearDays = days.filter((each) => each.date.startsWith(year));
    const level = levelsFor(yearDays.map((each) => each.count));
    yearDays.forEach((each) => (each.level = level(each.count)));
  }

  return { totals, days };
}

export function getRepos(): Promise<Repo[]> {
  return cached('repos', [], async () => {
    const json: any[] = await getJson(`https://api.github.com/users/${profile.handle}/repos?per_page=100`);
    const byName = new Map(json.map((each) => [each.name, each]));
    return featuredRepos
      .filter((name) => byName.has(name))
      .map((name) => {
        const each = byName.get(name);
        return {
          name: each.name,
          description: each.description,
          language: each.language,
          stars: each.stargazers_count,
          forks: each.forks_count,
          href: each.html_url,
        };
      });
  });
}
