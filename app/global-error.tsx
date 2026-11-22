"use client"; // error screens must be Client Components

// The last-resort screen, shown if the app itself crashes so badly that not
// even the normal layout can be drawn. It replaces the whole page, so it has
// its own <html> and <body>, and uses a few plain styles because the app's
// stylesheet may not have loaded.

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body className="grid min-h-dvh place-items-center bg-white px-4 text-center font-sans text-slate-900">
        <main>
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-3 text-slate-700">MigsFlow Studio hit a problem it could not recover from. Your saved drafts are safe.</p>
          {/* reset() asks Next.js to try drawing the page again. */}
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-blue-700 px-5 font-medium text-white"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
