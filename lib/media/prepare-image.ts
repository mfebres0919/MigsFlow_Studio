// Gets a picture ready to store: checks it really is a picture, and shrinks
// it if it is larger than a website needs. A phone photo can be 4000 pixels
// wide and 6 MB; a website never shows more than about 2000 pixels, and a
// smaller file loads faster for visitors.
//
// Runs in the browser only (it uses <canvas> to resize).

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

  // Animated GIFs would lose their animation if redrawn, and small pictures need no work.
  if (file.type === "image/gif" || (scale === 1 && file.size <= KEEP_AS_IS_BYTES)) {
    bitmap.close();
    return { blob: file, type: file.type, width, height };
  }

  // Draw the picture onto a smaller canvas, then save the canvas as a new file.
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  // PNG is kept as PNG so a logo keeps its see-through background. Photos become JPEG.
  const type = file.type === "image/png" ? "image/png" : "image/jpeg";
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.85));
  if (!blob) throw new Error("That picture could not be prepared. Try another one.");

  return { blob, type, width: canvas.width, height: canvas.height };
}
