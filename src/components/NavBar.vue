<template>
  <nav class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm dark:shadow-gray-800 transition-colors duration-300">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">

      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 group">
        <div class="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
          <span class="text-white font-bold text-sm">S</span>
        </div>
        <span class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">ShopVue</span>
      </RouterLink>

      <!-- Right Side -->
      <div class="flex items-center gap-3">

        <!-- Home Link -->
        <RouterLink
          to="/"
          class="hidden md:block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          Home
        </RouterLink>

        <!-- Divider -->
        <div class="hidden md:block w-px h-5 bg-gray-200 dark:bg-gray-700"></div>

        <!-- Dark Mode Toggle -->
        <button
          @click="$emit('toggleDark')"
          class="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all duration-200 hover:scale-105"
        >
          <span v-if="isDark" class="text-lg">☀️</span>
          <span v-else class="text-lg">🌙</span>
        </button>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  isDark: boolean
}>()

defineEmits<{
  toggleDark: []
}>()
</script>