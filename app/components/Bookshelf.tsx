import { useCallback, useEffect, useRef, useState } from 'react';

import type { Book } from '~/lib/goodreads.server';
import { profile } from '~/lib/profile';
import { ArrowIcon, BookIcon, ChevronIcon } from './icons';
import { SectionLabel } from './Sections';

// Matches the desktop column count in app.css; corrected after mount from the real layout.
const DESKTOP_PER_PAGE = 6;

export function Bookshelf({ books }: { books: Book[] }) {
  const rowRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(Math.ceil(books.length / DESKTOP_PER_PAGE));

  // One page is the visible width plus the gap that follows it.
  const pageWidth = useCallback(() => {
    const row = rowRef.current!;
    return row.clientWidth + parseFloat(getComputedStyle(row).columnGap || '0');
  }, []);

  const measure = useCallback(() => {
    const row = rowRef.current;
    if (!row) {
      return;
    }
    const width = pageWidth();
    setPages(Math.max(1, Math.ceil((row.scrollWidth + width - row.clientWidth) / width)));
    setPage(Math.round(row.scrollLeft / width));
  }, [pageWidth]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const go = (delta: number) => rowRef.current?.scrollBy({ left: delta * pageWidth(), behavior: 'smooth' });

  if (!books.length) {
    return null;
  }

  return (
    <section className="section" id="books">
      <SectionLabel icon={<BookIcon />} tint="var(--color-accent-ochre)">
        Bookshelf
      </SectionLabel>
      <div className="books__head">
        <p>
          <strong>{books.length}</strong> books read
        </p>
        {pages > 1 ? (
          <div className="pager">
            <button type="button" className="pager__button" onClick={() => go(-1)} disabled={page === 0} aria-label="Previous books">
              <ChevronIcon style={{ rotate: '90deg' }} />
            </button>
            <span className="pager__count" aria-live="polite">
              {page + 1} / {pages}
            </span>
            <button type="button" className="pager__button" onClick={() => go(1)} disabled={page >= pages - 1} aria-label="Next books">
              <ChevronIcon style={{ rotate: '-90deg' }} />
            </button>
          </div>
        ) : null}
      </div>
      <ul className="books" ref={rowRef} onScroll={measure}>
        {books.map((each) => (
          <li key={each.id}>
            <a className="book" href={each.href} target="_blank" rel="noreferrer" title={`${each.title} by ${each.author}`}>
              {each.cover ? (
                <img className="book__cover" src={each.cover} alt="" loading="lazy" decoding="async" />
              ) : (
                <span className="book__cover book__cover--blank" aria-hidden="true">
                  {each.title}
                </span>
              )}
              <span className="book__title">{each.title}</span>
              <span className="book__author">{each.author}</span>
              {each.rating ? (
                <span className="book__rating" aria-label={`Rated ${each.rating} out of 5`}>
                  {'★'.repeat(each.rating)}
                  <span className="book__rating--empty">{'★'.repeat(5 - each.rating)}</span>
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
      <a className="more" href={`https://www.goodreads.com/review/list/${profile.goodreadsId}?shelf=read`} target="_blank" rel="noreferrer">
        All books on Goodreads <ArrowIcon width={12} height={12} />
      </a>
    </section>
  );
}
