<script setup lang="ts">
definePageMeta({ middleware: "guest"})

const { signInWithGoogle } = useAuth()

async function loginWithGoogle() {
  try {
    await signInWithGoogle()
  } catch (error) {
    console.error("Failed to sign in with Google:", error);
    alert("Something went wrong during sign in.");
  }
}
</script>

<template>
  <div class="min-h-screen bg-stone-50 flex items-center justify-center px-6">
    <UCard class="w-full max-w-sm text-center">
      <div class="py-4">
        <p class="text-lg font-bold text-gray-300 mb-1">Poco</p>
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
