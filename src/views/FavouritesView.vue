<template>
  <div>
    <!-- Header -->
    <div class="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-[#021018] dark:to-[#031520] rounded-3xl p-8 mb-8 text-white border dark:border-emerald-500/30">
      <h1 class="text-4xl font-bold mb-2">My Favourites ♥</h1>
      <p class="text-emerald-100 text-lg">Products you love</p>
      <div class="mt-4 flex gap-4 text-sm">
        <span class="bg-white/20 px-3 py-1 rounded-full">{{ favouritesStore.totalFavourites }} Items</span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="favouritesStore.items.length === 0" class="text-center py-20">
      <p class="text-6xl mb-4">♡</p>
      <p class="text-gray-500 dark:text-gray-400 text-xl">No favourites yet</p>
      <p class="text-gray-400 dark:text-gray-500 text-sm mt-2">Click the heart on any product to save it here</p>
      <RouterLink
        to="/"
        class="inline-block mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors duration-200"
      >
        Browse Products
      </RouterLink>
    </div>

    <!-- Favourites Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in favouritesStore.items"
        :key="product.id"
        :product="product"
        @click="goToProduct(product.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useFavouritesStore } from '../composables/useFavouritesStore'

const router = useRouter()
const favouritesStore = useFavouritesStore()

const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}
</script>