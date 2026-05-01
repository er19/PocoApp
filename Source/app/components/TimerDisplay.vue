<script setup lang="ts">
const props = defineProps<{
  totaltime: number;
  minutes: number;
  seconds: number;
  activityName: string;
  sessionLabel: string;
  editable?: boolean;
}>();

const emit = defineEmits<{
  'update:minutes': [value: number];
  'update:seconds': [value: number];
}>();

const editingMinutes = ref(false);
const editingSeconds = ref(false);
const minuteInput = ref<HTMLInputElement>();
const secondInput = ref<HTMLInputElement>();
const minuteValue = ref('');
const secondValue = ref('');

function startEditMinutes() {
  if (!props.editable) return;
  minuteValue.value = String(props.minutes);
  editingMinutes.value = true;
  nextTick(() => minuteInput.value?.select());
}

function startEditSeconds() {
  if (!props.editable) return;
  secondValue.value = String(props.seconds);
  editingSeconds.value = true;
  nextTick(() => secondInput.value?.select());
}

function commitMinutes() {
  editingMinutes.value = false;
  const val = Math.max(0, Math.min(99, parseInt(minuteValue.value) || 0));
  emit('update:minutes', val);
}

function commitSeconds() {
  editingSeconds.value = false;
  const val = Math.max(0, Math.min(59, parseInt(secondValue.value) || 0));
  emit('update:seconds', val);
}
</script>

<template>
  <div class="text-center py-12">
    <div class="flex items-center justify-center gap-1">
      <!-- Minutes -->
      <input
        v-if="editingMinutes"
        ref="minuteInput"
        v-model="minuteValue"
        type="number"
        min="0"
        max="99"
        class="w-32 text-8xl font-bold text-stone-900 tabular-nums tracking-tight text-center bg-transparent border-b-2 border-stone-400 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        @blur="commitMinutes"
        @keydown.enter="commitMinutes"
      />
      <span
        v-else
        class="text-8xl font-bold tabular-nums tracking-tight"
        :class="editable ? 'text-stone-900 cursor-pointer hover:text-primary-600 transition-colors' : 'text-stone-900'"
        @click="startEditMinutes"
      >
        {{ String(minutes).padStart(2, "0") }}
      </span>

      <span class="text-8xl font-bold text-stone-900 tracking-tight">:</span>

      <!-- Seconds -->
      <input
        v-if="editingSeconds"
        ref="secondInput"
        v-model="secondValue"
        type="number"
        min="0"
        max="59"
        class="w-32 text-8xl font-bold text-stone-900 tabular-nums tracking-tight text-center bg-transparent border-b-2 border-stone-400 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        @blur="commitSeconds"
        @keydown.enter="commitSeconds"
      />
      <span
        v-else
        class="text-8xl font-bold tabular-nums tracking-tight"
        :class="editable ? 'text-stone-900 cursor-pointer hover:text-primary-600 transition-colors' : 'text-stone-900'"
        @click="startEditSeconds"
      >
        {{ String(seconds).padStart(2, "0") }}
      </span>
    </div>
    <p v-if="editable" class="text-xs text-stone-500 mt-1">click to edit</p>
    <p class="text-sm text-stone-500 mt-2">
      {{ activityName }} — {{ sessionLabel }}
    </p>
  </div>
</template>
