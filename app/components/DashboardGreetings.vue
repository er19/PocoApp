<script setup lang="ts">
const props = defineProps({
  datetime: { type: [Number, String, Date], default: () => Date.now() },
})

const timeZone = ref('UTC')
onMounted(() => {
  timeZone.value = Intl.DateTimeFormat().resolvedOptions().timeZone
})

const partOfDay = computed(() => {
  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hourCycle: 'h23',
      timeZone: timeZone.value,
    }).format(new Date(props.datetime))
  )

  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  if (hour < 21) return 'evening'
  return 'night'
})

import type {NavigationMenuItem} from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
    {
        label: 'Day'
    },
    {
        label:'Week'
    },
    {
        label:'Month'
    }])
</script>
<template>
    <div class="flex justify-between ">
        <div>
            <h2 class="text-2xl">Good {{ partOfDay }}, (name of user)</h2>
            <NuxtTime class=""
                :datetime="Date.now()"
                year="numeric"
                month="long"
                day="numeric"/>
        </div>
        <UNavigationMenu :items="items"/>
    </div>
</template>