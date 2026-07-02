export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function isOverdue(dateStr) {
  if (!dateStr) return false;
  return dateStr < todayStr();
}

export function formatDue(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  const due = new Date(y, m - 1, d);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = Math.round((due - now) / 86400000);
  if (diff < 0) return `${Math.abs(diff)}日超過`;
  if (diff === 0) return '今日まで';
  if (diff === 1) return '明日まで';
  return `${m}/${d}まで`;
}

export const PRIORITY_LABEL = { high: '高', med: '中', low: '低' };
