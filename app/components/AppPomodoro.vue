<template>
  <div class="grid max-w-3xl mx-auto">
    <!--
    <UCard class="h-full"
      :style="{ backgroundColor: currentMode.bg }"
    >-->
    <UCard class="h-full"
    >
      <template #header>
        <header class="flex items-center justify-between">
          <span class="text-white text-lg font-semibold">Pomodoro</span>
        </header>
      </template>

      <!-- Main -->
      <main class="px-6 pb-10 flex flex-col items-center gap-8">
        <!-- Mode tabs -->
        <div class="flex gap-1 bg-white/10 rounded-full p-1">
          <button
            v-for="mode in modes"
            :key="mode.key"
            class="px-5 py-2 rounded-full text-sm font-medium transition-all"
            :class="activeMode === mode.key
              ? 'bg-white/20 text-white shadow'
              : 'text-white/70 hover:text-white hover:bg-white/10'"
            @click="switchMode(mode.key)"
          >
            {{ mode.label }}
          </button>
        </div>

        <!-- Timer display (click to set the duration) -->
        <div class="flex flex-col items-center gap-6">
          <button
            v-if="!editingTime"
            type="button"
            :disabled="running"
            class="text-[7rem] sm:text-[9rem] font-bold text-white leading-none tabular-nums drop-shadow-lg select-none transition-opacity enabled:hover:opacity-80 disabled:cursor-default"
            :title="running ? '' : 'Click to set the timer'"
            @click="startEditTime"
          >
            {{ formattedTime }}
          </button>
          <div
            v-else
            class="flex items-center text-[7rem] sm:text-[9rem] font-bold text-white leading-none tabular-nums drop-shadow-lg"
            @focusout="onEditFocusOut"
          >
            <input
              ref="minuteInput"
              v-model="editMinutes"
              type="text"
              inputmode="numeric"
              maxlength="2"
              class="w-[2ch] bg-transparent text-right text-white focus:outline-none caret-white"
              @focus="selectAll"
              @keydown.enter="commitEditTime"
              @keydown.escape="cancelEditTime"
            >
            <span>:</span>
            <input
              v-model="editSeconds"
              type="text"
              inputmode="numeric"
              maxlength="2"
              class="w-[2ch] bg-transparent text-left text-white focus:outline-none caret-white"
              @focus="selectAll"
              @keydown.enter="commitEditTime"
              @keydown.escape="cancelEditTime"
            >
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-4">
            <button
              class="px-14 py-4 bg-white/20 rounded-full text-lg font-bold shadow-lg transition-all active:scale-95 hover:shadow-xl"
              @click="toggleTimer"
            >
              {{ running ? 'PAUSE' : 'START' }}
            </button>
            <button
              v-if="running"
              class="text-white/70 hover:text-white transition-colors"
              title="Skip"
              @click="skip"
            >
              <UIcon name="i-heroicons-forward" class="w-7 h-7" />
            </button>
          </div>

        </div>
      </main>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const modes = [
  { key: 'focus', label: 'Focus', bg: '#c1392b' },
  { key: 'break', label: 'Break', bg: '#16a085' },
] as const

type ModeKey = typeof modes[number]['key']

const settings = reactive({ focus: 25, break: 5 })

const activeMode = ref<ModeKey>('focus')
const currentMode = computed(() => modes.find(m => m.key === activeMode.value)!)
const timeLeft = ref(settings.focus * 60)
const running = ref(false)
const round = ref(1)

let interval: ReturnType<typeof setInterval> | null = null

const formattedTime = computed(() => {
  const m = Math.floor(timeLeft.value / 60).toString().padStart(2, '0')
  const s = (timeLeft.value % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})

function toggleTimer() {
  running.value ? pause() : start()
}

function start() {
  running.value = true
  interval = setInterval(() => {
    if (timeLeft.value <= 0) {
      clearInterval(interval!)
      running.value = false
      onTimerEnd()
    } else {
      timeLeft.value--
    }
  }, 1000)
}

function pause() {
  running.value = false
  if (interval) clearInterval(interval)
}

function skip() {
  pause()
  onTimerEnd()
}

function onTimerEnd() {
  if (activeMode.value === 'focus') {
    round.value++
    switchMode('break')
  } else {
    switchMode('focus')
  }
}

function switchMode(key: ModeKey) {
  pause()
  activeMode.value = key
  timeLeft.value = settings[key] * 60
}

// Set the timer duration by editing the clock directly.
const editingTime = ref(false)
const editMinutes = ref('')
const editSeconds = ref('')
const minuteInput = ref<HTMLInputElement | null>(null)

async function startEditTime() {
  if (running.value) return
  editMinutes.value = Math.floor(timeLeft.value / 60).toString().padStart(2, '0')
  editSeconds.value = (timeLeft.value % 60).toString().padStart(2, '0')
  editingTime.value = true
  await nextTick()
  minuteInput.value?.focus()
}

function commitEditTime() {
  const m = Math.min(99, Math.max(0, parseInt(editMinutes.value, 10) || 0))
  const s = Math.min(59, Math.max(0, parseInt(editSeconds.value, 10) || 0))
  const total = m * 60 + s
  timeLeft.value = total
  // Remember this as the default for the current mode (whole minutes).
  settings[activeMode.value] = Math.max(1, Math.round(total / 60))
  editingTime.value = false
}

function cancelEditTime() {
  editingTime.value = false
}

// Commit only when focus leaves the whole MM:SS group (not when tabbing between fields).
function onEditFocusOut(e: FocusEvent) {
  const next = e.relatedTarget as Node | null
  if (next && (e.currentTarget as HTMLElement).contains(next)) return
  commitEditTime()
}

function selectAll(e: FocusEvent) {
  (e.target as HTMLInputElement).select()
}

// Tasks
interface Task { id: number; text: string; done: boolean }
const tasks = ref<Task[]>([])
const addingTask = ref(false)
const newTaskText = ref('')
const taskInput = ref<HTMLInputElement | null>(null)
let nextId = 1

const completedCount = computed(() => tasks.value.filter(t => t.done).length)

async function startAddTask() {
  addingTask.value = true
  await nextTick()
  taskInput.value?.focus()
}

function addTask() {
  const text = newTaskText.value.trim()
  if (!text) return
  tasks.value.push({ id: nextId++, text, done: false })
  newTaskText.value = ''
  taskInput.value?.focus()
}

function removeTask(id: number) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

// Focus integration: a to-do sent over from the To-Do List on the same page.
const focusTask = useFocusTask()

function clearFocus() {
  focusTask.value = null
}

// Load the focused to-do's subtasks as the working checklist and start the timer.
function loadFocus() {
  if (!focusTask.value) return
  tasks.value = focusTask.value.subtasks.map(s => ({ id: nextId++, text: s.text, done: s.done }))
  switchMode('focus')
  start()
}

// React whenever a (new) task is focused from the to-do list.
watch(() => focusTask.value?.id, (id) => {
  if (id != null) loadFocus()
})

onMounted(() => {
  if (focusTask.value) loadFocus()
})

onUnmounted(() => { if (interval) clearInterval(interval) })
</script>

<style scoped>
.task-enter-active, .task-leave-active {
  transition: all 0.2s ease;
}
.task-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
.task-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
