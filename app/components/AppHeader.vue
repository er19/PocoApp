<script setup lang="ts">
import type { DropdownMenuItem} from '@nuxt/ui'
const {signOut}= useAuth()
const items = ref<DropdownMenuItem[]>([
    {
        label: 'Account',
        icon: 'i-lucide-user'
    },
    {
        label: 'Settings',
        icon: 'i-lucide-settings'
    },
    {
        label: 'Log Out',
        icon: 'i-lucide-log-out',
        onSelect: signOut
    }])
</script>
<template>
    <UHeader title="Poco">
        <template #right>
            <UDropdownMenu :items="items">
                <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
            </UDropdownMenu>
        </template>
    </UHeader>
</template>
        