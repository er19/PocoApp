<script setup lang="ts">
import type { Activity } from '~/types'
import { mockActivities, mockSessions } from '~/data/mock'

const activities = mockActivities
const recentSessions = mockSessions
const selectedActivity = ref<Activity>(activities[0])
const timerState = ref<'idle' | 'running' | 'paused' | 'completed'>('idle')
const showPauseModal = ref(false)
const confirmationSeconds = ref(24)

const displayMinutes = computed(() => {
  if (timerState.value === 'completed') return 0
  if (timerState.value === 'running') return 32
  return selectedActivity.value?.sessionDuration ?? 25
})

const displaySeconds = computed(() => {
  if (timerState.value === 'running') return 14
  return 0
})

function handleStart() {
  timerState.value = 'running'
}

function handlePause() {
  showPauseModal.value = true
}

function handleResume() {
  showPauseModal.value = false
}

function handlePauseAnyway() {
  showPauseModal.value = false
  timerState.value = 'paused'
}

function handleConfirm() {
  timerState.value = 'idle'
}
</script>

<template>
  <div class="max-w-xl mx-auto px-6 pt-8">
    <!-- Activity Selector -->
    <ActivitySelector
      :activities="activities"
      :selected="selectedActivity"
      @select="selectedActivity = $event"
    />

    <!-- Timer / Confirmation -->
    <ConfirmationTimer
      v-if="timerState === 'completed'"
      :seconds-left="confirmationSeconds"
      @confirm="handleConfirm"
    />
    <template v-else>
      <TimerDisplay
        :minutes="displayMinutes"
        :seconds="displaySeconds"
        :activity-name="selectedActivity?.name ?? 'No activity'"
        session-label="Session 3 of 8 today"
      />
      <TimerControls
        :state="timerState"
        @start="handleStart"
        @pause="handlePause"
        @confirm="handleConfirm"
      />
    </template>

    <!-- Pause Modal -->
    <PauseModal
      v-model:open="showPauseModal"
      @resume="handleResume"
      @pause-anyway="handlePauseAnyway"
    />

    <!-- Recent Sessions -->
    <USeparator class="my-10" />
    <RecentSessions :sessions="recentSessions" />
  </div>
</template>
