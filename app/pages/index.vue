<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <!-- Navbar -->
    <header class="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <span class="text-lg font-semibold tracking-tight">Poco</span>
        <!-- Desktop nav -->
        <nav class="hidden sm:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <a href="#features" class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Features</a>
          <a href="#about" class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">About</a>
          <a href="#contact" class="hover:text-gray-900 dark:hover:text-gray-100" @click="menuOpen = false">Contact</a>
        </nav>
        <!-- Mobile menu button -->
        <UButton
          class="sm:hidden"
          variant="ghost"
          icon="i-heroicons-bars-3"
          @click="menuOpen = !menuOpen"
        />
        <!-- Dark mode toggle -->
        <UButton
          class="hidden sm:flex"
          variant="ghost"
          :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
          @click="isDark = !isDark"
        />
      </div>
      <!-- Mobile dropdown -->
      <div v-if="menuOpen" class="sm:hidden border-t border-gray-100 dark:border-gray-800 px-4 py-3 flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-400">
        <a href="#features" class="hover:text-gray-900 dark:hover:text-gray-100" @click="menuOpen = false">Features</a>
        <a href="#about" class="hover:text-gray-900 dark:hover:text-gray-100" @click="menuOpen = false">About</a>
        <a href="#contact" class="hover:text-gray-900 dark:hover:text-gray-100" @click="menuOpen = false">Contact</a>
      </div>
    </header>

    <main>
      <!-- Hero -->
      <section class="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
        <UBadge label="Now available" variant="soft" class="mb-6" />
        <h1 class="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
          Poco
        </h1>
        <p class="mt-6 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          All in one study tools
        </p>
        <UButton size="xl" class="mt-6 mx-auto" label="Try it out!" to="/login"/>
      </section>

      <!-- Features -->
      <section id="features" class="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">Why we are different</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <UCard v-for="feature in features" :key="feature.title">
            <div class="flex flex-col gap-2">
              <UIcon :name="feature.icon" class="text-2xl text-primary-500" />
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ feature.title }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ feature.desc }}</p>
            </div>
          </UCard>
        </div>
      </section>

      <!-- About -->
      <section id="about" class="bg-gray-50 dark:bg-gray-900">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">About this project</h2>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
              This project is for creating a dashboard-like platform for organizing task in a study session. It is designed for avoiding overplanning and distraction. With this app, there is no need for coordinating multiple tabs for study tools, such us pomodoro timer, to do list and music.
            </p>
            <p class="mt-4 text-gray-500 dark:text-gray-400 leading-relaxed">
              It is for anyone who struggles to focus and need distraction-free solution for their productivity
            </p>
          </div>
          <div class="rounded-2xl bg-gray-200 dark:bg-gray-800 h-48 sm:h-64 flex items-center justify-center text-gray-400 dark:text-gray-600 text-sm">
            Image placeholder
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div class="max-w-md mx-auto text-center">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Get in touch</h2>
          <p class="text-gray-500 dark:text-gray-400 mb-8">Have a question or suggestion? Send us a message and we'll get back to you.</p>
          <div class="flex flex-col gap-3">
            <UInput placeholder="Your name" size="lg" />
            <UInput placeholder="your@email.com" type="email" size="lg" />
            <UTextarea placeholder="Your message..." :rows="4" />
            <UButton label="Send message" size="lg" block />
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-100 dark:border-gray-800">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between text-sm text-gray-400">
        <span>er19</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false)
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (val) => { colorMode.preference = val ? 'dark' : 'light' }
})

const features = [
  {
    icon: 'i-heroicons-bolt',
    title: 'All-in-one',
    desc: 'Pomodoro timer and to-do-list are integrated in one single page'
  },
  {
    icon: 'i-heroicons-device-phone-mobile',
    title: 'Avoiding overplanning',
    desc: 'Guided step-by-step task planning and task execution'
  },
  {
    icon: 'i-heroicons-device-phone-mobile',
    title: 'Access it anywhere',
    desc: 'Web-based app that can be open everywhere'
  }
]
</script>
