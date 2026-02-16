import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '../types/index'

export const useFavouritesStore = defineStore('favourites', () => {
  const items = ref<Product[]>([])

  const totalFavourites = computed(() => items.value.length)

  const addFavourite = (product: Product) => {
    if (!isFavourite(product.id)) {
      items.value.push(product)
    }
  }

  const removeFavourite = (productId: number) => {
    items.value = items.value.filter(item => item.id !== productId)
  }

  const toggleFavourite = (product: Product) => {
    if (isFavourite(product.id)) {
      removeFavourite(product.id)
    } else {
      addFavourite(product)
    }
  }

  const isFavourite = (productId: number) => {
    return items.value.some(item => item.id === productId)
  }

  return { items, totalFavourites, addFavourite, removeFavourite, toggleFavourite, isFavourite }
})