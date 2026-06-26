<template>
    <div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-w-3xl mx-auto">
        <!-- Left: the task list -->
        <UCard class="h-full">
            <template #header>
                <ToDoHeader
                  :completed-count="completedCount"
                  :total="todos.length"
                  :remaining="remainingCount"
                  :all-done="allDone"
                  :is-edit="isEdit"
                  :focusing="!!focusTask"
                  @toggle-edit="editing = !editing"
                />
            </template>
            <div class="space-y-4">
              <!-- Add a task -->
              <ToDoAddForm
                :total="todos.length"
                v-if="isEdit"
                @add="addTodo"
              />

              <!-- Empty state -->
              <p v-if="!todos.length" class="text-center text-sm text-muted py-6">
                Nothing here yet — add your first task above.
              </p>

              <!-- Task rows -->
              <ul v-else class="divide-y divide-default">
                <li v-for="todo in todos" :key="todo.id" class="py-1">
                  <ToDoItem
                    :todo="todo"
                    :is-edit="isEdit"
                    :selected="selectedId === todo.id"
                    @remove="removeTodo(todo.id)"
                    @select="selectedId = todo.id"
                  />
                </li>
              </ul>
            </div>
        </UCard>

        <!-- Right: detail of the selected task -->
        <ToDoDetail
          :todo="selectedTodo"
          :is-edit="isEdit"
          @add-subtask="(text:string) => selectedTodo && addSubtask(selectedTodo, text)"
          @remove-subtask="(id:number) => selectedTodo && removeSubtask(selectedTodo, id)"
          @focus="startFocus"
        />
    </div>
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

const selectedId = ref<number | null>(null)
const focusTask = useFocusTask()

// Edit mode is an explicit toggle (the Edit button in the header). While a focus
// session is running the list is forced read-only regardless of the toggle.
const editing = ref(false)
const isEdit = computed(() => editing.value && !focusTask.value)

// Leaving a focus session shouldn't silently drop you back into edit mode.
watch(focusTask, (task) => {
  if (task) editing.value = false
})
const todos = ref<Todo[]>([
  { id: 1, text: 'Read the Nuxt UI docs', done: true, subtasks: [] },
  {
    id: 2,
    text: 'Build a to-do list with UCard',
    done: false,
    subtasks: [
      { id: 1, text: 'Lay out the card', done: true },
      { id: 2, text: 'Add collapsible subtasks', done: false },
    ],
  },
  { id: 3, text: 'Ship it', done: false, subtasks: [] },
])
let nextId = 4
let nextSubId = 3

const completedCount = computed(() => todos.value.filter(t => t.done).length)
const remainingCount = computed(() => todos.value.length - completedCount.value)
const allDone = computed(() => todos.value.length > 0 && remainingCount.value === 0)
const selectedTodo = computed(() => todos.value.find(t => t.id === selectedId.value) ?? null)

// Entering edit mode with nothing selected leaves the detail panel empty,
// so fall back to the first task so there's always something to edit.
watch(isEdit, (active) => {
  if (active && selectedId.value === null && todos.value.length) {
    selectedId.value = todos.value[0]!.id
  }
})

function startFocus() {
  if (!selectedTodo.value) return
  focusTask.value = {
    id: selectedTodo.value.id,
    text: selectedTodo.value.text,
    subtasks: selectedTodo.value.subtasks.map(s => ({ text: s.text, done: s.done })),
  }
}

function addTodo(text: string) {
  todos.value.push({ id: nextId++, text, done: false, subtasks: [] })
}

function addSubtask(todo: Todo, text: string) {
  todo.subtasks.push({ id: nextSubId++, text, done: false })
}

function removeSubtask(todo: Todo, id: number) {
  todo.subtasks = todo.subtasks.filter(s => s.id !== id)
}

function removeTodo(id: number) {
  todos.value = todos.value.filter(t => t.id !== id)
  if (selectedId.value === id) selectedId.value = null
  if (focusTask.value?.id === id) focusTask.value = null
}
</script>