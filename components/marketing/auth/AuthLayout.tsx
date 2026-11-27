import Image from "next/image";
import mark from "@/public/images/brand/migsflow-mark.svg";
import HeroRings from "@/components/marketing/HeroRings";
import StarField from "@/components/marketing/StarField";
import NeonRings from "@/components/marketing/landing/NeonRings";
import DemoLabel from "@/components/ui/DemoLabel";

// The shared look of the Log in and Create account pages: one card in the
// middle of the screen, over the same stars, rings and glow as the landing page.

type AuthLayoutProps = {
  title: string;
  text: string;
  children: React.ReactNode;
  /** The line under the card, e.g. "New here? Create an account". */
  footer: React.ReactNode;
};

export default function AuthLayout({ title, text, children, footer }: AuthLayoutProps) {
  return (
    <section
      aria-labelledby="auth-title"
      data-pause-offscreen
      suppressHydrationWarning
      className="relative isolate overflow-clip px-4 py-14 sm:py-20"
    >
      <HeroRings />
      <NeonRings />
      <StarField count={14} />

      <div className="relative mx-auto w-full max-w-md">
        <div className="tint-card rounded-3xl border border-signal/25 p-7 sm:p-9">
          <div className="grid justify-items-center text-center">
            <Image src={mark} alt="" width={48} height={48} />
            <h1 id="auth-title" className="mt-5 font-display text-3xl font-medium tracking-tight">
              {title}
            </h1>
            <p className="mt-2 text-fg-muted">{text}</p>
          </div>
          <div className="mt-8">{children}</div>
        </div>

        <p className="mt-6 text-center text-fg-muted">{footer}</p>
        <div className="mt-4 text-center">
          <DemoLabel>Prototype: accounts are not built yet</DemoLabel>
        </div>
      </div>
    </section>
  );
}
