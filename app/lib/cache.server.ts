import { profile } from './profile';

const CACHE_MS = 60 * 60 * 1000;

const cache = new Map<string, { at: number; value: unknown }>();

export async function cached<T>(key: string, fallback: T, load: () => Promise<T>): Promise<T> {
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

export async function getJson(url: string) {
  const response = await fetch(url, { headers: { 'User-Agent': profile.handle } });
  if (!response.ok) {
    throw new Error(`${url} responded ${response.status}`);
  }
  return response.json();
}
