# Poco — UI Design Spec

## Overview

Poco is a Pomodoro-based focus tracking web app. Users track focus time per activity, set goals, and review statistics. This spec covers **UI only** — all data is mock/placeholder. The user will implement backend logic separately.

**Stack:** Nuxt 4, NuxtUI 4.6, Tailwind CSS 4. No additional UI libraries.

**Visual tone:** Professional/corporate — structured layouts, sharp card borders, neutral color palette (grays, black primary accent), data-heavy feel.

## Architecture

**Approach:** Page-per-feature with shared layout. Each major feature is its own route under a persistent top navbar layout.

**Routes:**

| Route | Auth | Layout | Purpose |
|-------|------|--------|---------|
| `/` | Public | Standalone (no navbar) | Landing page — hero + features, directs to login |
| `/login` | Public | Standalone (no navbar) | Google OAuth login |
| `/dashboard` | Required | App layout (navbar) | Timer page — core pomodoro functionality |
| `/activities` | Required | App layout (navbar) | Activity CRUD with goals |
| `/overview` | Required | App layout (navbar) | Statistics dashboard |

**File structure:**

```
app/
  layouts/
    default.vue          # App layout with top navbar (authenticated pages)
  pages/
    index.vue            # Landing page (standalone, no layout)
    login.vue            # Login page (standalone, no layout)
    dashboard.vue        # Timer page
    activities.vue       # Activity management
    overview.vue         # Statistics dashboard
  components/
    AppNavbar.vue        # Top navbar component
    TimerDisplay.vue     # Large countdown timer display
    TimerControls.vue    # Start/Pause button
    ConfirmationTimer.vue # 30-second post-session confirmation countdown
    PauseModal.vue       # Pause warning modal
    ActivitySelector.vue # Activity dropdown for timer page
    RecentSessions.vue   # Recent sessions table
    ActivityTable.vue    # Activities list table
    ActivityModal.vue    # Add/Edit activity modal
    StatCard.vue         # Reusable stat card (number + label + trend)
    FocusHeatmap.vue     # GitHub-style contribution heatmap
    WeeklyTrend.vue      # Weekly bar chart
    ActivityBreakdown.vue # Per-activity stats section with tabs
    DailyChart.vue       # Daily focus bar chart for selected activity
```

## Page Designs

### Shared Layout — App Navbar

Persistent top navbar for all authenticated pages.

- **Left:** App logo/name "Poco"
- **Center:** Nav links — Dashboard, Activities, Overview. Active link has bottom border + bold weight.
- **Right:** Active timer indicator (shows mini countdown when a session is running on another page, hidden when idle) + User avatar dropdown (profile, logout)

NuxtUI components: `UNavigationMenu` for nav links, `UDropdownMenu` for avatar menu, `UAvatar` for user image.

### Landing Page (`/`)

Standalone page, no navbar. Redirects to `/dashboard` if user is already authenticated.

- **Hero section:** Centered. App name "Poco" in uppercase letter-spaced label. Headline: "Track your focus. Achieve your goals." Subtext describing the app. "Sign in with Google" button.
- **Feature cards:** 3 cards in a row below the hero — "Pomodoro Timer", "Activity Goals", "Focus Analytics" — each with icon and short description.
- **Footer:** Minimal copyright line.

NuxtUI components: `UButton` for sign-in, `UCard` for feature cards.

### Login Page (`/login`)

Standalone page. Simple centered card with Google OAuth button. Minimal — just the auth action. The landing page's "Sign in with Google" button navigates here. This page handles the actual OAuth flow (user will wire up better-auth).

NuxtUI components: `UCard`, `UButton`.

### Dashboard / Timer Page (`/dashboard`)

The core page. All timer states are handled here.

**Activity selector (top):**
- Dropdown to select which activity this session is for. Includes a "Quick Session" option for untracked sessions.
- Displays the selected activity's per-session duration below the selector.
- Session duration is shown but not editable inline (configured in Activities page).

NuxtUI: `USelectMenu` for activity dropdown.

**Timer display (center):**
- Large numeric countdown (e.g., "45:00"). Prominent, the focal point of the page.
- Below: current activity name + session count (e.g., "Session 3 of 8 today").
- Font: tabular-nums for consistent digit width.

**Timer states:**

1. **Idle:** Timer shows full session duration. "Start" button (dark, primary).
2. **Running:** Timer counts down. Button changes to red "Pause" button.
3. **Paused (modal):** Clicking Pause opens a warning modal:
   - Title: "Are you sure?"
   - Body: "Pausing means you're not focusing. This will be recorded in your session history."
   - Actions: "Resume" (outlined/secondary) and "Pause Anyway" (red/destructive)
   - If user confirms pause, timer pauses and the pause is logged.
4. **Completed (30s confirmation):** When timer reaches 00:00:
   - Display switches to a 30-second countdown (red, urgent).
   - Message: "Session complete! Confirm within 30 seconds to mark as focused."
   - "Confirm Focused" button (green).
   - If 30 seconds expire without confirmation, session is flagged as unfocused.

