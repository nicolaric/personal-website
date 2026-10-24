import { useMemo, useState } from 'react';

import type { ContributionDay, Contributions } from '~/lib/github.server';
import { GitHubIcon, GitLabIcon } from './icons';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type Cell = (ContributionDay & { future: boolean }) | null;

// Lays the whole year out as Sunday-first week columns, padding before Jan 1.
function buildYear(year: number, counts: Map<string, ContributionDay>, today: string): Cell[] {
  const start = new Date(Date.UTC(year, 0, 1));
  const cells: Cell[] = Array(start.getUTCDay()).fill(null);
  for (const day = start; day.getUTCFullYear() === year; day.setUTCDate(day.getUTCDate() + 1)) {
    const date = day.toISOString().slice(0, 10);
    const hit = counts.get(date);
    cells.push({ date, count: 0, github: 0, gitlab: 0, level: 0, ...hit, future: date > today });
  }
  return cells;
}

function describe(day: ContributionDay) {
  const summary = `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`;
  return day.github && day.gitlab ? `${summary} (${day.github} GitHub, ${day.gitlab} GitLab)` : summary;
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
        <div>
          <p className="contrib__count">
            <strong>{totals[year].total.toLocaleString('en-US')}</strong> contributions in {year}
          </p>
          <p className="contrib__sources">
            <span>
              <GitHubIcon width={11} height={11} /> {totals[year].github.toLocaleString('en-US')}
            </span>
            {totals[year].gitlab ? (
              <span>
                <GitLabIcon width={11} height={11} /> {totals[year].gitlab.toLocaleString('en-US')}
              </span>
            ) : null}
          </p>
        </div>
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
            cell ? <i key={cell.date} className={`l${cell.future ? 'f' : cell.level}`} title={cell.future ? undefined : describe(cell)} /> : <i key={`pad-${index}`} className="off" />
          )}
        </div>
      </div>
    </div>
  );
}
