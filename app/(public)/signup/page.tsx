import type { Metadata } from "next";
import Link from "next/link";
import AuthLayout from "@/components/marketing/auth/AuthLayout";
import EmailLinkForm from "@/components/marketing/auth/EmailLinkForm";

// "/signup" (Phase 2, step 5: design only). Creating an account asks for
// the least needed to start, with no password: the customer confirms their
// email through a link (real in Phase 3). Terms and a privacy policy are
// still to be written (CLAUDE.md, "Decisions to make before selling"); a
// line agreeing to them goes here before launch.

export const metadata: Metadata = { title: "Create an account", alternates: { canonical: "/signup" }, robots: { index: false } };

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      text="Start with a template, then make it yours in the editor."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-signal underline-offset-4 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <EmailLinkForm kind="signup" />
    </AuthLayout>
  );
}
