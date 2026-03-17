import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from '../types/index'

export interface CartItem {
  product: Product
  quantity: number
  size?: string
}

export const useCartStore = defineStore('cart', () => {
  const saved = localStorage.getItem('cart')
  const items = ref<CartItem[]>(saved ? JSON.parse(saved) : [])

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )

  const addToCart = (product: Product, qty: number = 1, size: string = '') => {
    const existing = items.value.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity += qty
      if (size) existing.size = size
    } else {
      items.value.push({ product, quantity: qty, size })
    }
  }

  const removeFromCart = (productId: number) => {
    items.value = items.value.filter(item => item.product.id !== productId)
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find(item => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const isInCart = (productId: number) => {
    return items.value.some(item => item.product.id === productId)
  }

  watch(items, (val) => {
    localStorage.setItem('cart', JSON.stringify(val))
  }, { deep: true })

  return { items, totalItems, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart, isInCart }
})