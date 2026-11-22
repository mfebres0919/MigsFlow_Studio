# lib/server — backend code (empty until Phase 3)

Code that runs **only on the server** and may use secret keys: later the Supabase server client, Stripe payments, publishing and the form inbox.

Rules:
- Nothing here is ever imported by a Client Component (a file starting with `"use client"`), or the secrets would be sent to the browser.
- Secrets come from environment variables, never from the code and never from a `NEXT_PUBLIC_` variable.

Phase 1 uses mock data only, so this folder is a placeholder.
