<script setup lang="ts">
import type { Activity, ActivityStats } from "~/types";

const props = defineProps<{
  activities: Activity[];
  statsMap: Record<string, ActivityStats>;
}>();

const selectedId = ref(props.activities[0]?.id ?? "");

const selected = computed(() =>
  props.activities.find((a) => a.id === selectedId.value),
);
const stats = computed(() => props.statsMap[selectedId.value]);
</script>

<template>
  <div>
    <h2 class="text-base font-bold text-stone-900 mb-4">Activity Breakdown</h2>

    <!-- Activity Tabs -->
    <div class="flex gap-2 mb-6 flex-wrap">
      <UButton
        v-for="activity in activities"
        :key="activity.id"
        size="sm"
        :color="selectedId === activity.id ? 'neutral' : 'neutral'"
        :variant="selectedId === activity.id ? 'solid' : 'outline'"
        @click="selectedId = activity.id"
      >
        {{ activity.name }}
      </UButton>
    </div>

    <template v-if="stats">
      <!-- Per-Activity Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <UCard>
          <p class="text-[11px] text-stone-500 uppercase tracking-wide mb-1">
            Goal Progress
          </p>
          <p class="text-2xl font-bold text-white">{{ stats.goalProgress }}%</p>
          <UProgress :model-value="stats.goalProgress" size="xs" class="mt-2" />
          <p class="text-[11px] text-stone-500 mt-1">
            {{ stats.totalLogged }} / {{ stats.totalGoal }} hrs
          </p>
        </UCard>
        <UCard>
          <p class="text-[11px] text-stone-500 uppercase tracking-wide mb-1">
            Sessions
          </p>
          <p class="text-2xl font-bold text-white">{{ stats.sessions }}</p>
        </UCard>
        <UCard>
          <p class="text-[11px] text-stone-500 uppercase tracking-wide mb-1">
            Avg Session
          </p>
          <p class="text-2xl font-bold text-white">
            {{ stats.avgSessionMinutes }}m
          </p>
        </UCard>
        <UCard>
          <p class="text-[11px] text-stone-500 uppercase tracking-wide mb-1">
            Focus Rate
          </p>
          <p class="text-2xl font-bold text-white">{{ stats.focusRate }}%</p>
        </UCard>
      </div>

      <!-- Daily Chart -->
      <DailyChart
        :daily-focus="stats.dailyFocus"
        :activity-name="selected?.name ?? ''"
      />
    </template>
  </div>
</template>
