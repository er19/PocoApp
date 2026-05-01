<script setup lang="ts">
const props = defineProps<{
  dailyFocus: number[];
  activityName: string;
}>();

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxMinutes = computed(() => Math.max(...props.dailyFocus, 1));

function barHeight(minutes: number): string {
  return `${(minutes / maxMinutes.value) * 100}%`;
}
</script>

<template>
  <UCard>
    <template #header>
      <p class="text-sm font-semibold text-stone-500">
        Daily Focus — {{ activityName }}
      </p>
    </template>
    <div class="flex items-end gap-2 h-24 border-b border-stone-200 pb-1">
      <div
        v-for="(minutes, i) in dailyFocus"
        :key="i"
        class="flex-1 rounded-t"
        :class="minutes > 0 ? 'bg-amber-500' : 'bg-stone-200'"
        :style="{ height: minutes > 0 ? barHeight(minutes) : '4px' }"
        :title="`${dayLabels[i]}: ${minutes} min`"
      />
    </div>
    <div class="flex gap-2 mt-1">
      <span
        v-for="label in dayLabels"
        :key="label"
        class="flex-1 text-center text-[11px] text-stone-500"
      >
        {{ label }}
      </span>
    </div>
  </UCard>
</template>
