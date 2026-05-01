<script setup lang="ts">
import { authClient } from "../../server/lib/auth-client";
definePageMeta({ layout: false });
const isLoading = ref(false);

async function loginWithGoogle() {
  try {
    isLoading.value = true;
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard", // Where the user goes after logging in
    });
  } catch (error) {
    console.error("Failed to sign in with Google:", error);
    alert("Something went wrong during sign in.");
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-6">
    <UCard class="w-full max-w-sm text-center">
      <div class="py-4">
        <p class="text-lg font-bold text-gray-900 mb-1">Poco</p>
        <p class="text-sm text-gray-500 mb-6">Sign in to continue</p>
        <UButton
          block
          size="lg"
          color="neutral"
          icon="i-lucide-chrome"
          @click="loginWithGoogle"
        >
          Sign in with Google
        </UButton>
      </div>
    </UCard>
  </div>
</template>
