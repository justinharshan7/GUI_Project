<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-gray-900 dark:to-gray-900 rounded-3xl p-8 mb-8 text-white overflow-hidden border border-transparent dark:border-emerald-500/30 dark:shadow-lg dark:shadow-emerald-500/10">
  <!-- Glassmorphism glow effect for dark mode -->
  <div class="absolute inset-0 dark:bg-gradient-to-r dark:from-emerald-600/10 dark:to-teal-500/10 rounded-3xl"></div>
  <div class="absolute -top-10 -right-10 w-40 h-40 dark:bg-emerald-500/20 rounded-full blur-3xl"></div>
  <div class="absolute -bottom-10 -left-10 w-40 h-40 dark:bg-teal-400/20 rounded-full blur-3xl"></div>
  <div class="relative z-10">
      <h1 class="text-4xl font-bold mb-2">Welcome to Glitch <span class="inline-block font-black text-teal-300 animate-pulse">⚡</span></h1>
      <p class="text-emerald-100 text-lg">Next-gen shopping. Discover products that hit different.</p>
      <div class="mt-4 flex gap-4 text-sm">
        <span class="bg-white/20 px-3 py-1 rounded-full">{{ total }} Products</span>
        <span class="bg-white/20 px-3 py-1 rounded-full">{{ categories.length }} Categories</span>
      </div>
    </div>
    </div>
    <!-- Filter Bar -->
    <FilterBar
      :categories="categories"
      @search="handleSearch"
      @filter="handleFilter"
    />

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="n in 8" :key="n" class="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden animate-pulse">
        <div class="h-56 bg-gray-200 dark:bg-gray-700"></div>
        <div class="p-4 space-y-3">
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    </div>

    <!-- Products Count & Sort -->
    <div v-else-if="filteredProducts.length > 0">
      <div class="flex items-center justify-between mb-4">
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          Showing <span class="font-semibold text-emerald-600 dark:text-emerald-400">{{ filteredProducts.length }}</span> products
        </p>
        <select
          v-model="sortBy"
          class="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @click="goToProduct(product.id)"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <p class="text-6xl mb-4">🔍</p>
      <p class="text-gray-500 dark:text-gray-400 text-xl">No products found</p>
      <p class="text-gray-400 dark:text-gray-500 text-sm mt-2">Try a different search or category</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'
import type { Product, ProductsResponse, Category } from '../types/index'

const router = useRouter()
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('')
const total = ref(0)

const filteredProducts = computed(() => {
  let result = products.value.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === '' || product.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })

  if (sortBy.value === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
  if (sortBy.value === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)

  return result
})

const fetchProducts = async () => {
  try {
    loading.value = true
    const response = await fetch('https://dummyjson.com/products?limit=100')
    const data: ProductsResponse = await response.json()
    products.value = data.products
    total.value = data.total
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/categories')
    const data: Category[] = await response.json()
    categories.value = data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleFilter = (category: string) => {
  selectedCategory.value = category
}

const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>