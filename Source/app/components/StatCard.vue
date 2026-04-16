<script setup lang="ts">
defineProps<{
  label: string
  value: string
  trend?: number | null
  subtitle?: string | null
}>()
</script>

<template>
  <UCard>
    <div>
      <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
        {{ label }}
      </p>
      <p class="text-3xl font-bold text-gray-900">{{ value }}</p>
      <p v-if="trend != null" class="text-xs mt-1" :class="trend >= 0 ? 'text-green-600' : 'text-red-600'">
        {{ trend >= 0 ? '↑' : '↓' }} {{ Math.abs(trend) }}% vs last month
      </p>
      <p v-else-if="subtitle" class="text-xs text-gray-400 mt-1">
        {{ subtitle }}
      </p>
    </div>
  </UCard>
</template>
