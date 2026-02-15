<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
    <NavBar :isDark="isDark" @toggleDark="toggleDarkMode" />
    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import { useDarkMode } from './composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
</script>