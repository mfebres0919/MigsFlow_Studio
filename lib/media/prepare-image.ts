// Gets a picture ready to store: checks it really is a picture, shrinks it
// if it is larger than a website needs, and saves it as WebP (Miguelle,
// 2026-11-23). A phone photo can be 4000 pixels wide and 6 MB; a website
// never shows more than about 2000 pixels, and WebP is usually 25 to 35%
// smaller than the same photo as JPEG, so visitors' pages load faster.
//
// It is ONE careful step, not "compress, convert, compress again": every
// round of lossy saving throws away a little more detail, so saving twice
// only makes the picture worse without making it much smaller.
//
// Runs in the browser only (it uses <canvas> to resize and convert). Doing
// it here, before upload, also means the customer sends less over their
// connection. In Phase 3 the server can check the result again.

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB: larger than any normal photo
const MAX_SIDE = 2000; // the longest side, in pixels, after shrinking
const KEEP_AS_IS_BYTES = 1.5 * 1024 * 1024; // small enough already: store the original untouched

export type PreparedImage = {
  blob: Blob; // "blob" = a file's raw contents held in memory
  type: string;
  width: number;
  height: number;
};

export async function prepareImage(file: File): Promise<PreparedImage> {
  if (!ALLOWED.includes(file.type)) {
    throw new Error("That file cannot be used as a picture. Choose a JPG, PNG, WebP or GIF.");
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error("That picture is larger than 25 MB. Choose a smaller one.");
  }

  // Decoding proves the file is a real, readable picture and tells us its size.
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("That picture could not be read. It may be damaged. Try another one.");
  }

  const { width, height } = bitmap;
  const scale = Math.min(1, MAX_SIDE / Math.max(width, height));

  // Animated GIFs would lose their animation if redrawn: stored as they are.
  // A WebP that is already small and web-sized needs no work either.
  if (file.type === "image/gif" || (file.type === "image/webp" && scale === 1 && file.size <= KEEP_AS_IS_BYTES)) {
    bitmap.close();
    return { blob: file, type: file.type, width, height };
  }

  // Draw the picture onto a canvas at web size, then save the canvas as a new file.
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  // WebP keeps see-through backgrounds, so logos (PNG) convert too, at a
  // higher quality so their sharp edges stay crisp.
  const quality = file.type === "image/png" ? 0.9 : 0.82;
  let blob = await saveCanvas(canvas, "image/webp", quality);

  // A few browsers (older Safari) cannot save WebP and quietly hand back a
  // PNG instead. Then photos are saved as JPEG and PNGs stay PNG.
  if (!blob || blob.type !== "image/webp") {
    const fallback = file.type === "image/png" ? "image/png" : "image/jpeg";
    blob = await saveCanvas(canvas, fallback, 0.85);
  }
  if (!blob) throw new Error("That picture could not be prepared. Try another one.");

  // Never store something bigger than what the customer gave us, when theirs was already web-sized.
  if (scale === 1 && blob.size >= file.size) return { blob: file, type: file.type, width, height };

  return { blob, type: blob.type, width: canvas.width, height: canvas.height };
}

function saveCanvas(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

/** "Team photo.JPG" saved as WebP → "Team photo.webp", so the Media Library shows the real kind of file. */
export function fileNameFor(name: string, type: string): string {
  const extension = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png", "image/gif": "gif" }[type];
  if (!extension) return name;
  const base = name.replace(/\.[a-z0-9]+$/i, "");
  return `${base}.${extension}`;
}
