<script setup lang="ts">
  defineProps<{
    label: string
    value: string
    icon: string          // e.g. 'i-lucide-clock'
    color?: string        // tailwind color base, e.g. 'primary' | 'indigo' | 'blue' | 'amber'
    delta?: string        // e.g. '18%'
    trend?: 'up' | 'down' | 'flat'
    footnote?: string     // e.g. 'vs. yesterday'
  }>()
  </script>

  <template>
    <UCard :ui="{ body: 'p-4 sm:p-5' }">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">{{ label }}</p>
          <p class="mt-1 text-2xl font-bold tracking-tight">{{ value }}</p>
        </div>
        <div :class="`flex size-9 items-center justify-center rounded-lg bg-${color ?? 'primary'}-50`">
          <UIcon :name="icon" :class="`size-5 text-${color ?? 'primary'}-500`" />
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 text-xs text-gray-400">
        <UBadge
          v-if="delta"
          :color="trend === 'down' ? 'error' : trend === 'flat' ? 'neutral' : 'primary'"
          variant="soft"
          size="sm"
        >
          <UIcon
            :name="trend === 'down' ? 'i-lucide-arrow-down' : trend === 'flat' ? 'i-lucide-minus' : 'i-lucide-arrow-up'"
            class="size-3"
          />
          {{ delta }}
        </UBadge>
        <span>{{ footnote }}</span>
      </div>
    </UCard>
  </template>