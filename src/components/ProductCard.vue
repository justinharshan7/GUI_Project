<template>
  <div
    @click="$emit('click')"
    class="group bg-white dark:bg-[#021018] rounded-2xl shadow-md hover:shadow-xl dark:shadow-emerald-900/20 dark:border dark:border-emerald-900/30 overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
  >
    <!-- Product Image -->
    <div class="relative overflow-hidden bg-gray-100 dark:bg-[#031520] h-56">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <!-- Discount Badge -->
      <div v-if="product.discountPercentage > 0" class="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
        -{{ Math.round(product.discountPercentage) }}%
      </div>

      <!-- Favourite Button -->
      <button
  @click.stop="toggleFav"
  class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 bg-white/80 dark:bg-gray-800/80"
  :class="isFav ? 'border-2 border-emerald-500 text-emerald-500' : 'border-2 border-gray-300 dark:border-gray-600 text-gray-400 hover:border-emerald-500 hover:text-emerald-500'"
>
  {{ isFav ? '♥' : '♡' }}
</button>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <p class="text-xs text-emerald-500 dark:text-emerald-400 uppercase font-semibold tracking-wide mb-1">
        {{ product.category }}
      </p>
      <h3 class="text-gray-900 dark:text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
        {{ product.title }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center gap-1 mb-3">
        <span class="text-yellow-400 text-sm">★</span>
        <span class="text-gray-600 dark:text-gray-400 text-xs">{{ product.rating }}</span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-emerald-600 dark:text-emerald-400">${{ product.price }}</span>
        <span class="text-xs text-gray-500 dark:text-gray-400">{{ product.stock }} left</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '../types/index'
import { useFavouritesStore } from '../composables/useFavouritesStore'

const props = defineProps<{
  product: Product
}>()

defineEmits<{
  click: []
}>()

const favouritesStore = useFavouritesStore()

const isFav = computed(() => favouritesStore.isFavourite(props.product.id))

const toggleFav = () => {
  favouritesStore.toggleFavourite(props.product)
}
</script>