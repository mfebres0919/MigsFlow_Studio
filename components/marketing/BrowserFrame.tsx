import Image from "next/image";

// A picture of a website inside a small drawing of a browser window: three
// dots, an address pill, and the template's hero image below. It is how the
// marketplace shows that these are real websites, not just photos.

type BrowserFrameProps = {
  src: string;
  /** The address shown in the pill, e.g. "yourmovers.com". Decoration only. */
  address: string;
  /** Tells the browser how wide the picture is shown, so it can pick the right file size. */
  sizes: string;
  /** True for the one picture that should load first. */
  preload?: boolean;
};

export default function BrowserFrame({ src, address, sizes, preload = false }: BrowserFrameProps) {
  return (
    <div className="overflow-hidden rounded-panel border border-line bg-panel shadow-2xl shadow-accent/15">
      <div className="flex items-center gap-3 border-b border-line px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line-strong/50" />
          <span className="size-2.5 rounded-full bg-line-strong/50" />
          <span className="size-2.5 rounded-full bg-line-strong/50" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-raised px-3 py-0.5 text-center text-xs text-fg-muted">
          {address}
        </span>
      </div>
      <div className="relative aspect-16/10 bg-raised">
        <Image src={src} alt="" fill sizes={sizes} preload={preload} className="object-cover" />
      </div>
    </div>
  );
}
