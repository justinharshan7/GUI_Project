<template>
  <div
    @click="$emit('click')"
    class="group bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl dark:shadow-gray-800 overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
  >
    <!-- Product Image -->
    <div class="relative overflow-hidden bg-gray-100 dark:bg-gray-800 h-56">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <!-- Discount Badge -->
      <div v-if="product.discountPercentage > 0" class="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
        -{{ Math.round(product.discountPercentage) }}%
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <p class="text-xs text-indigo-500 dark:text-indigo-400 uppercase font-semibold tracking-wide mb-1">
        {{ product.category }}
      </p>
      <h3 class="text-gray-900 dark:text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {{ product.title }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center gap-1 mb-3">
        <span class="text-yellow-400 text-sm">★</span>
        <span class="text-gray-600 dark:text-gray-400 text-xs">{{ product.rating }}</span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-indigo-600 dark:text-indigo-400">${{ product.price }}</span>
        <span class="text-xs text-gray-500 dark:text-gray-400">{{ product.stock }} left</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types/index'

defineProps<{
  product: Product
}>()

defineEmits<{
  click: []
}>()
</script>