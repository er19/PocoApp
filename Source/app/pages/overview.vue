<script setup lang="ts">
import { mockOverviewStats, generateMockHeatmap, mockWeeklyTrend, mockActivities, mockActivityStats } from '~/data/mock'

const stats = mockOverviewStats
const heatmapDays = generateMockHeatmap()
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 pt-8">
    <h1 class="text-xl font-bold text-stone-900 mb-6">Overview</h1>

    <!-- Stat Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard label="Total Focus" :value="`${stats.totalFocusHours}h`" :trend="stats.focusTrend" />
      <StatCard label="Sessions" :value="String(stats.totalSessions)" :trend="stats.sessionsTrend" />
      <StatCard label="Streak" :value="`${stats.currentStreak}d`" :subtitle="`Best: ${stats.bestStreak} days`" />
      <StatCard label="Focus Rate" :value="`${stats.focusRate}%`" :trend="stats.focusRateTrend" />
    </div>

    <!-- Heatmap -->
    <FocusHeatmap :days="heatmapDays" class="mb-6" />

    <!-- Weekly Trend -->
    <WeeklyTrend :weeks="mockWeeklyTrend" class="mb-8" />

    <!-- Divider -->
    <USeparator class="my-8" />

    <!-- Activity Breakdown -->
    <ActivityBreakdown
      :activities="mockActivities"
      :stats-map="mockActivityStats"
    />
  </div>
</template>
