<template>
  <!-- The whole task row is the clickable trigger; no dropdown -->
  <div
    class="flex items-center gap-3 py-1.5 px-2 -mx-2 rounded-md group transition-colors cursor-pointer"
    :class="[
      selected ? 'bg-primary/10 ring-1 ring-primary/40' : 'hover:bg-muted/50',
    ]"
    @click="emit('select')"
  >
    <UCheckbox v-model="todo.done" @click.stop />
    <UButton
      color="neutral"
      variant="ghost"
      class="flex-1 justify-between"
      :class="todo.done ? 'line-through text-muted' : 'text-default'"
      @click.stop="emit('select')"
    >
      <span class="truncate">{{ todo.text }}</span>
      <template v-if="todo.subtasks.length" #leading>
        <UBadge color="neutral" variant="subtle" size="sm">
          {{ doneSubtasks }}/{{ todo.subtasks.length }}
        </UBadge>
      </template>
    </UButton>

    <!-- Edit mode: delete -->
    <UButton
      v-if="isEdit"
      color="error"
      variant="ghost"
      size="xs"
      icon="i-heroicons-trash"
      class="opacity-0 group-hover:opacity-100 transition-opacity"
      @click.stop="emit('remove')"
    />
  </div>
</template>


<script setup lang="ts">
interface Todo {
  id: number
  text: string
  done: boolean
  subtasks: Subtask[]
}

interface Subtask {
  id: number
  text: string
  done: boolean
}

const props = defineProps<{
  todo: Todo
  isEdit: boolean
  selected: boolean
}>()

const emit = defineEmits<{
  remove: []
  select: []
}>()

const doneSubtasks = computed(() => props.todo.subtasks.filter(s => s.done).length)
</script>
