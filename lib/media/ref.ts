// How website content points at an uploaded picture.
//
// A picture that came with a template is stored as an ordinary address
// ("/images/templates/…"). A picture the customer uploaded is stored as
// "media:" plus its id, e.g. "media:3f2a…". The id is looked up in the media
// store when the page is drawn.
//
// Why not store the picture itself in the content? Pictures are large. The
// content is saved (and copied on every publish), so it has to stay small.
// In Phase 3 the same idea continues: content will hold the address of a file
// in Supabase Storage.

const PREFIX = "media:";

/** The text to store in content for an uploaded picture. */
export function mediaSrc(id: string): string {
  return `${PREFIX}${id}`;
}

/** The id inside a "media:…" reference, or null if the text is an ordinary address. */
export function mediaIdFrom(src: string): string | null {
  return src.startsWith(PREFIX) ? src.slice(PREFIX.length) : null;
}

/** Every uploaded-picture id mentioned anywhere in some content. */
export function mediaIdsIn(content: unknown): string[] {
  // Content is plain data, so searching its saved-text form is the simplest way to look everywhere.
  const found = JSON.stringify(content ?? null).matchAll(/"media:([^"\\]+)"/g);
  return [...new Set([...found].map((match) => match[1]))];
}

/**
 * A copy of the content with every "media:…" reference swapped for a real,
 * drawable address. Used just before a template draws; the saved content
 * always keeps the references.
 */
export function withMediaResolved<T>(content: T, resolve: (src: string) => string): T {
  if (typeof content === "string") return (mediaIdFrom(content) ? resolve(content) : content) as T;
  if (Array.isArray(content)) return content.map((item) => withMediaResolved(item, resolve)) as T;
  if (typeof content === "object" && content !== null) {
    return Object.fromEntries(Object.entries(content).map(([key, value]) => [key, withMediaResolved(value, resolve)])) as T;
  }
  return content;
}
