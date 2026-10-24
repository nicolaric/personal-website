import { useMemo, useState } from 'react';

import type { Contributions } from '~/lib/github.server';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type Cell = { date: string; count: number; level: number; future: boolean } | null;

// Lays the whole year out as Sunday-first week columns, padding before Jan 1.
function buildYear(year: number, counts: Map<string, { count: number; level: number }>, today: string): Cell[] {
  const start = new Date(Date.UTC(year, 0, 1));
  const cells: Cell[] = Array(start.getUTCDay()).fill(null);
  for (const day = start; day.getUTCFullYear() === year; day.setUTCDate(day.getUTCDate() + 1)) {
    const date = day.toISOString().slice(0, 10);
    const hit = counts.get(date);
    cells.push({ date, count: hit?.count ?? 0, level: hit?.level ?? 0, future: date > today });
  }
  return cells;
}

export function ContributionGraph({ totals, days }: Contributions) {
  const years = Object.keys(totals).sort((a, b) => Number(b) - Number(a));
  const [year, setYear] = useState(years[0]);

  const counts = useMemo(() => new Map(days.map((each) => [each.date, each])), [days]);
  const today = new Date().toISOString().slice(0, 10);
  const cells = useMemo(() => (year ? buildYear(Number(year), counts, today) : []), [year, counts, today]);

  if (!year) {
    return null;
  }

  // Month label sits above the week column that contains the 1st of that month.
  const months = MONTHS.map((label, month) => {
    const index = cells.findIndex((cell) => cell?.date.slice(5, 10) === `${String(month + 1).padStart(2, '0')}-01`);
    return { label, column: Math.floor(index / 7) + 1 };
  });

  return (
    <div className="card contrib">
      <div className="contrib__head">
        <p className="contrib__count">
          <strong>{totals[year].toLocaleString('en-US')}</strong> contributions in {year}
        </p>
        <div className="contrib__years" role="tablist" aria-label="Year">
          {years.map((each) => (
            <button key={each} type="button" role="tab" aria-selected={each === year} className="contrib__year" onClick={() => setYear(each)}>
              {each}
            </button>
          ))}
        </div>
      </div>
      <div className="contrib__scroll">
        <div className="contrib__months" aria-hidden="true">
          {months.map((each) => (
            <span key={each.label} style={{ gridColumn: each.column }}>
              {each.label}
            </span>
          ))}
        </div>
        <div className="contrib__grid">
          {cells.map((cell, index) =>
            cell ? <i key={cell.date} className={`l${cell.future ? 'f' : cell.level}`} title={cell.future ? undefined : `${cell.count} contribution${cell.count === 1 ? '' : 's'} on ${cell.date}`} /> : <i key={`pad-${index}`} className="off" />
          )}
        </div>
      </div>
    </div>
  );
}
