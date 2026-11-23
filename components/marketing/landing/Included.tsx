import { Eye, EyeOff, ImageDown, Palette, ShieldCheck, Smartphone } from "lucide-react";
import { WaveDivider } from "@/components/marketing/landing/Dividers";
import NeonRings from "@/components/marketing/landing/NeonRings";
import SectionHeading from "@/components/marketing/landing/SectionHeading";
import StarField from "@/components/marketing/StarField";

// "What's included": what every template comes with. Each point describes
// something Studio really does (or will do once publishing is built),
// never a promise about results.

export default function Included() {
  const points = [
    {
      icon: Eye,
      title: "A live preview editor",
      text: "Change words and photos in simple fields, or click right on the page and type.",
    },
    { icon: Smartphone, title: "Ready for every screen", text: "Every page lays itself out for phones, tablets and desktops." },
    {
      icon: Palette,
      title: "Your colors and fonts",
      text: "Pick your brand color and one of twelve font pairings. Text stays readable on any color.",
    },
    { icon: EyeOff, title: "Show or hide sections", text: "No reviews yet? Switch that section off, and turn it back on later." },
    {
      icon: ImageDown,
      title: "Photos made web-ready",
      text: "Upload straight from your phone. Photos are resized and compressed for fast pages.",
    },
    {
      icon: ShieldCheck,
      title: "Checks before you publish",
      text: "Studio stops you from going live with placeholder details like a sample phone number.",
    },
  ];

  return (
    // The light band, with a wave leading in and out of it.
    <div className="mt-8">
      <WaveDivider />
      {/* The band also carries migsflow.com's flowing line art and neon rings.
          data-pause-offscreen stops the rings floating while it is scrolled away. */}
      <section
        aria-labelledby="included-title"
        data-pause-offscreen
        suppressHydrationWarning
        className="flow-lines-bg overflow-clip bg-panel/60"
      >
        <NeonRings />
        <StarField count={10} />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <SectionHeading
            id="included-title"
            eyebrow="What's included"
            title="Everything you need to launch"
            text="Every template comes with the same editor and the same care, whatever your trade."
          />
          {/* Cards like the services cards on migsflow.com: soft tinted
              backgrounds (".tint-card" in globals.css), a blue icon square and
              an Orbitron title. Their solid backgrounds keep the rings behind them. */}
          <ul role="list" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {points.map(({ icon: Icon, title, text }) => (
              <li key={title} className="tint-card rounded-3xl border border-signal/20 p-7">
                <span className="bg-brand-gradient grid size-14 place-items-center rounded-2xl text-white shadow-lg shadow-accent/25">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-xl font-medium tracking-tight">{title}</h3>
                <p className="mt-3 text-fg-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <WaveDivider flip />
    </div>
  );
}
