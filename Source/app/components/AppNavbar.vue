<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Activities', to: '/activities' },
  { label: 'Overview', to: '/overview' },
]

const avatarMenuItems = [
  [{ label: 'Profile', icon: 'i-lucide-user' }],
  [{ label: 'Logout', icon: 'i-lucide-log-out' }],
]
</script>

<template>
  <header class="bg-white border-b border-stone-200">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
      <!-- Logo -->
      <NuxtLink to="/dashboard" class="text-base font-bold text-stone-900">
        Poco
      </NuxtLink>

      <!-- Nav Links -->
      <nav class="flex items-center gap-6">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="text-sm transition-colors pb-0.5"
          :class="route.path === item.to
            ? 'text-stone-900 font-semibold border-b-2 border-stone-900'
            : 'text-stone-500 hover:text-stone-700'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Avatar Dropdown -->
      <UDropdownMenu :items="avatarMenuItems">
        <UAvatar src="" alt="User" size="sm" />
      </UDropdownMenu>
    </div>
  </header>
</template>
