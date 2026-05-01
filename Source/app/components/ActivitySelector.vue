<script setup lang="ts">
import type { Activity } from '~/types'

defineProps<{
  activities: Activity[]
  selected: Activity | null
}>()

defineEmits<{
  select: [activity: Activity]
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <USelectMenu
      :model-value="selected"
      :items="activities"
      value-key="id"
      label-key="name"
      placeholder="Select an activity"
      class="w-64"
      @update:model-value="$emit('select', $event)"
    />
    <p v-if="selected" class="text-xs text-stone-500">
      Session duration: {{ selected.sessionDuration }} min
    </p>
  </div>
</template>
