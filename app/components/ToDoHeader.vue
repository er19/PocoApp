<template>
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-lg font-semibold text-highlighted">To-do list</h1>
            <p class="text-sm text-muted">{{ completedCount }} of {{ total }} done</p>
        </div>
        <!-- Toggle edit mode; unavailable while a focus session is running. -->
        <UButton
          :color="isEdit ? 'primary' : 'neutral'"
          :variant="isEdit ? 'solid' : 'ghost'"
          size="sm"
          icon="i-heroicons-pencil-square"
          :label="isEdit ? 'Done' : 'Edit'"
          :disabled="focusing"
          :title="focusing ? 'Finish your focus session to edit' : 'Edit tasks'"
          @click="emit('toggle-edit')"
        />
    </div>
</template>
<script setup lang="ts">
defineProps<{
  completedCount: number
  total: number
  remaining: number
  allDone: boolean
  isEdit: boolean
  focusing: boolean
}>()

const emit = defineEmits<{ 'toggle-edit': [] }>()
</script>