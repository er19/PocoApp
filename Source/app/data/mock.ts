import type { Activity, Session, OverviewStats, ActivityStats, HeatmapDay, WeeklyData } from '~/types'

export const mockActivities: Activity[] = [
  { id: '1', name: 'Learn Rust', sessionDuration: 45, totalGoal: 20, totalLogged: 13 },
  { id: '2', name: 'Deep Work', sessionDuration: 25, totalGoal: 50, totalLogged: 15 },
  { id: '3', name: 'Read Books', sessionDuration: 30, totalGoal: 10, totalLogged: 9 },
  { id: '4', name: 'Side Project', sessionDuration: 60, totalGoal: 100, totalLogged: 12 },
]

export const mockSessions: Session[] = [
  { id: '1', activityId: '1', activityName: 'Learn Rust', duration: 45, status: 'focused', timestamp: '2026-04-16T14:30:00Z' },
  { id: '2', activityId: '2', activityName: 'Deep Work', duration: 25, status: 'paused', timestamp: '2026-04-16T13:15:00Z' },
  { id: '3', activityId: '1', activityName: 'Learn Rust', duration: 45, status: 'unfocused', timestamp: '2026-04-16T11:45:00Z' },
  { id: '4', activityId: '3', activityName: 'Read Books', duration: 30, status: 'focused', timestamp: '2026-04-16T10:00:00Z' },
  { id: '5', activityId: '4', activityName: 'Side Project', duration: 60, status: 'focused', timestamp: '2026-04-16T08:30:00Z' },
]

export const mockOverviewStats: OverviewStats = {
  totalFocusHours: 142,
  totalSessions: 284,
  currentStreak: 14,
  bestStreak: 23,
  focusRate: 87,
  focusTrend: 12,
  sessionsTrend: 8,
  focusRateTrend: -3,
}

export const mockActivityStats: Record<string, ActivityStats> = {
  '1': { activityId: '1', goalProgress: 65, totalLogged: 13, totalGoal: 20, sessions: 42, avgSessionMinutes: 38, focusRate: 91, dailyFocus: [45, 90, 0, 45, 90, 45, 0] },
  '2': { activityId: '2', goalProgress: 30, totalLogged: 15, totalGoal: 50, sessions: 36, avgSessionMinutes: 23, focusRate: 83, dailyFocus: [25, 50, 25, 0, 25, 50, 25] },
  '3': { activityId: '3', goalProgress: 90, totalLogged: 9, totalGoal: 10, sessions: 18, avgSessionMinutes: 28, focusRate: 94, dailyFocus: [30, 0, 30, 30, 0, 30, 30] },
  '4': { activityId: '4', goalProgress: 12, totalLogged: 12, totalGoal: 100, sessions: 12, avgSessionMinutes: 55, focusRate: 75, dailyFocus: [60, 0, 60, 0, 60, 0, 0] },
}

export function generateMockHeatmap(): HeatmapDay[] {
  const days: HeatmapDay[] = []
  const now = new Date('2026-04-16')
  for (let i = 364; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    days.push({
      date: date.toISOString().split('T')[0],
      intensity: Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4,
    })
  }
  return days
}

export const mockWeeklyTrend: WeeklyData[] = [
  { week: 'W1', hours: 5.4 },
  { week: 'W2', hours: 7.4 },
  { week: 'W3', hours: 4.6 },
  { week: 'W4', hours: 8.5 },
  { week: 'W5', hours: 6.6 },
  { week: 'W6', hours: 10.0 },
  { week: 'W7', hours: 8.2 },
  { week: 'W8', hours: 9.0 },
  { week: 'W9', hours: 10.8 },
  { week: 'W10', hours: 7.2 },
  { week: 'W11', hours: 9.4 },
  { week: 'W12', hours: 10.2 },
]
