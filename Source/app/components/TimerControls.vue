<script setup lang="ts">
defineProps<{
  state: 'idle' | 'running' | 'paused' | 'completed'
}>()

defineEmits<{
  start: []
  pause: []
  confirm: []
}>()
</script>

<template>
  <div class="text-center">
    <UButton
      v-if="state === 'idle' || state === 'paused'"
      size="lg"
      color="neutral"
      class="px-12"
      @click="$emit('start')"
    >
      Start
    </UButton>
    <UButton
      v-else-if="state === 'running'"
      size="lg"
      color="error"
      class="px-12"
      @click="$emit('pause')"
    >
      Pause
    </UButton>
    <UButton
      v-else-if="state === 'completed'"
      size="lg"
      color="success"
      class="px-12"
      @click="$emit('confirm')"
    >
      Confirm Focused
    </UButton>
  </div>
</template>
