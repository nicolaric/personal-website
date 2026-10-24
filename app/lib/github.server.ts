import { featuredRepos, profile } from './profile';

const CACHE_MS = 60 * 60 * 1000;

export type ContributionDay = { date: string; count: number; level: number };

export type Contributions = {
  totals: Record<string, number>;
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

export function getContributions(): Promise<Contributions> {
  return cached('contributions', { totals: {}, days: [] }, async () => {
    // GitHub's own contribution calendar needs an auth token; this public mirror doesn't.
    const json = await getJson(`https://github-contributions-api.jogruber.de/v4/${profile.handle}`);
    return { totals: json.total ?? {}, days: json.contributions ?? [] };
  });
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
