"use client"; // it may need to read an uploaded picture from the browser's storage

import { useMediaUrls } from "@/hooks/useMediaUrls";
import { mediaIdFrom } from "@/lib/media/ref";
import type { Website } from "@/lib/types";
import { heroImageOf } from "@/lib/website-preview";

// The small picture that stands for a website in lists. It shows the
// website's own hero image, so it changes when the customer changes that
// photo. A website with no hero image gets a simple drawing of a page instead.

type WebsiteThumbnailProps = {
  website: Website;
};

const frame = "aspect-16/10 overflow-hidden rounded-control border border-line";

export default function WebsiteThumbnail({ website }: WebsiteThumbnailProps) {
  const hero = heroImageOf(website);
  // An uploaded picture is stored as "media:<id>" and needs turning into an address.
  const uploadId = hero ? mediaIdFrom(hero.src) : null;
  const resolve = useMediaUrls(uploadId ? [uploadId] : []);
  const src = hero ? resolve(hero.src) : "";

  if (hero) {
    return (
      // aria-hidden: decoration, because the website's name is always written beside it.
      <div aria-hidden="true" className={`${frame} bg-raised`}>
        {/* The customer's own picture, so a plain <img> (see CLAUDE.md, handbook exceptions). */}
        {src && <img src={src} alt="" loading="lazy" className="size-full object-cover" />}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      // The brand color is data, not a design choice, so it cannot be a class.
      // It is passed in as a CSS variable (the handbook's "dynamic value"
      // exception) and used below as bg-(--brand).
      style={{ "--brand": website.brandColor } as React.CSSProperties}
      className={`${frame} bg-white`}
    >
      <div className="flex h-[14%] items-center gap-[3%] bg-(--brand) px-[6%]">
        <span className="h-[30%] w-[18%] rounded-full bg-white/90" />
        <span className="ml-auto h-[22%] w-[8%] rounded-full bg-white/60" />
        <span className="h-[22%] w-[8%] rounded-full bg-white/60" />
      </div>
      <div className="grid h-[86%] grid-rows-[5fr_3fr] gap-[6%] p-[6%]">
        <div className="flex flex-col justify-center gap-[10%] rounded-sm bg-black/5 px-[6%]">
          <span className="h-[14%] w-[62%] rounded-full bg-black/30" />
          <span className="h-[9%] w-[44%] rounded-full bg-black/15" />
          <span className="h-[18%] w-[24%] rounded-full bg-(--brand)" />
        </div>
        <div className="grid grid-cols-3 gap-[4%]">
          <span className="rounded-sm bg-black/10" />
          <span className="rounded-sm bg-black/10" />
          <span className="rounded-sm bg-black/10" />
        </div>
      </div>
    </div>
  );
}
