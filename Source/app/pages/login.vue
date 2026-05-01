<script setup lang="ts">
definePageMeta({ layout: false })
</script>

<template>
  <div class="min-h-screen bg-stone-50 flex items-center justify-center px-6">
    <UCard class="w-full max-w-sm text-center">
      <div class="py-4">
        <p class="text-lg font-bold text-stone-900 mb-1">Poco</p>
        <p class="text-sm text-stone-500 mb-6">Sign in to continue</p>
        <UButton block size="lg" color="neutral" icon="i-lucide-chrome">
          Sign in with Google
        </UButton>
      </div>
    </UCard>
  </div>
</template>
