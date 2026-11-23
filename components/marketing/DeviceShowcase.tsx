"use client"; // it changes slides on a timer and reacts to clicks

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import laptopFrame from "@/public/images/showcase/macbook-frame.webp";
import phoneFrame from "@/public/images/showcase/iphone-frame.webp";

// The laptop and phone on the landing page, cycling through real Studio
// templates: the same showcase as the hero on migsflow.com. The devices are
// photos taken at an angle; each template's screens are screenshots tilted to
// match them (tools/make-showcase-screens.py), so only the screens change.
//
// Underneath: the template's name, a "View template" link, and the
// controls (previous, one dot per template, pause, next).
//
// Vanilla comparison: the main site's main.js found the slides with
// querySelectorAll and toggled an "is-active" class on a timer. Here React
// keeps one number, "index", and every part (screens, caption, dots) is
// drawn from it, so they can never disagree.

export type ShowcaseItem = {
  id: string;
  name: string;
  /** e.g. "Moving & logistics". */
  industry: string;
  /** e.g. "$450". */
  price: string;
  href: string;
  laptop: string;
  phone: string;
};

/** How long each template stays on screen. */
const SLIDE_MS = 6000;

const subscribeNever = () => () => {};
const prefersCalm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function DeviceShowcase({ items }: { items: ShowcaseItem[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  // People who ask for reduced motion start paused (it is never true in the built HTML).
  const calm = useSyncExternalStore(subscribeNever, prefersCalm, () => false);
  // null until the pause button is pressed; after that, the visitor's choice wins.
  const [pausedByVisitor, setPausedByVisitor] = useState<boolean | null>(null);
  const paused = pausedByVisitor ?? calm;
  // Paused for a moment while the pointer or keyboard is on the showcase, so it does not move under them.
  const [held, setHeld] = useState(false);

  // The timer. It restarts whenever the slide changes, so a click always gets a full 6 seconds.
  useEffect(() => {
    if (paused || held || items.length < 2) return;
    const timer = window.setTimeout(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % items.length);
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, held, items.length]);

  if (items.length === 0) return null;
  const current = items[index];
  const go = (step: number) => setIndex((index + step + items.length) % items.length);

  const control =
    "grid size-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-signal hover:bg-signal/10 hover:text-signal";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Studio templates"
      className="mx-auto w-full max-w-xl lg:max-w-none"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      {/* The devices. A picture, so screen readers skip it: the caption below says the same.
          Clicking it opens the template, like the link underneath. ml-[13%] leaves room
          for the phone, which hangs off the left edge. */}
      <div
        aria-hidden="true"
        onClick={() => router.push(current.href)}
        className="devices-glow relative ml-[13%] aspect-1210/1060 cursor-pointer rounded-full"
      >
        {/* Soft shadows on the "floor" under each device. They stay still while
            the devices float above them: a still shadow is drawn once, while a
            shadow attached to a moving picture (the main site's drop-shadow)
            is redrawn on every frame, which made the page lag in Firefox. */}
        <div className="absolute top-[62%] left-[18%] h-[34%] w-[84%] -rotate-[28deg] rounded-[50%] bg-[radial-gradient(closest-side,rgb(30_64_175/0.22),transparent)] dark:bg-[radial-gradient(closest-side,rgb(0_0_0/0.6),transparent)]" />
        <div className="absolute top-[88%] left-[-6%] h-[12%] w-[30%] -rotate-[28deg] rounded-[50%] bg-[radial-gradient(closest-side,rgb(30_64_175/0.22),transparent)] dark:bg-[radial-gradient(closest-side,rgb(0_0_0/0.6),transparent)]" />

        <div className="absolute top-[0.5%] left-[9.7%] w-[90.3%] motion-safe:animate-float-slow">
          <Image src={laptopFrame} alt="" sizes="(min-width: 1024px) 490px, 75vw" preload className="block h-auto w-full" />
          {/* The screen area, measured on the frame picture. */}
          <div className="absolute top-[1.24%] left-[37.15%] h-[73.21%] w-[61.3%]">
            {items.map((item, i) => (
              <Image
                key={item.id}
                src={item.laptop}
                alt=""
                fill
                sizes="(min-width: 1024px) 300px, 45vw"
                preload={i === 0}
                className={`transition-opacity duration-700 motion-reduce:transition-none ${i === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute top-[39%] left-[-13.5%] w-[47.5%] motion-safe:animate-float">
          <Image src={phoneFrame} alt="" sizes="(min-width: 1024px) 230px, 35vw" className="block h-auto w-full" />
          <div className="absolute top-[10.14%] left-[33.2%] h-[78.85%] w-[32.2%]">
            {items.map((item, i) => (
              <Image
                key={item.id}
                src={item.phone}
                alt=""
                fill
                sizes="(min-width: 1024px) 85px, 15vw"
                preload={i === 0}
                // The phone follows the laptop by a beat.
                className={`transition-opacity delay-150 duration-700 motion-reduce:transition-none ${i === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* The caption: which template is showing, and the way to it. */}
      <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-line bg-panel/85 py-3.5 pr-3.5 pl-5 shadow-lg shadow-accent/5">
        {/* While it moves by itself, screen readers are not interrupted on
            every slide ("off"). Once paused, a change is read out ("polite"). */}
        <div aria-live={paused ? "polite" : "off"} aria-atomic="true" className="min-w-0">
          <div key={current.id} className="grid gap-0.5 motion-safe:animate-caption">
            <p className="text-[11px] font-medium tracking-[0.16em] text-signal">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <p className="truncate font-display font-semibold tracking-wide sm:text-lg">{current.name}</p>
            <p className="text-sm text-fg-muted">
              {current.industry} · {current.price}
            </p>
          </div>
        </div>
        <Link
          href={current.href}
          className="bg-brand-gradient group inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium text-white shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
        >
          View template<span className="sr-only">: {current.name}</span>
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* The controls. */}
      <div className="mt-4 flex items-center justify-center gap-2.5">
        <button type="button" onClick={() => go(-1)} className={control}>
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span className="sr-only">Previous template</span>
        </button>
        <div role="group" aria-label="Choose a template to show" className="mx-1 flex items-center">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={i === index ? "true" : undefined}
              // A 24 x 24px target around a small dot (the WCAG minimum); the current one stretches into a pill.
              className={`group relative h-6 transition-[width] duration-300 ${i === index ? "w-9" : "w-6"}`}
            >
              <span
                className={`absolute top-1/2 left-1/2 h-1.5 -translate-1/2 rounded-full transition-[width,background-color] duration-300 ${
                  i === index ? "bg-brand-gradient w-6 shadow-[0_0_10px_rgb(24_201_255/0.5)]" : "w-1.5 bg-fg-muted/50 group-hover:bg-fg"
                }`}
              />
              <span className="sr-only">Show {item.name}</span>
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setPausedByVisitor(!paused)} className={control}>
          {paused ? <Play aria-hidden="true" className="size-4 fill-current" /> : <Pause aria-hidden="true" className="size-4 fill-current" />}
          <span className="sr-only">{paused ? "Play the slideshow" : "Pause the slideshow"}</span>
        </button>
        <button type="button" onClick={() => go(1)} className={control}>
          <ArrowRight aria-hidden="true" className="size-4" />
          <span className="sr-only">Next template</span>
        </button>
      </div>
    </section>
  );
}
