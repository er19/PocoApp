<script setup lang="ts">
import type { Activity } from "~/types";
import { mockActivities, mockSessions } from "~/data/mock";
import { ref, computed } from "vue";

const activities = mockActivities;
const recentSessions = mockSessions;
const selectedActivity = ref<Activity>(activities[0]);
const timerState = ref<"idle" | "running" | "paused" | "completed">("idle");
const showPauseModal = ref(false);
const confirmationSeconds = ref(24);
const defaultDuration = ref(25 * 60);
const timeLeft = ref(25 * 60);

const formattedTime = computed((): [number, number] => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return [minutes, seconds];
});

const { resume: startTimer, pause: pauseTimer } = useIntervalFn(
  () => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      pauseTimer();
      timerState.value = "completed";
    }
  },
  1000,
  { immediate: false },
);

function setMinutes(val: number) {
  const currentSeconds = timeLeft.value % 60;
  timeLeft.value = val * 60 + currentSeconds;
  defaultDuration.value = timeLeft.value;
}

function setSeconds(val: number) {
  const currentMinutes = Math.floor(timeLeft.value / 60);
  timeLeft.value = currentMinutes * 60 + val;
  defaultDuration.value = timeLeft.value;
}

function handleStart() {
  if (timeLeft.value <= 0) return;
  timerState.value = "running";
  startTimer();
}

function handlePause() {
  showPauseModal.value = true;
}

function handleResume() {
  showPauseModal.value = false;
}

function handlePauseAnyway() {
  showPauseModal.value = false;
  timerState.value = "paused";
  pauseTimer();
}

function handleConfirm() {
  timerState.value = "idle";
  pauseTimer();
  timeLeft.value = defaultDuration.value;
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
        :totaltime="timeLeft"
        :minutes="formattedTime[0]"
        :seconds="formattedTime[1]"
        :activity-name="selectedActivity?.name ?? 'No activity'"
        session-label="Session 3 of 8 today"
        :editable="timerState === 'idle' || timerState === 'paused'"
        @update:minutes="setMinutes"
        @update:seconds="setSeconds"
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
