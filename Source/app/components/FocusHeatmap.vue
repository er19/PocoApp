<script setup lang="ts">
import type { HeatmapDay } from '~/types'

defineProps<{
  days: HeatmapDay[]
}>()

const intensityColors: Record<number, string> = {
  0: 'bg-gray-100',
  1: 'bg-gray-300',
  2: 'bg-gray-400',
  3: 'bg-gray-600',
  4: 'bg-gray-900',
}
</script>

<template>
  <UCard>
    <template #header>
      <p class="text-sm font-semibold text-gray-900">Focus Heatmap</p>
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
    <div class="flex items-center gap-1 justify-end mt-2 text-[11px] text-gray-400">
      <span>Less</span>
      <div v-for="level in [0, 1, 2, 3, 4]" :key="level" class="w-[11px] h-[11px] rounded-sm" :class="intensityColors[level]" />
      <span>More</span>
    </div>
  </UCard>
</template>
