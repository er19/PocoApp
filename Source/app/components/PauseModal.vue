<script setup lang="ts">
const open = defineModel<boolean>('open', { required: true })

defineEmits<{
  resume: []
  pauseAnyway: []
}>()
</script>

<template>
  <UModal v-model:open="open" title="Are you sure?">
    <template #body>
      <p class="text-sm text-gray-500 leading-relaxed">
        Pausing means you're not focusing. This will be recorded in your session history.
      </p>
    </template>
    <template #footer>
      <div class="flex gap-3 justify-end">
        <UButton variant="outline" @click="$emit('resume')">
          Resume
        </UButton>
        <UButton color="error" @click="$emit('pauseAnyway')">
          Pause Anyway
        </UButton>
      </div>
    </template>
  </UModal>
</template>
