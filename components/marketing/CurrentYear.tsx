"use client";

import { useSyncExternalStore } from "react";

// The year in the footer's copyright line.
//
// Public pages are built ahead of time as plain HTML, and a page built that
// way may not read today's date on the server (the build would bake in
// whatever day it ran). So the built HTML carries the build year, and the
// browser swaps in the real year when the page loads.
const BUILD_YEAR = Number(process.env.NEXT_PUBLIC_BUILD_YEAR);
const subscribe = () => () => {};

export default function CurrentYear() {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(), // in the browser
    () => BUILD_YEAR, // in the built HTML
  );
}
