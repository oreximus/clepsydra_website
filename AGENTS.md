# AGENTS.md

All commands run from `frontEnd/`. The project is a Next.js 14 App Router site (no `src/` dir, no `pages/`). Path alias `@/*` = `frontEnd/*`.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Build (ESLint & TS errors silenced in next.config.mjs) |
| `npm run lint` | ESLint via `next lint` |
| `npm start -p 5000` | Production server |

No test framework configured.

## Architecture

- **Auth**: NextAuth v4 Credentials provider, JWT sessions, signIn at `/auth/login`. Guard done client-side via `DashboardAuthGuard` -- no `middleware.ts`.
- **Database**: PostgreSQL via `pg` Pool, raw queries with `$1,$2` placeholders, no ORM. Tables auto-create via `initUsersTable()`/`initPostsTable()` called on demand from API routes.
- **Blog storage**: Dual -- PostgreSQL for CRUD + `content/blog/[slug]/index.md` filesystem for SSG. Filesystem write on update is best-effort (silent fail on Vercel).
- **AI**: Groq `llama-3.3-70b-versatile` for article gen (marker-based extraction: `---TITLE---`/`---CONTENT---`). Cloudflare Workers AI Stable Diffusion for cover images.
- **Styling**: `styles/globals.css` (NOT `app/globals.css`). Tailwind config in `tailwind.config.js` (JS, not TS as `components.json` claims). Brand colors via `brand-*` tokens.
- **No dark mode**: `defaultTheme="light"`.
- **Fonts**: Plus Jakarta Sans (heading), Inter (body) via `next/font/google`.

## Key quirks

- Footer is `"use client"` (onMouseEnter/onMouseLeave). ConditionalFooter hides it on `/dashboard`, `/admin`, `/auth`.
- `next.config.mjs` ignores both TS errors and ESLint during build (`ignoreBuildErrors: true`, `ignoreDuringBuilds: true`). The build will succeed even with type/ESLint errors.
- Cover image API handles both `image/*` Content-Type (raw PNG) and JSON with base64.
- `robots.ts` disallows `/admin/`, `/dashboard/`, `/api/`, `/auth/`.

## Required env vars (`.env.local`)

```
GROQ_API_KEY
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN (or PIXAZO_API_KEY)
DATABASE_URL (PostgreSQL)
NEXTAUTH_SECRET
NEXTAUTH_URL
GMAIL_USER + GMAIL_APP_PASSWORD (contact form)
```
