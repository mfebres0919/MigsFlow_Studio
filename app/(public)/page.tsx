import Image from "next/image";
import mark from "@/public/images/brand/migsflow-mark.svg";
import Button from "@/components/ui/Button";
import DemoLabel from "@/components/ui/DemoLabel";
import { site } from "@/lib/site";

// The homepage ("/"). Still a placeholder: the real landing page is a later
// step of Phase 2. For now it leads to the templates and the demo dashboard.
export default function Home() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center sm:py-32">
      <Image src={mark} alt="" width={56} height={56} className="mx-auto" />
      <h1 className="mt-6 font-display text-3xl font-semibold tracking-wide">{site.name}</h1>
      <p className="mt-4 text-fg-muted">Pick a website template, make it yours, and publish it.</p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/templates">Browse templates</Button>
          <Button href="/dashboard" variant="secondary">
            Open the demo dashboard
          </Button>
        </div>
        <DemoLabel>Demo mode: sample data, no login</DemoLabel>
      </div>
    </div>
  );
}
