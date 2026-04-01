<template>
  <div v-if="loading" class="animate-pulse">
    <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-8"></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
      <div class="space-y-4">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div class="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  </div>

  <div v-else-if="product">
    <!-- Back Button -->
    <button
      @click="router.back()"
      class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors mb-6 group"
    >
      <span class="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">←</span>
      <span class="text-sm font-medium">Back to Products</span>
    </button>

    <!-- Main Product Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

      <!-- Left - Image Section -->
      <div class="space-y-4">
        <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/[0.02] dark:backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-black/50" style="height: 420px;">
          <img
            :src="selectedImage"
            :alt="product.title"
            class="w-full h-full object-contain p-6 transition-all duration-300"
          />
          <div v-if="product.discountPercentage > 0" class="absolute top-4 left-4 bg-emerald-600 text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow-lg">
            -{{ Math.round(product.discountPercentage) }}% OFF
          </div>
          <button
            @click="favouritesStore.toggleFavourite(product)"
            class="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white dark:bg-[#111111] shadow-lg flex items-center justify-center border transition-all hover:scale-110"
            :class="favouritesStore.isFavourite(product.id) ? 'border-emerald-500 text-emerald-500' : 'border-gray-200 dark:border-white/10 text-gray-400'"
          >
            {{ favouritesStore.isFavourite(product.id) ? '♥' : '♡' }}
          </button>
        </div>

        <!-- Thumbnail Gallery -->
        <div v-if="product.images?.length > 1" class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <div
            v-for="(img, index) in product.images"
            :key="index"
            @click="selectedImage = img"
            class="flex-shrink-0 w-20 h-20 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 bg-white dark:bg-white/5 dark:backdrop-blur-md overflow-hidden"
            :class="selectedImage === img ? 'border-emerald-500 shadow-lg shadow-emerald-200 dark:shadow-emerald-900' : 'border-gray-200 dark:border-white/10'"
          >
            <img :src="img" :alt="`Image ${index + 1}`" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Right - Product Info -->
      <div class="flex flex-col gap-5">

        <!-- Category & Brand -->
        <div class="flex items-center gap-3">
          <span class="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wide">{{ product.category }}</span>
          <span class="text-gray-400 dark:text-gray-500 text-sm">by {{ product.brand }}</span>
        </div>

        <!-- Title -->
        <h1 class="text-3xl font-black text-gray-900 dark:text-white leading-tight">{{ product.title }}</h1>

        <!-- Rating & Stock -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-xl">
            <span class="text-yellow-400">★</span>
            <span class="text-gray-700 dark:text-gray-300 font-bold text-sm">{{ product.rating }}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full" :class="product.stock > 10 ? 'bg-emerald-500' : 'bg-orange-500'"></div>
            <span class="text-sm font-medium" :class="product.stock > 10 ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-500'">
              {{ product.stock > 10 ? `${product.stock} in stock` : `Only ${product.stock} left!` }}
            </span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/10">
          {{ product.description }}
        </p>

        <!-- Price Section -->
        <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-100 dark:border-emerald-900/30">
          <div class="flex items-center gap-3">
            <span class="text-4xl font-black text-emerald-600 dark:text-emerald-400">${{ product.price }}</span>
            <div class="flex flex-col">
              <span class="text-gray-400 line-through text-sm">${{ Math.round(product.price / (1 - product.discountPercentage / 100)) }}</span>
              <span class="text-emerald-600 dark:text-emerald-400 text-xs font-bold">You save ${{ (Math.round(product.price / (1 - product.discountPercentage / 100)) - product.price).toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Size Selector -->
        <div v-if="hasSize" class="space-y-2">
          <span class="text-gray-700 dark:text-gray-300 text-sm font-medium">Select Size:</span>
          <div class="flex items-center gap-2 flex-wrap">
            <button
              v-for="size in sizes"
              :key="size"
              @click="selectedSize = size"
              class="px-3 h-10 rounded-xl border-2 text-sm font-bold transition-all duration-200 hover:scale-105"
              :class="selectedSize === size
                ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900'
                : 'border-gray-200 dark:border-white/10 bg-white dark:bg-[#111111] text-gray-700 dark:text-white hover:border-emerald-400'"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Quantity -->
        <div class="flex items-center gap-4">
          <span class="text-gray-700 dark:text-gray-300 text-sm font-medium">Quantity:</span>
          <div class="flex items-center gap-3 bg-gray-100 dark:bg-[#111111] rounded-xl p-1">
            <button
              @click="quantity > 1 ? quantity-- : null"
              class="w-8 h-8 rounded-lg bg-white dark:bg-[#1a1a1a] flex items-center justify-center text-gray-700 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors font-bold shadow-sm"
            >-</button>
            <span class="text-gray-900 dark:text-white font-bold w-6 text-center">{{ quantity }}</span>
            <button
              @click="quantity++"
              class="w-8 h-8 rounded-lg bg-white dark:bg-[#1a1a1a] flex items-center justify-center text-gray-700 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors font-bold shadow-sm"
            >+</button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button
            @click="toggleCart"
            class="flex-1 font-bold py-4 px-6 rounded-2xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] text-sm"
            :class="cartStore.isInCart(product.id)
              ? 'bg-red-500 hover:bg-red-600 text-white hover:shadow-red-200 dark:hover:shadow-red-900'
              : 'bg-emerald-600 hover:bg-teal-500 text-white hover:shadow-emerald-200 dark:hover:shadow-emerald-900'"
          >
            {{ cartStore.isInCart(product.id) ? '✕ Remove from Cart' : '🛒 Add to Cart' }}
          </button>
          <button
            @click="favouritesStore.toggleFavourite(product)"
            class="w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all hover:scale-105 text-xl"
            :class="favouritesStore.isFavourite(product.id) ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500' : 'border-gray-200 dark:border-white/10 bg-white dark:bg-[#111111] text-gray-400'"
          >
            {{ favouritesStore.isFavourite(product.id) ? '♥' : '♡' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from '../types/index'
import { useCartStore } from '../composables/useCartStore'
import { useFavouritesStore } from '../composables/useFavouritesStore'

const route = useRoute()
const router = useRouter()
const product = ref<Product | null>(null)
const loading = ref(true)
const selectedImage = ref('')
const selectedSize = ref('')
const quantity = ref(1)
const cartStore = useCartStore()
const favouritesStore = useFavouritesStore()

const shoeSizes = ['6', '7', '8', '9', '10', '11', '12']
const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const hasSize = computed(() => {
  if (!product.value) return false
  const cat = product.value.category.toLowerCase()
  return cat.includes('shoe') || cat.includes('shirt') || cat.includes('dress') || cat.includes('top') || cat.includes('clothing') || cat.includes('watch') || cat.includes('jewel') || cat.includes('sunglass')
})

const sizes = computed(() => {
  if (!product.value) return []
  const cat = product.value.category.toLowerCase()
  if (cat.includes('shoe')) return shoeSizes
  if (cat.includes('watch') || cat.includes('jewel') || cat.includes('sunglass')) return ['One Size', 'S', 'M', 'L']
  return clothingSizes
})

const toggleCart = () => {
  if (product.value) {
    if (cartStore.isInCart(product.value.id)) {
      cartStore.removeFromCart(product.value.id)
    } else {
      cartStore.addToCart(product.value, quantity.value, selectedSize.value)
    }
  }
}

const fetchProduct = async () => {
  try {
    loading.value = true
    const id = route.params.id
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    const data: Product = await response.json()
    product.value = data
    selectedImage.value = data.thumbnail
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchProduct())
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