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
        <UMain class="bg-muted/30 py-10 px-4 space-y-8 grid ">
            <DashboardGreetings/>
            <DashboardAnalysis/>
            <DashboardHistory/>
            <DashboardHistoryChart/>
        </UMain>

    </div>
</template>

