<script setup lang="ts">
import type { Activity } from '~/types'

defineProps<{
  activities: Activity[]
}>()

defineEmits<{
  edit: [activity: Activity]
  delete: [activity: Activity]
}>()

function progressPercent(activity: Activity): number {
  if (activity.totalGoal === 0) return 0
  return Math.min(100, Math.round((activity.totalLogged / activity.totalGoal) * 100))
}
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
    <UTable
      :data="activities"
      :columns="[
        { accessorKey: 'name', header: 'Activity' },
        { accessorKey: 'sessionDuration', header: 'Session' },
        { accessorKey: 'totalGoal', header: 'Goal' },
        { accessorKey: 'progress', header: 'Progress' },
        { accessorKey: 'actions', header: '' },
      ]"
    >
      <template #name-cell="{ row }">
        <span class="font-medium">{{ row.original.name }}</span>
      </template>
      <template #sessionDuration-cell="{ row }">
        {{ row.original.sessionDuration }} min
      </template>
      <template #totalGoal-cell="{ row }">
        {{ row.original.totalGoal }} hrs
      </template>
      <template #progress-cell="{ row }">
        <div class="flex items-center gap-2">
          <UProgress
            :model-value="progressPercent(row.original)"
            size="sm"
            :color="progressPercent(row.original) >= 80 ? 'success' : 'neutral'"
            class="flex-1"
          />
          <span class="text-xs text-gray-500 whitespace-nowrap">
            {{ row.original.totalLogged }} / {{ row.original.totalGoal }} hrs
          </span>
        </div>
      </template>
      <template #actions-cell="{ row }">
        <div class="flex gap-3 justify-end">
          <UButton variant="link" size="sm" color="neutral" @click="$emit('edit', row.original)">
            Edit
          </UButton>
          <UButton variant="link" size="sm" color="error" @click="$emit('delete', row.original)">
            Delete
          </UButton>
        </div>
      </template>
    </UTable>
  </div>
</template>
