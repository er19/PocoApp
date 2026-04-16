export interface Activity {
  id: string
  name: string
  sessionDuration: number  // minutes
  totalGoal: number        // hours
  totalLogged: number      // hours
}

export interface Session {
  id: string
  activityId: string
  activityName: string
  duration: number         // minutes
  status: 'focused' | 'unfocused' | 'paused'
  timestamp: string        // ISO date string
}

export interface OverviewStats {
  totalFocusHours: number
  totalSessions: number
  currentStreak: number    // days
  bestStreak: number       // days
  focusRate: number        // 0-100
  focusTrend: number       // month-over-month percentage change
  sessionsTrend: number
  focusRateTrend: number
}

export interface ActivityStats {
  activityId: string
  goalProgress: number     // 0-100
  totalLogged: number      // hours
  totalGoal: number        // hours
  sessions: number
  avgSessionMinutes: number
  focusRate: number        // 0-100
  dailyFocus: number[]     // 7 values for Mon-Sun, in minutes
}

export interface HeatmapDay {
  date: string
  intensity: 0 | 1 | 2 | 3 | 4
}

export interface WeeklyData {
  week: string
  hours: number
}
