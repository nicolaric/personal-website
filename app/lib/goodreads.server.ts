import { cached } from './cache.server';
import { profile } from './profile';

export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string | null;
  rating: number;
  href: string;
};

function field(item: string, tag: string) {
  const match = item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return decodeEntities(match?.[1].trim() ?? '');
}

function decodeEntities(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// Goodreads retired its API in 2020, but every public shelf still has an RSS feed. Newest first.
export function getBooks(): Promise<Book[]> {
  return cached('goodreads', [], async () => {
    const response = await fetch(`https://www.goodreads.com/review/list_rss/${profile.goodreadsId}?shelf=read`, { headers: { 'User-Agent': profile.handle } });
    if (!response.ok) {
      throw new Error(`Goodreads responded ${response.status}`);
    }
    const xml = await response.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
      const id = field(item, 'book_id');
      const cover = field(item, 'book_large_image_url');
      return {
        id,
        // Drop subtitles: "The Psychology of Money: Timeless Lessons…" → "The Psychology of Money".
        title: field(item, 'title').split(/:\s/)[0],
        author: field(item, 'author_name'),
        cover: cover && !cover.includes('/nophoto/') ? cover : null,
        rating: Number(field(item, 'user_rating')) || 0,
        href: `https://www.goodreads.com/book/show/${id}`,
      };
    });
  });
}
