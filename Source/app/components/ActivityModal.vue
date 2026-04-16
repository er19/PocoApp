<script setup lang="ts">
import type { Activity } from '~/types'

const open = defineModel<boolean>('open', { required: true })

const props = defineProps<{
  activity?: Activity | null
}>()

const isEditing = computed(() => !!props.activity)

const name = ref('')
const sessionDuration = ref(25)
const totalGoal = ref(20)

watch(() => props.activity, (val) => {
  if (val) {
    name.value = val.name
    sessionDuration.value = val.sessionDuration
    totalGoal.value = val.totalGoal
  } else {
    name.value = ''
    sessionDuration.value = 25
    totalGoal.value = 20
  }
}, { immediate: true })
</script>

<template>
  <UModal v-model:open="open" :title="isEditing ? 'Edit Activity' : 'Add Activity'">
    <template #body>
      <div class="space-y-4">
        <UFormField label="Activity Name">
          <UInput v-model="name" placeholder="e.g., Learn Rust" class="w-full" />
        </UFormField>
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Session Duration (min)">
            <UInputNumber v-model="sessionDuration" :min="1" class="w-full" />
          </UFormField>
          <UFormField label="Total Goal (hours)">
            <UInputNumber v-model="totalGoal" :min="1" class="w-full" />
          </UFormField>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-3 justify-end">
        <UButton variant="outline" @click="open = false">Cancel</UButton>
        <UButton color="neutral" @click="open = false">Save Activity</UButton>
      </div>
    </template>
  </UModal>
</template>