NuxtUI: `UModal` for pause warning, `UButton` for controls, `UBadge` for status indicators.

**Recent sessions (below timer):**
- Table showing last 5 sessions: Activity, Duration, Status (badge: Focused/green, Paused/yellow, Unfocused/red), Time.
- Mock data for UI.

NuxtUI: `UTable` for sessions list, `UBadge` for status.

### Activities Page (`/activities`)

**Page header:** Title "Activities" + "Add Activity" button (top right).

**Activity table:**
Each row shows:
- Activity name (bold)
- Per-session duration (e.g., "45 min")
- Total goal (e.g., "20 hrs")
- Progress bar — visual bar showing completed vs goal, with text label (e.g., "13 / 20 hrs"). Bar turns green when near completion (>80%).
- Actions: Edit (text link) and Delete (red text link)

NuxtUI: `UTable`, `UProgress` for progress bars, `UButton` for actions.

**Add/Edit Activity Modal:**
- Title: "Add Activity" or "Edit Activity"
- Fields:
  - Activity Name (text input, required)
  - Session Duration in minutes (number input, default 25)
  - Total Goal in hours (number input)
- Actions: "Cancel" (outlined) and "Save Activity" (primary)

NuxtUI: `UModal`, `UFormField`, `UInput`, `UButton`.

### Overview / Statistics Page (`/overview`)

Rich data dashboard with mock data throughout.

**Summary stat cards (top row, 4 columns):**
- Total Focus Time — all-time hours, with month-over-month trend (green up arrow or red down arrow)
- Sessions Completed — total count + trend
- Current Streak — consecutive days with at least 1 focused session. Shows best streak below.
- Focus Rate — percentage of sessions marked as focused. Shows trend.

NuxtUI: `UCard` for each stat.

**Focus Heatmap:**
- GitHub-style contribution grid showing daily focus intensity over the past year.
- 5-level grayscale intensity (lightest gray to black).
- Legend at bottom right: "Less" → "More" with color squares.

Implementation: CSS grid of small squares. Mock data with randomized intensities.

**Weekly Focus Trend:**
- Bar chart showing focus hours per week for the last 12 weeks.
- Current/recent weeks highlighted in dark (black), older weeks in gray.
- Week labels along x-axis (W1–W12).

Implementation: Flexbox bars with percentage heights. No charting library — pure CSS/HTML.

**Activity Breakdown (bottom section):**
- Horizontal tab buttons to select an activity (e.g., "Learn Rust", "Deep Work", "Read Books", "Side Project"). Active tab is dark/filled, others outlined.
- Per-activity stat cards (4 columns): Goal Progress (with mini progress bar + fraction), Sessions count, Avg Session length, Focus Rate.
- Daily Focus bar chart for the selected activity — 7 bars for Mon–Sun. Similar implementation to weekly trend.

NuxtUI: `UTabs` or custom tab buttons, `UCard` for stats, `UProgress` for goal bar.

## Component Data Contracts

All components receive mock/hardcoded data via props. This defines the prop interfaces so the user can later replace mock data with real API calls.

```typescript
// Types for the UI (no backend integration)

interface Activity {
  id: string
  name: string
  sessionDuration: number  // minutes
  totalGoal: number        // hours
  totalLogged: number      // hours
}

interface Session {
  id: string
  activityId: string
  activityName: string
  duration: number         // minutes
  status: 'focused' | 'unfocused' | 'paused'
  timestamp: string        // ISO date string
}

interface OverviewStats {
  totalFocusHours: number
  totalSessions: number
  currentStreak: number    // days
  bestStreak: number       // days
  focusRate: number        // 0-100
  // Trends are month-over-month percentage change
  focusTrend: number
  sessionsTrend: number
  focusRateTrend: number
}

interface ActivityStats {
  activityId: string
  goalProgress: number     // 0-100
  totalLogged: number      // hours
  totalGoal: number        // hours
  sessions: number
  avgSessionMinutes: number
  focusRate: number        // 0-100
  dailyFocus: number[]     // 7 values for Mon-Sun, in minutes
}

// Heatmap: array of { date: string, intensity: 0-4 }
// WeeklyTrend: array of { week: string, hours: number }
```

## Design Decisions

- **No charting library:** All charts (heatmap, bar charts) are pure CSS/HTML using flexbox and grid. Keeps dependencies minimal and gives the user full control.
- **NuxtUI components wherever possible:** Buttons, modals, tables, inputs, dropdowns, badges, cards — all from NuxtUI to maintain consistency and reduce custom CSS.
- **Mock data in components:** Each component has hardcoded mock data matching the type interfaces above. The user replaces these with real API calls during backend implementation.
- **No client-side timer logic:** The timer display shows static mock states. The user will implement actual countdown logic, localStorage persistence, and state management as part of backend work.
- **No auth guards:** Pages don't implement actual route protection. The user will add middleware for auth redirects.
- **Responsive:** Desktop-first but components should use Tailwind responsive utilities to not break on smaller screens.
