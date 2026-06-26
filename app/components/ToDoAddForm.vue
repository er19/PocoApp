<template>
    <form  class="flex gap-2" @submit.prevent="submit">
          <UInput
            v-model="newToDo"
            placeholder="What needs doing?"
            icon="i-heroicons-pencil"
            class="flex-1"
            autofocus
          />
          <UButton type="submit" icon="i-heroicons-plus" :disabled="!newToDo.trim()">
            Add
          </UButton>
        </form>
</template>
<script setup lang="ts">
const props = defineProps<{
  total: number
}>()

const emit = defineEmits<{ add: [text: string] }>()
const toast = useToast()
const newToDo = ref('')

function submit() {
  if(props.total>5){
    toast.add({
    title: 'Too much task per session',
    description: 'Lets focus on 5 task per session.',
  })
  }else{
    const value = newToDo.value.trim()
    if (!value) return
    emit('add', value)
    newToDo.value = ''
  }
  
}
</script>