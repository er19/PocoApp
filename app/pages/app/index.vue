<script setup lang="ts">
definePageMeta({ middleware: "auth" })

const { getSession, signOut } = useAuth()
const { data: session } = await useAsyncData("session", async () => {
  const { data } = await getSession()
  return data
})

// Only show the Pomodoro once the user is focusing on a task.
const focusTask = useFocusTask()
</script>

<template>
    <div class="mih-h-screen">
        <AppHeader class="px-6 py-4 mx-auto"></AppHeader>
        <main class="bg-muted/30 py-10 px-4 space-y-8">
            <AppCalendar/>
            <AppToDo/>
            <AppPomodoro v-if="focusTask"/>
        </main>

    </div>
</template>

