// Keeping the typing cursor (the "caret") in place while someone types on
// the preview.
//
// The problem: every keystroke travels to the editor and comes back as new
// content, and React then rewrites the text on screen. Rewriting text throws
// the cursor back to the start of the line. So just before the new content is
// drawn we note where the cursor was and what the text said, and just after,
// we put both back.
//
// These run inside the preview page only. There is one cursor per page, so a
// single module-level note is enough.

type Snapshot = { element: HTMLElement; text: string; offset: number; at: number };

// Taken just before new content is drawn.
let note: Snapshot | null = null;
// Taken at every keystroke. A fast typist can press another key in the
// instant between "new content arrived" and "new content drawn"; this is how
// that keystroke is not lost.
let typed: Snapshot | null = null;

function snapshot(element: HTMLElement): Snapshot {
  return { element, text: element.textContent ?? "", offset: caretOffset(element), at: performance.now() };
}

/** How many characters into the element the cursor is. */
function caretOffset(element: HTMLElement): number {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return 0;
  const range = selection.getRangeAt(0);
  if (!element.contains(range.endContainer)) return 0;
  const before = range.cloneRange();
  before.selectNodeContents(element);
  before.setEnd(range.endContainer, range.endOffset);
  return before.toString().length;
}

/** Puts the cursor that many characters into the element. */
function placeCaret(element: HTMLElement, offset: number) {
  const selection = window.getSelection();
  if (!selection) return;
  const range = document.createRange();
  // Walk the element's pieces of text until the offset falls inside one.
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let remaining = offset;
  let node = walker.nextNode();
  while (node) {
    const length = node.textContent?.length ?? 0;
    if (remaining <= length) {
      range.setStart(node, remaining);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      return;
    }
    remaining -= length;
    node = walker.nextNode();
  }
  // Past the end (or no text at all): put the cursor at the end.
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

/** Call BEFORE new content is drawn. */
export function noteCaret() {
  const active = document.activeElement;
  // document.hasFocus() is false while the customer is typing in the editor's
  // form instead; then the preview must simply show what arrives.
  if (active instanceof HTMLElement && active.isContentEditable && active.dataset.edit && document.hasFocus()) {
    note = snapshot(active);
  } else {
    note = null;
  }
}

/** Call at every keystroke in an element being typed in. */
export function noteTyping(element: HTMLElement) {
  typed = snapshot(element);
}

/** Call when the customer stops typing in an element (it loses focus). */
export function forgetTyping() {
  typed = null;
}

/** Call AFTER new content is drawn. */
export function restoreCaret() {
  if (!note) return;
  // Use whichever record is newer: the one taken before drawing, or a keystroke since.
  const latest = typed && typed.element === note.element && typed.at > note.at ? typed : note;
  const { element, text, offset } = latest;
  note = null;
  if (document.activeElement !== element) return;
  // If a slightly older version of the text was just drawn over what the
  // customer has typed since, their typing wins.
  if (element.textContent !== text) element.textContent = text;
  placeCaret(element, offset);
}
