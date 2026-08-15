<script setup lang="ts">
definePageMeta({ middleware: "auth" })

const { getSession, signOut } = useAuth()
const { data: session } = await useAsyncData("session", async () => {
  const { data } = await getSession()
  return data
})

</script>

<template>
    <div class="mih-h-screen">
        <AppHeader class="px-6 py-4"></AppHeader>
        <UContainer class="bg-muted/30 py-6 px-6 space-y-8 grid w-full mx-auto gap-8">
            <DashboardGreetings/>
            <DashboardAnalysis/>
            <DashboardHistory/>
            <DashboardHistoryChart/>
        </UContainer>

    </div>
</template>

