export function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

export function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString();
}
