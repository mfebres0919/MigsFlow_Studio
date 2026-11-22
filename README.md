# MigsFlow Studio

Self-service website platform (prototype). Scope: `documentation/project-brief.md`. Project guide, decisions and change log: `CLAUDE.md`.

## Run it

In the VS Code terminal, inside this folder:

```bash
npm install     # once, and whenever package.json changes
npm run dev     # the site at http://localhost:3000 (Ctrl+C stops it)
npm run lint    # checks the code for mistakes
npm run build   # production build; run before every push
```

## Where things live

| Side | Folders |
|---|---|
| Frontend | `app/` (pages), `components/`, `templates/` |
| Backend | `supabase/` (database and security rules), `lib/server/` (server-only code) |
| The doorway between them | `lib/data/` (the only code pages call for data) |

Everything is mock data until Phase 3. Anything simulated is labeled on screen.
