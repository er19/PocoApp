<script setup lang="ts">
import { signIn } from "../../server/lib/auth-client";
definePageMeta({ layout: false })
function sign_in(){
  async () => await signIn.social({
    provider: "google", // or "github", "apple", etc.
    callbackURL: "/dashboard", // where to go after login
  });
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-6">
    <UCard class="w-full max-w-sm text-center">
      <div class="py-4">
        <p class="text-lg font-bold text-gray-900 mb-1">Poco</p>
        <p class="text-sm text-gray-500 mb-6">Sign in to continue</p>
        <UButton block size="lg" color="neutral" icon="i-lucide-chrome" @click="sign_in">
          Sign in with Google
        </UButton>
      </div>
    </UCard>
  </div>
</template>
