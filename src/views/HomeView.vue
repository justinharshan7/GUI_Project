<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 mb-8 text-white">
      <h1 class="text-4xl font-bold mb-2">Welcome to ShopVue 🛍️</h1>
      <p class="text-indigo-100 text-lg">Discover amazing products at unbeatable prices</p>
      <div class="mt-4 flex gap-4 text-sm">
        <span class="bg-white/20 px-3 py-1 rounded-full">{{ total }} Products</span>
        <span class="bg-white/20 px-3 py-1 rounded-full">{{ categories.length }} Categories</span>
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

    <!-- Products Grid -->
    <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @click="goToProduct(product.id)"
      />
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
const total = ref(0)

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === '' || product.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
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