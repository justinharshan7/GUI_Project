<template>
  <div>
    <!-- Hero Banner -->
    <div class="relative bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-[#021018] dark:to-[#031520] rounded-3xl p-8 mb-8 text-white overflow-hidden border border-transparent dark:border-emerald-500/30 shadow-sm shadow-emerald-100 dark:shadow-emerald-900/20">
  <div class="absolute inset-0 dark:bg-gradient-to-r dark:from-emerald-600/10 dark:to-teal-600/10 rounded-3xl"></div>
  <div class="absolute -top-10 -right-10 w-40 h-40 dark:bg-emerald-500/20 rounded-full blur-3xl"></div>
  <div class="absolute -bottom-10 -left-10 w-40 h-40 dark:bg-teal-500/20 rounded-full blur-3xl"></div>

  <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">

    <!-- Left Content -->
    <div class="flex-1">
      <h1 class="text-4xl font-bold mb-2">Welcome to Glitch <span class="inline-block animate-pulse" style="filter: sepia(1) saturate(5) hue-rotate(5deg);">🛒</span></h1>
      <p class="text-emerald-100 text-lg">Next-gen shopping. Discover products that hit different.</p>
      <div class="mt-4 flex gap-4 text-sm flex-wrap">
        <span class="bg-white/20 px-3 py-1 rounded-full">{{ totalProducts }} PRODUCTS</span>
        <span class="bg-white/20 px-3 py-1 rounded-full">{{ CATEGORIESWithProducts.length }} CATEGORIES</span>
      </div>
      <RouterLink
        to="/products"
        class="inline-block mt-6 bg-white text-emerald-600 font-bold px-6 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors duration-200 shadow-md"
      >
        Shop All Products →
      </RouterLink>
    </div>

    <!-- Middle Logo -->
<div class="hidden md:flex flex-col items-center justify-center gap-3 px-8">
  <div class="w-px h-12 bg-white/20"></div>
  
  <!-- Geometric G Logo -->
  <div class="relative">
    <div class="w-20 h-20 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl rotate-12 flex items-center justify-center shadow-xl">
      <div class="-rotate-12 flex flex-col items-center">
        <svg viewBox="0 0 60 60" class="w-12 h-12">
          <defs>
            <linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#6ee7b7;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M44 20 A18 18 0 1 0 44 40 L44 32 L32 32 L32 28 L48 28 L48 44 A24 24 0 1 1 48 16 Z" 
                fill="url(#gGrad)" />
        </svg>
      </div>
    </div>
    <div class="absolute inset-0 bg-emerald-400/20 rounded-2xl rotate-12 blur-xl -z-10"></div>
  </div>

  <p class="text-white/60 text-xs uppercase tracking-widest font-bold">Glitch</p>
  <div class="w-px h-12 bg-white/20"></div>
</div>

    <!-- Right Content -->
    <div class="hidden md:flex flex-col items-center gap-4 flex-shrink-0">
      
      <!-- Badge -->
      <RouterLink 
  to="/products?sort=flash"
  class="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xs px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg transition-colors cursor-pointer"
>
  🔥 GREAT DEALS FOUND 🔥
