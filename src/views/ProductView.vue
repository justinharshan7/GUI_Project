<template>
  <div>
    <!-- Back Button -->
    <button
      @click="router.back()"
      class="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-6 transition-colors"
    >
      ← Back to Products
    </button>

    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-gray-200 dark:bg-gray-700 rounded-2xl h-96"></div>
        <div class="space-y-4">
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    </div>

    <!-- Product Detail -->
    <div v-else-if="product" class="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-0">

        <!-- Image Section -->
        <div class="bg-gray-50 dark:bg-gray-800 p-8 flex items-center justify-center">
          <img
            :src="selectedImage"
            :alt="product.title"
            class="w-full max-h-96 object-contain rounded-xl"
          />
        </div>

        <!-- Info Section -->
        <div class="p-8">
          <p class="text-indigo-500 dark:text-indigo-400 uppercase text-sm font-semibold tracking-wide mb-2">
            {{ product.category }}
          </p>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {{ product.title }}
          </h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">by {{ product.brand }}</p>

          <!-- Rating & Stock -->
          <div class="flex items-center gap-4 mb-4">
            <div class="flex items-center gap-1">
              <span class="text-yellow-400">★</span>
              <span class="text-gray-700 dark:text-gray-300 font-medium">{{ product.rating }}</span>
            </div>
            <span class="text-gray-400">|</span>
            <span class="text-green-600 dark:text-green-400 text-sm font-medium">{{ product.stock }} in stock</span>
          </div>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
            {{ product.description }}
          </p>

          <!-- Price -->
          <div class="flex items-center gap-3 mb-6">
            <span class="text-4xl font-bold text-indigo-600 dark:text-indigo-400">${{ product.price }}</span>
            <span class="text-gray-400 line-through text-lg">
              ${{ Math.round(product.price / (1 - product.discountPercentage / 100)) }}
            </span>
            <span class="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-sm font-bold px-2 py-1 rounded-full">
              -{{ Math.round(product.discountPercentage) }}%
            </span>
          </div>

          <!-- Add to Cart Button -->
          <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200">
            Add to Cart 🛒
          </button>
        </div>
      </div>

      <!-- Thumbnail Images -->
      <div class="p-8 border-t border-gray-100 dark:border-gray-800">
        <p class="text-gray-700 dark:text-gray-300 font-semibold mb-4">More Images</p>
        <div class="flex gap-4 overflow-x-auto pb-2">
          <img
            v-for="(image, index) in product.images"
            :key="index"
            :src="image"
            :alt="`${product.title} ${index + 1}`"
            @click="selectedImage = image"
            class="w-20 h-20 object-cover rounded-xl cursor-pointer border-2 hover:border-indigo-500 transition-colors"
            :class="selectedImage === image ? 'border-indigo-500' : 'border-transparent'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from '../types/index'

const route = useRoute()
const router = useRouter()
const product = ref<Product | null>(null)
const loading = ref(true)
const selectedImage = ref('')

const fetchProduct = async () => {
  try {
    loading.value = true
    const response = await fetch(`https://dummyjson.com/products/${route.params.id}`)
    const data: Product = await response.json()
    product.value = data
    selectedImage.value = data.thumbnail
  } catch (error) {
    console.error('Error fetching product:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProduct()
})
</script>