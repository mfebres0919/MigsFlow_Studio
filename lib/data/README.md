# lib/data — the doorway between frontend and backend

Pages and components get and save data **only** by calling functions in this folder.

- **Phase 1:** these functions return sample data (`lib/mock/`). Websites and activity are kept in the browser's `localStorage` (`store.ts`), so they survive a reload and, from Milestone 5, so do edits.
- **Phase 3:** the same functions read and write Supabase instead, and `store.ts` is deleted. The pages calling them do not change.

Nothing outside this folder imports from `lib/mock/` or `lib/server/`.

| File | What it answers |
|---|---|
| `customer.ts` | Who is signed in? |
| `websites.ts` | Which websites do they own? Which templates exist? |
| `activity.ts` | What did they do recently? |
| `media.ts` | Which pictures have they uploaded? Store a new one. (Kept in the browser's IndexedDB.) |
| `store.ts` | (internal) the browser-storage stand-in for the database |