</RouterLink>
      <p class="text-white/60 text-xs uppercase tracking-widest">Limited Time Only</p>

      <!-- Floating Cards -->
      <div class="flex items-end gap-3">
        <!-- Card 1 -->
        <div
          v-if="products[0]"
          @click="goToProduct(products[0].id)"
          class="w-28 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl -translate-y-2"
        >
          <div class="h-24 overflow-hidden">
            <img :src="products[0].thumbnail" :alt="products[0].title" class="w-full h-full object-cover" />
          </div>
          <div class="p-2">
            <p class="text-white text-xs font-medium line-clamp-1">{{ products[0].title }}</p>
            <p class="text-emerald-300 text-xs font-bold mt-0.5">${{ products[0].price }}</p>
          </div>
        </div>

        <!-- Card 2 -->
        <div
          v-if="products[1]"
          @click="goToProduct(products[1].id)"
          class="w-28 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl translate-y-2"
        >
          <div class="h-24 overflow-hidden">
            <img :src="products[1].thumbnail" :alt="products[1].title" class="w-full h-full object-cover" />
          </div>
          <div class="p-2">
            <p class="text-white text-xs font-medium line-clamp-1">{{ products[1].title }}</p>
            <p class="text-emerald-300 text-xs font-bold mt-0.5">${{ products[1].price }}</p>
          </div>
        </div>

        <!-- Card 3 -->
        <div
          v-if="products[2]"
          @click="goToProduct(products[2].id)"
          class="w-28 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl -translate-y-1"
        >
          <div class="h-24 overflow-hidden">
            <img :src="products[2].thumbnail" :alt="products[2].title" class="w-full h-full object-cover" />
          </div>
          <div class="p-2">
            <p class="text-white text-xs font-medium line-clamp-1">{{ products[2].title }}</p>
            <p class="text-emerald-300 text-xs font-bold mt-0.5">${{ products[2].price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
    <!-- Glitch Club Banner -->
<div class="relative bg-gray-800/90 dark:bg-[#144444]/90 backdrop-blur-xl rounded-3xl p-8 mb-8 overflow-hidden border border-white/10 flex items-center justify-between gap-8 shadow-xl shadow-emerald-900/30 dark:shadow-none">
  <!-- Left Content -->
  <div class="flex-1">
    <h2 class="text-2xl font-bold text-white mb-2">Join the Glitch Club</h2>
    <p class="text-gray-400 text-sm mb-4">Get early access to drops, exclusive discounts, and personalized recommendations.</p>
    <div class="flex items-center gap-3">
      <input
        v-model="newsletterEmail"
        type="email"
        placeholder="Enter your email"
        class="flex-1 max-w-xs px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
      />
      <button
        @click="handleNewsletter"
        class="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/30 text-sm"
      >
        {{ newsletterJoined ? 'Joined! ✅' : 'Join' }}
      </button>
    </div>
  </div>

  <!-- Right Icon -->
  <div class="hidden md:flex items-center justify-center w-32 h-32 flex-shrink-0">
    <div class="w-24 h-24 rounded-2xl border-2 border-emerald-500/50 flex items-center justify-center bg-emerald-900/20">
      <svg class="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    </div>
  </div>

  <!-- Background Glow -->
  <div class="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-emerald-900/20 to-transparent rounded-3xl"></div>
</div>
    <!-- Loading State -->
    <div v-if="loading">
      <div v-for="n in 3" :key="n" class="mb-10">
        <div class="h-6 bg-gray-200 dark:bg-[#031520] rounded w-40 mb-4 animate-pulse"></div>
        <div class="flex gap-4 overflow-hidden">
          <div v-for="m in 5" :key="m" class="flex-shrink-0 w-44 bg-white dark:bg-[#021018] rounded-xl shadow-md overflow-hidden animate-pulse">
            <div class="h-44 bg-gray-200 dark:bg-[#031520]"></div>
            <div class="p-3 space-y-2">
              <div class="h-3 bg-gray-200 dark:bg-[#031520] rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 dark:bg-[#031520] rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Sections -->
    <div v-else>
     <div v-for="category in CATEGORIESWithProducts" :key="category.slug" class="mb-6 bg-emerald-50/50 dark:bg-white/5 rounded-2xl border border-emerald-100 dark:border-white/10 p-4 shadow-md shadow-emerald-100 dark:shadow-black/30 dark:backdrop-blur-md">

        <!-- Category Header -->
        <div class="flex items-center justify-between mb-3">
          <div>
            <h2 class="text-lg font-bold text-gray-900 dark:text-white capitalize">{{ category.name }}</h2>
            <p class="text-xs text-gray-400 dark:text-gray-500">{{ getProductsByCategory(category.slug).length }} items</p>
          </div>
          <RouterLink
            :to="`/products?category=${category.slug}`"
            class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-teal-500 transition-colors"
          >
            See all →
          </RouterLink>
        </div>

        <!-- Cards Container with Arrows -->
        <div class="relative group/row">

          <!-- Left Arrow -->
          <button
            @click="scrollLeft(category.slug)"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 bg-white dark:bg-[#021018] border border-gray-200 dark:border-emerald-900/30 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/50"
          >
            <span class="text-gray-600 dark:text-white text-sm font-bold">‹</span>
          </button>

          <!-- Scrollable Row -->
          <div
            :ref="el => setRowRef(el, category.slug)"
            class="flex gap-3 overflow-x-auto pb-3 scrollbar-hide scroll-smooth"
          >
            <div
              v-for="product in getProductsByCategory(category.slug)"
              :key="product.id"
              @click="goToProduct(product.id)"
             class="flex-shrink-0 w-44 bg-white dark:bg-white/[0.04] dark:backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden cursor-pointer hover:shadow-lg hover:border-emerald-400 dark:hover:border-emerald-400/50 dark:hover:bg-white/[0.07] transition-all duration-200 group"
            >
              <!-- Image -->
              <div class="relative h-44 bg-gray-50 dark:bg-[#031520] overflow-hidden">
                <img
                  :src="product.thumbnail"
                  :alt="product.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div v-if="product.discountPercentage > 0" class="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  -{{ Math.round(product.discountPercentage) }}%
                </div>
                <button
                  @click.stop="toggleFav(product)"
                  class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center transition-all duration-200 hover:scale-110 border"
                  :class="isFav(product.id) ? 'border-emerald-500 text-emerald-500' : 'border-gray-300 text-gray-400 hover:border-emerald-500 hover:text-emerald-500'"
                >
                  <span class="text-xs">{{ isFav(product.id) ? '♥' : '♡' }}</span>
                </button>
              </div>

              <!-- Info -->
<!-- Info -->
<div class="p-2.5 border-t border-gray-100 dark:border-emerald-900/20">
  <h3 class="text-gray-900 dark:text-white text-xs font-medium line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight" style="height: 30px;">
    {{ product.title }}
  </h3>
  <div class="flex items-center gap-1 mt-1 mb-2">
    <span class="text-yellow-400 text-xs">★</span>
    <span class="text-gray-400 text-xs">{{ product.rating }}</span>
  </div>
  <div class="flex items-center justify-between gap-2">
    <p class="text-emerald-600 dark:text-emerald-400 font-bold text-sm">${{ product.price }}</p>
    <button
      @click.stop="cartStore.isInCart(product.id) ? cartStore.removeFromCart(product.id) : cartStore.addToCart(product)"
      class="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 flex-shrink-0"
      :class="cartStore.isInCart(product.id) ? 'bg-red-400 text-white' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-500'"
    >
      <span class="text-xs">{{ cartStore.isInCart(product.id) ? '✕' : '🛒' }}</span>
    </button>
  </div>
</div>
            </div>
          </div>

          <!-- Right Arrow -->
          <button
            @click="scrollRight(category.slug)"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 bg-white dark:bg-[#021018] border border-gray-200 dark:border-emerald-900/30 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/50"
          >
            <span class="text-gray-600 dark:text-white text-sm font-bold">›</span>
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Product, ProductsResponse, Category } from '../types/index'
import { useFavouritesStore } from '../composables/useFavouritesStore'
import { useCartStore } from '../composables/useCartStore'

const router = useRouter()
const products = ref<Product[]>([])
const CATEGORIES = ref<Category[]>([])
const loading = ref(true)
const totalProducts = ref(0)
const favouritesStore = useFavouritesStore()
const cartStore = useCartStore()
const newsletterEmail = ref('')
const newsletterJoined = ref(false)

const handleNewsletter = () => {
  if (newsletterEmail.value) {
    newsletterJoined.value = true
    newsletterEmail.value = ''
  }
}

const rowRefs = ref<Record<string, HTMLElement>>({})

const setRowRef = (el: any, slug: string) => {
  if (el) rowRefs.value[slug] = el
}

const scrollRight = (slug: string) => {
  const el = rowRefs.value[slug]
  if (el) el.scrollBy({ left: 400, behavior: 'smooth' })
}

const scrollLeft = (slug: string) => {
  const el = rowRefs.value[slug]
  if (el) el.scrollBy({ left: -400, behavior: 'smooth' })
}

const getProductsByCategory = (slug: string) => {
  return products.value.filter(p => p.category === slug).slice(0, 10)
}

const CATEGORIESWithProducts = computed(() => {
  return CATEGORIES.value.filter(cat => getProductsByCategory(cat.slug).length > 0)
})

const goToProduct = (id: number) => router.push(`/product/${id}`)
const isFav = (id: number) => favouritesStore.isFavourite(id)
const toggleFav = (product: Product) => favouritesStore.toggleFavourite(product)

const fetchProducts = async () => {
  try {
    loading.value = true
    const response = await fetch('https://dummyjson.com/products?limit=194')
    const data: ProductsResponse = await response.json()
    products.value = data.products
    totalProducts.value = data.total
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

const fetchCATEGORIES = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/CATEGORIES')
    const data: Category[] = await response.json()
    CATEGORIES.value = data
  } catch (error) {
    console.error('Error:', error)
  }
}

onMounted(() => {
  fetchProducts()
  fetchCATEGORIES()
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>