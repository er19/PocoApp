<script setup lang="ts">
import type { Activity } from '~/types'
import { mockActivities } from '~/data/mock'

const activities = ref([...mockActivities])
const showModal = ref(false)
const editingActivity = ref<Activity | null>(null)

function handleAdd() {
  editingActivity.value = null
  showModal.value = true
}

function handleEdit(activity: Activity) {
  editingActivity.value = activity
  showModal.value = true
}

function handleDelete(activity: Activity) {
  activities.value = activities.value.filter(a => a.id !== activity.id)
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 pt-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-gray-900">Activities</h1>
      <UButton color="neutral" @click="handleAdd">
        + Add Activity
      </UButton>
    </div>

    <!-- Table -->
    <ActivityTable
      :activities="activities"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <!-- Modal -->
    <ActivityModal
      v-model:open="showModal"
      :activity="editingActivity"
    />
  </div>
</template>
