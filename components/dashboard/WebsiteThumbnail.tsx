// A small drawing of a web page, tinted with the website's brand color.
// It is a stand-in: a real miniature of the customer's site replaces it when
// the editor's live preview exists (Milestone 5).

type WebsiteThumbnailProps = {
  brandColor: string;
};

export default function WebsiteThumbnail({ brandColor }: WebsiteThumbnailProps) {
  return (
    <div
      aria-hidden="true" // decoration: the website's name is always written beside it
      // The brand color is data, not a design choice, so it cannot be a class.
      // It is passed in as a CSS variable (the handbook's "dynamic value"
      // exception) and used below as bg-(--brand).
      style={{ "--brand": brandColor } as React.CSSProperties}
      className="aspect-16/10 overflow-hidden rounded-control border border-line bg-white"
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
