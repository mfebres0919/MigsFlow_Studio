# MigsFlow Studio

Self-service website platform (Phase 1 prototype). Scope: `documentation/project-brief.md`. Project guide, decisions and change log: `CLAUDE.md`.

Everything runs on sample data kept in your browser. Nothing is sent anywhere, and anything simulated is labeled on screen.

## Run it

In the VS Code terminal, inside this folder:

```bash
npm install        # once, and whenever package.json changes
npm run dev        # the site at http://localhost:3000 (Ctrl+C stops it)
npm run lint       # checks the code for mistakes, including accessibility problems
npm run typecheck  # checks the TypeScript types
npm run build      # production build; run before every push
```

To start the demo over, clear this site's data in your browser (the demo data and uploaded photos live there).

## What to look at

| Address | What it is |
|---|---|
| `/` | Placeholder landing page (the marketplace is Phase 2) |
| `/dashboard` | Overview |
| `/dashboard/websites` | My Websites |
| `/dashboard/websites/site_brightside/edit` | The Website Editor |
| `/dashboard/media` | Media Library |
| `/dashboard/domains` | Domains (simulated) |
| `/dashboard/publishing` | Hosting & Publishing (simulated) |
| `/dashboard/billing` | Billing (sample data) |
| `/dashboard/settings` | Account Settings |
| `/preview/site_brightside` | A website on its own, as visitors would see it |

## Where things live

| Side | Folders |
|---|---|
| Frontend | `app/` (pages), `components/`, `templates/` (the website designs customers buy), `hooks/` |
| Backend | `supabase/` (database and security rules, Phase 3), `lib/server/` (server-only code, Phase 3) |
| The doorway between them | `lib/data/` (the only code pages call for data) |

`templates/types.ts` explains how a template, its schema and a website's content fit together.
