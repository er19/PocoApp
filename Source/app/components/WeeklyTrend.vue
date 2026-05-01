<script setup lang="ts">
import type { WeeklyData } from "~/types";

const props = defineProps<{
  weeks: WeeklyData[];
}>();

const maxHours = computed(() => Math.max(...props.weeks.map((w) => w.hours)));

function barHeight(hours: number): string {
  return `${(hours / maxHours.value) * 100}%`;
}
</script>

<template>
  <UCard>
    <template #header>
      <p class="text-sm font-semibold text-stone-500">Weekly Focus Trend</p>
    </template>
    <div class="flex items-end gap-1 h-36 border-b border-stone-200 pb-1">
      <div
        v-for="(week, i) in weeks"
        :key="week.week"
        class="flex-1 rounded-t"
        :class="i >= weeks.length - 2 ? 'bg-amber-500' : 'bg-stone-400'"
        :style="{ height: barHeight(week.hours) }"
        :title="`${week.week}: ${week.hours}h`"
      />
    </div>
    <div class="flex gap-1 mt-1">
      <span
        v-for="week in weeks"
        :key="week.week"
        class="flex-1 text-center text-[10px] text-stone-500"
      >
        {{ week.week }}
      </span>
    </div>
  </UCard>
</template>
