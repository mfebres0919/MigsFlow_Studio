"use client";

import { useCallback, useEffect, useState } from "react";
import { getMediaBlob } from "@/lib/data/media";
import { mediaIdFrom } from "@/lib/media/ref";

// Turns "media:…" references into addresses an <img> can show.
//
// An uploaded picture lives in the browser's database as raw data. To show
// it, the browser is asked for a temporary address for that data (an "object
// URL", which looks like "blob:http://…"). This hook does that for a list of
// picture ids and hands back a function that swaps a reference for its address.

// Addresses already made, kept for the life of the page so each picture is read only once.
const urls = new Map<string, string>();
// Every component currently using the hook. When a picture finishes loading,
// all of them are told to redraw.
const listeners = new Set<() => void>();

function load(id: string) {
  urls.set(id, ""); // marks it as "being loaded" so it is not requested twice
  getMediaBlob(id).then(
    (blob) => {
      if (blob) urls.set(id, URL.createObjectURL(blob));
      else urls.delete(id); // not there (yet): allow another try later
      listeners.forEach((redraw) => redraw());
    },
    () => urls.delete(id),
  );
}

/**
 * @param ids The uploaded pictures that may need showing.
 * @returns resolve(src): the drawable address for a "media:…" reference
 *   ("" until it has loaded), or the src unchanged if it is an ordinary address.
 */
export function useMediaUrls(ids: string[]): (src: string) => string {
  // Changing this number makes components using the hook redraw once a picture is ready.
  const [, setLoaded] = useState(0);
  const wanted = ids.join(","); // a plain text version, so the effect only re-runs when the list really changes

  useEffect(() => {
    const redraw = () => setLoaded((count) => count + 1);
    listeners.add(redraw);
    return () => {
      listeners.delete(redraw);
    };
  }, []);

  useEffect(() => {
    for (const id of wanted ? wanted.split(",") : []) {
      if (!urls.has(id)) load(id);
    }
  }, [wanted]);

  return useCallback((src: string) => {
    const id = mediaIdFrom(src);
    return id ? (urls.get(id) ?? "") : src;
  }, []);
}
