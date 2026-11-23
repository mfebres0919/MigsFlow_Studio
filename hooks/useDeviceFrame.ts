"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { deviceWidths, type Device } from "@/components/editor/DeviceToggle";

// Sizes a website preview <iframe> for the chosen device. Used by the
// editor's live preview and by a template's full-screen live preview.
//
// - "fit": the website is exactly as wide as the space it has, at real size.
// - Desktop, Tablet, Phone: the website is drawn at that device's real width
//   (1280px for desktop) and shrunk to fit if needed, like a photo of a
//   screen. So "Desktop" shows the true desktop layout even in a 700px space.
//
// Put `area` on the box the preview should fill, `holderStyle` on the box
// around the iframe, and `frameStyle` on the iframe (with "origin-top-left").
// <Area> is the kind of element `area` goes on: a <div> unless told otherwise,
// e.g. useDeviceFrame<HTMLElement>(device) for a <main>.

export function useDeviceFrame<Area extends HTMLElement = HTMLDivElement>(device: Device) {
  const area = useRef<Area>(null);
  const [space, setSpace] = useState({ width: 0, height: 0 });

  // Measure the space available, and keep measuring as the window is resized.
  useEffect(() => {
    const element = area.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setSpace({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const pageWidth =
    device === "fit" ? space.width : device === "desktop" ? Math.max(deviceWidths.desktop, space.width) : deviceWidths[device];
  const scale = space.width > 0 && pageWidth > 0 ? Math.min(1, space.width / pageWidth) : 1;

  // Sizes worked out at run time cannot be classes, so they are styles (the
  // handbook's dynamic-value exception).
  const holderStyle: CSSProperties = { width: pageWidth * scale, height: space.height };
  const frameStyle: CSSProperties = {
    width: pageWidth,
    height: scale > 0 ? space.height / scale : space.height,
    transform: `scale(${scale})`,
  };

  return { area, pageWidth, holderStyle, frameStyle };
}
