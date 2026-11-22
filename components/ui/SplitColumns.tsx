// The standard two-column layout: a wide main column and a narrower side column.
//
// Project rule (Miguelle, 2026-11-22): when one column is shorter than the
// other, it must not scroll away and leave an empty gap beside the longer
// one. The shorter column stays in view while the longer one scrolls past.
// Use this component for every side-by-side layout so that happens everywhere.
//
// How: both columns are "sticky". A sticky element scrolls normally until it
// reaches the top of the screen, then stays there for as long as its row
// lasts. The longer column fills the whole row, so it has nowhere to stick
// and simply scrolls; the shorter one has spare room, so it holds still.
// Whichever column is shorter gets the behavior, with no extra code.
//
// On phones and tablets the columns stack, and nothing is sticky.

type SplitColumnsProps = {
  main: React.ReactNode;
  side: React.ReactNode;
};

export default function SplitColumns({ main, side }: SplitColumnsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      {/* self-start stops a column stretching to the row's full height, which would leave it no room to stick. */}
      <div className="grid gap-6 lg:sticky lg:top-10 lg:self-start">{main}</div>
      <div className="grid gap-6 lg:sticky lg:top-10 lg:self-start">{side}</div>
    </div>
  );
}
