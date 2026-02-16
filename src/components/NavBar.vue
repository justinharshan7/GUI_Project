<template>
  <nav class="sticky top-0 z-50 bg-white/80 dark:bg-[#001718]/95 backdrop-blur-md shadow-sm dark:shadow-emerald-900/50 dark:border-b dark:border-emerald-900/30 transition-colors duration-300">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">

      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 group">
        <div class="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md shadow-emerald-200 dark:shadow-emerald-900 group-hover:scale-105 transition-transform duration-200">
  <span class="font-bold text-lg" style="filter: sepia(1) saturate(3) hue-rotate(180deg) brightness(1.5);">⚡</span>
</div>
        <span class="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent tracking-tight">Glitch</span>
      </RouterLink>

      <!-- Right Side -->
      <div class="flex items-center gap-3">

        <!-- Home Link -->
        <RouterLink
          to="/"
          class="hidden md:block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          Home
        </RouterLink>

        <!-- Divider -->
        <div class="hidden md:block w-px h-5 bg-gray-200 dark:bg-gray-700"></div>

        <!-- Favourites Button -->
        <RouterLink
          to="/favourites"
          class="relative p-2.5 rounded-xl bg-gray-100 dark:bg-[#112318] hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all duration-200 hover:scale-105"
        >
          <span class="text-lg text-emerald-500">♥</span>
          <span
            v-if="favouritesStore.totalFavourites > 0"
            class="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          >
            {{ favouritesStore.totalFavourites }}
          </span>
        </RouterLink>

        <!-- Cart Button -->
        <RouterLink
          to="/cart"
          class="relative p-2.5 rounded-xl bg-gray-100 dark:bg-[#112318] hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all duration-200 hover:scale-105"
        >
          <span class="text-lg">🛒</span>
          <span
            v-if="cartStore.totalItems > 0"
            class="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          >
            {{ cartStore.totalItems }}
          </span>
        </RouterLink>

        <!-- Divider -->
        <div class="w-px h-5 bg-gray-200 dark:bg-gray-700"></div>

        <!-- Dark Mode Toggle -->
        <button
          @click="$emit('toggleDark')"
          class="p-2.5 rounded-xl bg-gray-100 dark:bg-[#112318] hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all duration-200 hover:scale-105"
        >
          <span v-if="isDark" class="text-lg">☀️</span>
          <span v-else class="text-lg">🌙</span>
        </button>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '../composables/useCartStore'
import { useFavouritesStore } from '../composables/useFavouritesStore'

defineProps<{
  isDark: boolean
}>()

defineEmits<{
  toggleDark: []
}>()

const cartStore = useCartStore()
const favouritesStore = useFavouritesStore()
</script>