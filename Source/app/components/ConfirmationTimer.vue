<script setup lang="ts">
defineProps<{
  secondsLeft: number
}>()

defineEmits<{
  confirm: []
}>()
</script>

<template>
  <div class="text-center py-8">
    <p class="text-sm font-semibold text-green-600 mb-2">Session Complete!</p>
    <p class="text-sm text-stone-500 mb-4">
      Confirm within 30 seconds to mark as focused
    </p>
    <p class="text-4xl font-bold text-red-600 tabular-nums mb-5">
      0:{{ String(secondsLeft).padStart(2, '0') }}
    </p>
    <UButton color="success" size="lg" class="px-10" @click="$emit('confirm')">
      Confirm Focused
    </UButton>
  </div>
</template>
