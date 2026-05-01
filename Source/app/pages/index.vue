<script setup lang="ts">
definePageMeta({ layout: false })
</script>

<template>
  <div class="min-h-screen bg-stone-50 flex flex-col">
    <!-- Hero -->
    <div class="flex-1 flex flex-col items-center justify-center px-6 py-20">
      <p class="text-sm font-semibold tracking-widest text-stone-500 uppercase mb-3">
        Poco
      </p>
      <h1 class="text-4xl font-bold text-stone-900 text-center mb-4">
        Track your focus.<br>Achieve your goals.
      </h1>
      <p class="text-base text-stone-500 text-center mb-8 max-w-md">
        Pomodoro-based focus tracking with activity goals and analytics.
      </p>
      <UButton to="/login" size="lg" color="neutral">
        Sign in with Google
      </UButton>
    </div>

    <!-- Divider -->
    <USeparator class="mx-16" />

    <!-- Feature Cards -->
    <div class="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-12">
      <UCard>
        <template #header>
          <div class="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-lg">
            <UIcon name="i-lucide-timer" />
          </div>
        </template>
        <p class="font-semibold text-sm text-stone-900 mb-1">Pomodoro Timer</p>
        <p class="text-sm text-stone-500">Configurable focus sessions with built-in accountability tracking.</p>
      </UCard>

      <UCard>
        <template #header>
          <div class="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-lg">
            <UIcon name="i-lucide-target" />
          </div>
        </template>
        <p class="font-semibold text-sm text-stone-900 mb-1">Activity Goals</p>
        <p class="text-sm text-stone-500">Set time goals per activity and track your progress session by session.</p>
      </UCard>

      <UCard>
        <template #header>
          <div class="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-lg">
            <UIcon name="i-lucide-bar-chart-3" />
          </div>
        </template>
        <p class="font-semibold text-sm text-stone-900 mb-1">Focus Analytics</p>
        <p class="text-sm text-stone-500">Heatmaps, streaks, and breakdowns to understand your focus patterns.</p>
      </UCard>
    </div>

    <!-- Footer -->
    <footer class="text-center py-6 text-xs text-stone-500 border-t border-stone-200">
      &copy; 2026 Poco. All rights reserved.
    </footer>
  </div>
</template>
