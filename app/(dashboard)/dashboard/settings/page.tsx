import type { Metadata } from "next";
import PlannedPage from "@/components/dashboard/PlannedPage";

export const metadata: Metadata = { title: "Account settings" };

export default function Page() {
  return (
    <PlannedPage
      title="Account settings"
      description="Your personal details, business details and sign-in."
      milestone={6}
    />
  );
}
