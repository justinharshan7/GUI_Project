<template>
  <div>
    <!-- Header -->
    <div class="relative bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-[#021018] dark:to-[#031520] rounded-3xl p-8 mb-8 text-white overflow-hidden border border-transparent dark:border-emerald-500/30">
      <div class="absolute -top-10 -right-10 w-40 h-40 dark:bg-emerald-500/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-10 -left-10 w-40 h-40 dark:bg-teal-500/20 rounded-full blur-3xl"></div>
      <div class="relative z-10">
        <button @click="router.back()" class="text-emerald-100 hover:text-white text-sm mb-4 flex items-center gap-1 transition-colors">
          ← Back
        </button>
        <h1 class="text-4xl font-bold mb-2">
          {{ selectedCategory ? formatCategory(selectedCategory) : 'All Products' }} ⚡
        </h1>
        <p class="text-emerald-100 text-lg">{{ filteredProducts.length }} products found</p>
      </div>
    </div>

    <!-- Filter & Sort Bar -->
    <div class="bg-emerald-50/50 dark:bg-[#0a1f14] rounded-2xl border border-emerald-100 dark:border-emerald-900/40 p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search -->
        <div class="relative flex-1">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-emerald-900/50 bg-white dark:bg-[#021018] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        <!-- Category -->
        <!-- Category Dropdown -->
<div class="relative w-full md:w-52" ref="dropdownRef">
  <button
    @click="showDropdown = !showDropdown"
    class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-emerald-900/50 bg-white dark:bg-[#001718] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center justify-between transition-all"
  >
    <span class="text-sm">{{ selectedCategory ? formatCategory(selectedCategory) : 'All Categories' }}</span>
    <span class="text-emerald-500 transition-transform duration-200" :class="showDropdown ? 'rotate-180' : ''">▾</span>
  </button>

  <!-- Dropdown List -->
  <div
    v-if="showDropdown"
    class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#021018] border border-gray-200 dark:border-emerald-900/50 rounded-xl shadow-xl z-50 overflow-hidden"
  >
    <!-- All Categories option -->
    <button
      @click="selectCategory('')"
      class="w-full text-left px-4 py-2.5 text-sm transition-colors"
      :class="selectedCategory === '' ? 'bg-emerald-600 text-white' : 'text-gray-900 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-900/30'"
    >
      All Categories
    </button>

    <!-- Scrollable list -->
    <div class="max-h-60 overflow-y-auto">
      <button
        v-for="cat in categories"
        :key="cat.slug"
        @click="selectCategory(cat.slug)"
        class="w-full text-left px-4 py-2.5 text-sm transition-colors"
        :class="selectedCategory === cat.slug ? 'bg-emerald-600 text-white' : 'text-gray-900 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-900/30'"
      >
        {{ cat.name }}
      </button>
    </div>
  </div>
</div>

        <!-- Sort Dropdown -->
<div class="relative w-full md:w-52" ref="sortDropdownRef">
  <button
    @click="showSortDropdown = !showSortDropdown"
    class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-emerald-900/50 bg-white dark:bg-[#021018] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center justify-between transition-all"
  >
    <span class="text-sm">{{ sortLabel }}</span>
    <span class="text-emerald-500 transition-transform duration-200" :class="showSortDropdown ? 'rotate-180' : ''">▾</span>
  </button>

  <div
    v-if="showSortDropdown"
    class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#021018] border border-gray-200 dark:border-emerald-900/50 rounded-xl shadow-xl z-50 overflow-hidden"
  >
    <button
      v-for="option in sortOptions"
      :key="option.value"
      @click="selectSort(option.value)"
      class="w-full text-left px-4 py-2.5 text-sm transition-colors"
      :class="sortBy === option.value ? 'bg-emerald-600 text-white' : 'text-gray-900 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-900/30'"
    >
      {{ option.label }}
    </button>
  </div>
</div>
      </div>

      <!-- Results count -->
      <div class="mt-3 flex items-center justify-between">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Showing <span class="font-semibold text-emerald-600 dark:text-emerald-400">{{ filteredProducts.length }}</span> products
        </p>
        <!-- View Toggle -->
        <div class="flex items-center gap-2">
          <button
            @click="viewMode = 'grid'"
            class="p-2 rounded-lg transition-colors"
            :class="viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-[#021018] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-emerald-900/50'"
          >
            ⊞
          </button>
          <button
            @click="viewMode = 'list'"
            class="p-2 rounded-lg transition-colors"
            :class="viewMode === 'list' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-[#021018] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-emerald-900/50'"
          >
            ☰
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div v-for="n in 10" :key="n" class="bg-white dark:bg-[#021018] rounded-2xl overflow-hidden animate-pulse border border-gray-100 dark:border-emerald-900/30">
        <div class="h-48 bg-gray-200 dark:bg-[#031520]"></div>
        <div class="p-3 space-y-2">
          <div class="h-3 bg-gray-200 dark:bg-[#031520] rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 dark:bg-[#031520] rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- Grid View -->
    <div
      v-else-if="filteredProducts.length > 0 && viewMode === 'grid'"
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        @click="goToProduct(product.id)"
        class="bg-white dark:bg-[#021018] rounded-2xl border border-gray-200 dark:border-emerald-900/30 overflow-hidden cursor-pointer hover:shadow-lg hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-200 group"
      >
        <div class="relative h-48 bg-gray-50 dark:bg-[#031520] overflow-hidden">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div v-if="product.discountPercentage > 0" class="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{{ Math.round(product.discountPercentage) }}%
          </div>
          <button
            @click.stop="toggleFav(product)"
            class="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center border transition-all hover:scale-110"
            :class="isFav(product.id) ? 'border-emerald-500 text-emerald-500' : 'border-gray-300 text-gray-400 hover:border-emerald-500 hover:text-emerald-500'"
          >
            <span class="text-xs">{{ isFav(product.id) ? '♥' : '♡' }}</span>
          </button>
        </div>
        <div class="p-3">
          <p class="text-xs text-emerald-500 uppercase font-semibold mb-1">{{ product.category }}</p>
          <h3 class="text-gray-900 dark:text-white text-xs font-medium line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1">
            {{ product.title }}
          </h3>
          <div class="flex items-center gap-1 mb-1">
            <span class="text-yellow-400 text-xs">★</span>
            <span class="text-gray-400 text-xs">{{ product.rating }}</span>
          </div>
          <p class="text-emerald-600 dark:text-emerald-400 font-bold">${{ product.price }}</p>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div
      v-else-if="filteredProducts.length > 0 && viewMode === 'list'"
      class="space-y-3"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        @click="goToProduct(product.id)"
        class="bg-white dark:bg-[#021018] rounded-2xl border border-gray-200 dark:border-emerald-900/30 overflow-hidden cursor-pointer hover:shadow-lg hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-200 group flex items-center gap-4 p-3"
      >
        <div class="relative w-24 h-24 flex-shrink-0 bg-gray-50 dark:bg-[#031520] rounded-xl overflow-hidden">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div v-if="product.discountPercentage > 0" class="absolute top-1 left-1 bg-emerald-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            -{{ Math.round(product.discountPercentage) }}%
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-emerald-500 uppercase font-semibold mb-0.5">{{ product.category }}</p>
          <h3 class="text-gray-900 dark:text-white font-semibold text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1">
            {{ product.title }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400 text-xs line-clamp-1">{{ product.description }}</p>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-yellow-400 text-xs">★</span>
            <span class="text-gray-400 text-xs">{{ product.rating }}</span>
            <span class="text-gray-300 dark:text-gray-600">•</span>
            <span class="text-gray-400 text-xs">{{ product.stock }} in stock</span>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-emerald-600 dark:text-emerald-400 font-bold text-lg">${{ product.price }}</p>
          <button
            @click.stop="toggleFav(product)"
            class="mt-1 w-7 h-7 rounded-full bg-white dark:bg-[#031520] flex items-center justify-center border transition-all hover:scale-110"
            :class="isFav(product.id) ? 'border-emerald-500 text-emerald-500' : 'border-gray-300 text-gray-400 hover:border-emerald-500 hover:text-emerald-500'"
          >
            <span class="text-xs">{{ isFav(product.id) ? '♥' : '♡' }}</span>
          </button>
        </div>
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
import { useRouter, useRoute } from 'vue-router'
import type { Product, ProductsResponse, Category } from '../types/index'
import { useFavouritesStore } from '../composables/useFavouritesStore'

const router = useRouter()
const route = useRoute()
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref((route.query.category as string) || '')
const sortBy = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const showDropdown = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const selectCategory = (slug: string) => {
  selectedCategory.value = slug
  showDropdown.value = false
}
const showSortDropdown = ref(false)
const sortDropdownRef = ref<HTMLElement | null>(null)

const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

const sortLabel = computed(() => {
  return sortOptions.find(o => o.value === sortBy.value)?.label || 'Default'
})

const selectSort = (value: string) => {
  sortBy.value = value
  showSortDropdown.value = false
}
const favouritesStore = useFavouritesStore()

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
    const response = await fetch('https://dummyjson.com/products?limit=194')
    const data: ProductsResponse = await response.json()
    products.value = data.products
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

const isFav = (id: number) => favouritesStore.isFavourite(id)
const toggleFav = (product: Product) => favouritesStore.toggleFavourite(product)
const goToProduct = (id: number) => router.push(`/product/${id}`)
const formatCategory = (slug: string) => slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

onMounted(() => {
  fetchProducts()
  fetchCategories()
  document.addEventListener('click', (e) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
      showDropdown.value = false
    }
    if (sortDropdownRef.value && !sortDropdownRef.value.contains(e.target as Node)) {
      showSortDropdown.value = false
    }
  })
})
</script>