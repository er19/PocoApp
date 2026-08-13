# Need to fix/add next time
1. Margin error
2. logic behind button
3. multiple view on dashboard based on period filter
4. update data structure

# Poco

All-in-one study tools. Poco is a distraction-free study dashboard that puts task
planning and a Pomodoro timer on a single page, so there's no need to juggle
multiple tabs during a focus session. It also nudges against overplanning by
guiding you through planning a task and then executing it.

## Features

- **Landing page** (`/`) — product overview with features, about and contact sections, plus a dark-mode toggle.
- **Google sign-in** (`/login`) — authentication via Better Auth's Google social provider.
- **Focus session** (`/app`) — the to-do list; picking a task to focus on reveals the Pomodoro timer with editable durations and mode tabs.
- **Dashboard** (`/dashboard`) — focus history and analytics (greetings, stats cards, history chart). Work in progress; the components are still largely placeholders.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Nuxt 4 (Vue 3, SSR) |
| UI | Nuxt UI 4 + Tailwind CSS 4 |
| Charts | nuxt-charts |
| Auth | Better Auth (Google OAuth) with the Drizzle adapter |
| Database | PostgreSQL via Drizzle ORM + drizzle-kit |
| Package manager | pnpm |

## env file

   ```
   DATABASE_URL=postgres://user:password@host:5432/poco
   BETTER_AUTH_SECRET=<random string>
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=<from Google Cloud Console>
   GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
   ```

   The Google OAuth client needs `http://localhost:3000/api/auth/callback/google`
   registered as an authorised redirect URI.

