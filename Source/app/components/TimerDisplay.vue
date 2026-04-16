<script setup lang="ts">
defineProps<{
  minutes: number
  seconds: number
  activityName: string
  sessionLabel: string
}>()
</script>

<template>
  <div class="text-center py-12">
    <p class="text-8xl font-bold text-gray-900 tabular-nums tracking-tight">
      {{ String(minutes).padStart(2, '0') }}:{{ String(seconds).padStart(2, '0') }}
    </p>
    <p class="text-sm text-gray-500 mt-2">
      {{ activityName }} — {{ sessionLabel }}
    </p>
  </div>
</template>
