import type { MediaItem } from "@/lib/types";
import { fileNameFor, prepareImage } from "@/lib/media/prepare-image";

// The doorway for uploaded pictures (see lib/data/README.md).
//
// Phase 1: pictures are kept in this browser, in IndexedDB. That is a small
// database built into every browser. It is used here instead of localStorage
// (where the rest of the demo data lives) because localStorage holds only
// about 5 MB of text, and one photo can be most of that.
// Phase 3: these functions upload to Supabase Storage instead, and the rest
// of the app does not change.

const DATABASE = "migsflow-studio-media";
const STORE = "images";

// What is kept for each picture: its details plus the picture's raw bytes.
// The bytes are stored as an ArrayBuffer rather than as a Blob (a file-like
// object), because Safari refuses to store Blobs in private windows.
// "blob" is only there to read pictures saved by an earlier version.
type StoredImage = MediaItem & { data?: ArrayBuffer; blob?: Blob };

// IndexedDB's own functions report back through events. These two helpers
// wrap them in promises so the rest of the file can use "await".
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE, 1);
    // Runs once, the first time, to create the place the pictures are kept.
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("This browser would not open its picture storage."));
  });
}

async function run<T>(mode: IDBTransactionMode, work: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE, mode);
    const request = work(transaction.objectStore(STORE));
    const fail = () =>
      reject(new Error("The picture could not be stored. Your browser's storage may be full or switched off."));
    // Wait for "complete", not just the request's own success: only then is a
    // saved picture certain to be readable by the preview, which is a separate page.
    transaction.oncomplete = () => resolve(request.result);
    transaction.onerror = fail;
    transaction.onabort = fail;
  });
}

/** Checks, shrinks and stores a picture the customer chose. Returns its details. */
export async function uploadImage(file: File): Promise<MediaItem> {
  const prepared = await prepareImage(file);
  const item: MediaItem = {
    id: crypto.randomUUID(),
    name: fileNameFor(file.name, prepared.type),
    type: prepared.type,
    width: prepared.width,
    height: prepared.height,
    size: prepared.blob.size,
    createdAt: new Date().toISOString(),
  };
  const data = await prepared.blob.arrayBuffer();
  await run("readwrite", (store) => store.put({ ...item, data } satisfies StoredImage));
  return item;
}

/** Every picture the customer has uploaded, newest first (without the picture data itself). */
export async function listMedia(): Promise<MediaItem[]> {
  const stored = await run<StoredImage[]>("readonly", (store) => store.getAll());
  return stored
    .map((image) => {
      const item: MediaItem = {
        id: image.id,
        name: image.name,
        type: image.type,
        width: image.width,
        height: image.height,
        size: image.size,
        createdAt: image.createdAt,
      };
      return item;
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** The picture data for one upload, or null if it no longer exists. */
export async function getMediaBlob(id: string): Promise<Blob | null> {
  const stored = await run<StoredImage | undefined>("readonly", (store) => store.get(id));
  if (!stored) return null;
  // Turn the stored bytes back into a picture the browser can show.
  return stored.data ? new Blob([stored.data], { type: stored.type }) : (stored.blob ?? null);
}

/** Deletes an uploaded picture for good. Anywhere it was used will show an empty space. */
export async function deleteMedia(id: string): Promise<void> {
  await run("readwrite", (store) => store.delete(id));
}

/**
 * Swaps an uploaded picture for a new file while keeping its id, so every
 * website that uses the old picture shows the new one, with nothing to re-pick.
 */
export async function replaceImage(id: string, file: File): Promise<MediaItem> {
  const prepared = await prepareImage(file);
  const item: MediaItem = {
    id,
    name: fileNameFor(file.name, prepared.type),
    type: prepared.type,
    width: prepared.width,
    height: prepared.height,
    size: prepared.blob.size,
    createdAt: new Date().toISOString(),
  };
  const data = await prepared.blob.arrayBuffer();
  await run("readwrite", (store) => store.put({ ...item, data } satisfies StoredImage));
  return item;
}
