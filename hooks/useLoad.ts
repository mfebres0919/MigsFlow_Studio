"use client";

import { useEffect, useState } from "react";

// useLoad: "go and get this data, and tell me how it is going".
// Every data screen has four states: loading, error, empty and success. This
// hook hands a component the first two plus the data, so each screen handles
// them the same way. (It is the same idea as useLoad in the Courier Portal.)
//
// A "hook" is a function whose name starts with "use" and that may use
// React's own hooks (useState, useEffect) inside it.

// A "discriminated union": the state is exactly ONE of these three shapes,
// and "status" says which. After checking state.status === "success",
// TypeScript knows state.data exists. Before the check, it will not let you
// touch it. That makes "forgot to handle loading" a visible mistake.
export type LoadState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };

/**
 * @param loader A function that returns a promise of the data. Pass one that
 *   is defined OUTSIDE the component (so it is the same function every time);
 *   a function created inside the component would restart the load on every render.
 */
export function useLoad<T>(loader: () => Promise<T>) {
  // <T> is a placeholder for "whatever type the loader returns".
  const [state, setState] = useState<LoadState<T>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  // An effect runs after the component is on the page, in the browser only.
  // That is where data stored in the browser can be read.
  useEffect(() => {
    let cancelled = false; // set when the component leaves the page mid-load

    loader().then(
      (data) => {
        if (!cancelled) setState({ status: "success", data });
      },
      (error: unknown) => {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : "Something went wrong.";
          setState({ status: "error", message });
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [loader, attempt]); // run again if the loader changes or "Try again" is pressed

  function reload() {
    setState({ status: "loading" });
    setAttempt((count) => count + 1);
  }

  return { state, reload };
}
