import Image from "next/image";
import mark from "@/public/images/brand/migsflow-mark.svg";
import Button from "@/components/ui/Button";
import DemoLabel from "@/components/ui/DemoLabel";
import { site } from "@/lib/site";

// The homepage ("/"). A temporary placeholder: the real landing page and
// template marketplace are Phase 2. For now it is the door into the dashboard.
export default function Home() {
  return (
    <div className="max-w-md text-center">
      <Image src={mark} alt="" width={56} height={56} className="mx-auto" />
      <h1 className="mt-6 font-display text-3xl font-semibold tracking-wide">{site.name}</h1>
      <p className="mt-4 text-fg-muted">
        Pick a website template, make it yours, and publish it. This prototype shows the
        customer dashboard.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <Button href="/dashboard">Open the demo dashboard</Button>
        <DemoLabel>Demo mode: sample data, no login</DemoLabel>
      </div>
    </div>
  );
}
