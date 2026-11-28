import type { Metadata } from "next";
import Link from "next/link";
import AuthLayout from "@/components/marketing/auth/AuthLayout";
import EmailLinkForm from "@/components/marketing/auth/EmailLinkForm";

// "/login" (Phase 2, step 5: design only). Signing in is passwordless:
// the customer gets a sign-in link by email (real in Phase 3).

export const metadata: Metadata = { title: "Log in", alternates: { canonical: "/login" }, robots: { index: false } };

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      text="Sign in to edit and publish your websites."
      footer={
        <>
          New to Studio?{" "}
          <Link href="/signup" className="font-medium text-signal underline-offset-4 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <EmailLinkForm kind="login" />
    </AuthLayout>
  );
}
