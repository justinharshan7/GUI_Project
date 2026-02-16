<template>
  <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-gray-800 p-4 mb-8 transition-colors duration-300">
    <div class="flex flex-col md:flex-row gap-4 items-center">
      
      <!-- Search Input -->
      <div class="relative flex-1 w-full">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          v-model="searchQuery"
          @input="$emit('search', searchQuery)"
          type="text"
          placeholder="Search products..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
        />
      </div>

      <!-- Category Filter -->
      <div class="w-full md:w-64">
        <select
          v-model="selectedCategory"
          @change="$emit('filter', selectedCategory)"
          class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category.slug" :value="category.slug">
            {{ category.name }}
          </option>
        </select>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Category } from '../types/index'

defineProps<{
  categories: Category[]
}>()

defineEmits<{
  search: [query: string]
  filter: [category: string]
}>()

const searchQuery = ref('')
const selectedCategory = ref('')
</script>