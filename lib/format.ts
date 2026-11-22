// Small helpers that turn data into text for the screen.

/** "Dana Whitfield" → "DW". Used for the round avatar when there is no photo. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/** "Dana Whitfield" → "Dana". */
export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
const relativeFormat = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/** "2026-11-22T15:04:00.000Z" → "Nov 22, 2026". */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso));
}

/** How long ago, in plain words: "2 hours ago", "yesterday", "9 days ago". Older than a month shows the date. */
export function formatTimeAgo(iso: string, now: Date = new Date()): string {
  const minutes = Math.round((now.getTime() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return relativeFormat.format(-minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (hours < 24) return relativeFormat.format(-hours, "hour");
  const days = Math.round(hours / 24);
  if (days < 30) return relativeFormat.format(-days, "day");
  return formatDate(iso);
}
