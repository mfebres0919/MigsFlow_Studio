"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";

// The thin bar between the editing panel and the preview. Drag it sideways
// to make the panel wider or thinner. It also works from the keyboard: focus
// it and press the left or right arrow.

type PanelResizerProps = {
  width: number;
  min: number;
  max: number;
  onChange: (width: number) => void;
};

export default function PanelResizer({ width, min, max, onChange }: PanelResizerProps) {
  // Where the drag started. A ref, not state: it changes without anything needing to redraw.
  const drag = useRef<{ startX: number; startWidth: number } | null>(null);
  const clamp = (value: number) => Math.min(max, Math.max(min, Math.round(value)));

  function start(event: PointerEvent<HTMLDivElement>) {
    drag.current = { startX: event.clientX, startWidth: width };
    // "Capture" keeps the drag coming to this bar even while the pointer is
    // over the preview, which is a separate page and would otherwise swallow it.
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    onChange(clamp(drag.current.startWidth + event.clientX - drag.current.startX));
  }

  function stop() {
    drag.current = null;
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 64 : 16;
    if (event.key === "ArrowLeft") onChange(clamp(width - step));
    else if (event.key === "ArrowRight") onChange(clamp(width + step));
    else if (event.key === "Home") onChange(min);
    else if (event.key === "End") onChange(max);
    else return;
    event.preventDefault();
  }

  return (
    // role="separator" with these aria values is how a resizable divider is
    // described to screen readers. tabIndex makes it reachable with Tab.
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize the editing panel"
      aria-valuenow={width}
      aria-valuemin={min}
      aria-valuemax={max}
      tabIndex={0}
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={stop}
      onPointerCancel={stop}
      onKeyDown={handleKey}
      // touch-none stops a finger drag on the bar from scrolling the page instead.
      className="group relative hidden w-2 shrink-0 cursor-col-resize touch-none bg-line hover:bg-signal focus-visible:bg-signal lg:block"
    >
      {/* A small grip so the bar reads as something to drag. */}
      <span aria-hidden="true" className="absolute top-1/2 left-1/2 h-10 w-1 -translate-1/2 rounded-full bg-fg-muted group-hover:bg-white group-focus-visible:bg-white" />
    </div>
  );
}
