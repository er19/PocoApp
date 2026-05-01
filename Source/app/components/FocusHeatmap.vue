<script setup lang="ts">
import type { HeatmapDay } from "~/types";

defineProps<{
  days: HeatmapDay[];
}>();

const intensityColors: Record<number, string> = {
  0: "bg-stone-200",
  1: "bg-amber-200",
  2: "bg-amber-400",
  3: "bg-amber-600",
  4: "bg-amber-800",
};
</script>

<template>
  <UCard>
    <template #header>
      <p class="text-sm font-semibold text-stone-500">Focus Heatmap</p>
    </template>
    <div class="flex gap-[3px] flex-wrap">
      <div
        v-for="(day, i) in days"
        :key="i"
        class="w-[11px] h-[11px] rounded-sm"
        :class="intensityColors[day.intensity]"
        :title="`${day.date}: level ${day.intensity}`"
      />
    </div>
    <div
      class="flex items-center gap-1 justify-end mt-2 text-[11px] text-stone-500"
    >
      <span>Less</span>
      <div
        v-for="level in [0, 1, 2, 3, 4]"
        :key="level"
        class="w-[11px] h-[11px] rounded-sm"
        :class="intensityColors[level]"
      />
      <span>More</span>
    </div>
  </UCard>
</template>
