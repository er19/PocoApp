<script setup lang="ts">
import type { Session } from '~/types'

defineProps<{
  sessions: Session[]
}>()

const statusColor: Record<Session['status'], string> = {
  focused: 'success',
  paused: 'warning',
  unfocused: 'error',
}

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}
</script>

<template>
  <div>
    <h3 class="text-sm font-semibold text-gray-900 mb-3">Recent Sessions</h3>
    <UTable
      :data="sessions"
      :columns="[
        { accessorKey: 'activityName', header: 'Activity' },
        { accessorKey: 'duration', header: 'Duration' },
        { accessorKey: 'status', header: 'Status' },
        { accessorKey: 'timestamp', header: 'Time' },
      ]"
    >
      <template #duration-cell="{ row }">
        {{ row.original.duration }} min
      </template>
      <template #status-cell="{ row }">
        <UBadge :color="statusColor[row.original.status]" variant="subtle" size="sm">
          {{ row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1) }}
        </UBadge>
      </template>
      <template #timestamp-cell="{ row }">
        <span class="text-gray-400">{{ formatTime(row.original.timestamp) }}</span>
      </template>
    </UTable>
  </div>
</template>
