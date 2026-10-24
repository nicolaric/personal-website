const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

export function formatMonth(value?: string) {
  if (!value) {
    return 'Present';
  }
  const [year, month] = value.split('-').map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

// Inclusive of both months, matching how LinkedIn counts ("Feb 2024 - Oct 2026 · 2 yrs 9 mos").
export function formatDuration(start: string, end?: string) {
  const [startYear, startMonth] = start.split('-').map(Number);
  const [endYear, endMonth] = (end ?? currentMonth()).split('-').map(Number);
  const total = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [years ? `${years} yr${years === 1 ? '' : 's'}` : '', months ? `${months} mo${months === 1 ? '' : 's'}` : ''].filter(Boolean).join(' ');
}
