<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen bg-emerald-50/60 dark:bg-[#021018] transition-colors duration-300">
    
    <!-- Show navbar only on non-auth pages -->
    <NavBar
      v-if="!isAuthPage"
      :isDark="isDark"
      @toggleDark="toggleDarkMode"
    />
    
    <main :class="isAuthPage ? '' : 'container mx-auto px-4 py-8'">
      <RouterView />
    </main>

    <!-- Show footer and back to top only on non-auth pages -->
    <template v-if="!isAuthPage">
      <Footer />
      <BackToTop />
    </template>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import BackToTop from './components/BackToTop.vue'
import { useDarkMode } from './composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
const route = useRoute()

const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/register'
})
</script>