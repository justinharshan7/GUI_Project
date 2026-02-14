<template>
  <nav class="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 transition-colors duration-300">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-sm">S</span>
        </div>
        <span class="text-xl font-bold text-indigo-600 dark:text-indigo-400">ShopVue</span>
      </RouterLink>

      <!-- Dark Mode Toggle -->
      <button
        @click="$emit('toggleDark')"
        class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-200"
      >
        <span v-if="isDark" class="text-xl">☀️</span>
        <span v-else class="text-xl">🌙</span>
      </button>

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