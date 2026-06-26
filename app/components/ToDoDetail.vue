<template>
  <UCard class="h-full">
    <!-- Header: the task -->
    <template v-if="todo" #header>
      <div class="flex items-start gap-3">
        <UCheckbox v-model="todo.done" class="mt-1" />
        <div class="min-w-0">
          <h2
            class="text-base font-semibold"
            :class="todo.done ? 'line-through text-muted' : 'text-highlighted'"
          >
            {{ todo.text }}
          </h2>
          <p class="text-xs text-muted mt-0.5">
            {{ doneSubtasks }}/{{ todo.subtasks.length }} subtasks done
          </p>
        </div>
      </div>
    </template>

    <!-- Nothing selected -->
    <div
      v-if="!todo"
      class="h-full flex flex-col items-center justify-center text-center py-12 text-muted"
    >
      <UIcon name="i-heroicons-cursor-arrow-rays" class="size-8 mb-2" />
      <p class="text-sm">Select a task to see its details.</p>
    </div>

    <!-- Middle: the subtasks -->
    <div v-else class="space-y-2">
      <h3 class="text-xs font-medium uppercase tracking-wide text-muted">Subtasks</h3>

      <ul v-if="todo.subtasks.length" class="space-y-1.5">
        <li
          v-for="sub in todo.subtasks"
          :key="sub.id"
          class="flex items-center gap-2.5 group/sub"
        >
          <UCheckbox v-model="sub.done" size="sm" />
          <span
            class="flex-1 text-sm"
            :class="sub.done ? 'line-through text-muted' : 'text-default'"
          >
            {{ sub.text }}
          </span>
          <UButton
            v-if="isEdit"
            color="error"
            variant="ghost"
            size="xs"
            icon="i-heroicons-x-mark"
            class="opacity-0 group-hover/sub:opacity-100 transition-opacity"
            @click="emit('removeSubtask', sub.id)"
          />
        </li>
      </ul>
      <p v-else class="text-xs text-muted">No subtasks yet.</p>

      <form v-if="isEdit" class="flex gap-2 pt-1" @submit.prevent="submitSubtask">
        <UInput
          v-model="newSubtask"
          placeholder="Add a subtask…"
          size="sm"
          class="flex-1"
        />
        <UButton
          type="submit"
          size="sm"
          variant="soft"
          icon="i-heroicons-plus"
          :disabled="!newSubtask.trim()"
        />
      </form>
    </div>

    <!-- Footer: focus action -->
    <template v-if="todo" #footer>
      <UButton
        block
        icon="i-heroicons-play"
        label="Focus on this task"
        @click="emit('focus')"
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
interface Subtask {
  id: number
  text: string
  done: boolean
}

interface Todo {
  id: number
  text: string
  done: boolean
  subtasks: Subtask[]
}

const props = defineProps<{
  todo: Todo | null
  isEdit: boolean
}>()

const emit = defineEmits<{
  addSubtask: [text: string]
  removeSubtask: [id: number]
  focus: []
}>()

const newSubtask = ref('')

const doneSubtasks = computed(() => props.todo?.subtasks.filter(s => s.done).length ?? 0)

function submitSubtask() {
  const value = newSubtask.value.trim()
  if (!value) return
  emit('addSubtask', value)
  newSubtask.value = ''
}
</script>
