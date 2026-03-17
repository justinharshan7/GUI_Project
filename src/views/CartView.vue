<template>
  <div>
    <!-- Header -->
    <div class="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-[#021018] dark:to-[#031520] rounded-3xl p-8 mb-8 text-white border dark:border-emerald-500/30">
      <h1 class="text-4xl font-bold mb-2">My Cart 🛒</h1>
      <p class="text-emerald-100 text-lg">Your selected items</p>
      <div class="mt-4 flex gap-4 text-sm">
        <span class="bg-white/20 px-3 py-1 rounded-full">{{ cartStore.totalItems }} Items</span>
        <span class="bg-white/20 px-3 py-1 rounded-full">${{ cartStore.totalPrice.toFixed(2) }} Total</span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="cartStore.items.length === 0" class="text-center py-20">
      <p class="text-6xl mb-4">🛒</p>
      <p class="text-gray-500 dark:text-gray-400 text-xl">Your cart is empty</p>
      <p class="text-gray-400 dark:text-gray-500 text-sm mt-2">Add some products to get started</p>
      <RouterLink
        to="/"
        class="inline-block mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors duration-200"
      >
        Browse Products
      </RouterLink>
    </div>

    <!-- Cart Items -->
    <div v-else>
      <div class="space-y-4 mb-8">
        <div
          v-for="item in cartStore.items"
          :key="item.product.id"
          class="bg-white dark:bg-[#041a0a] rounded-2xl shadow-md dark:shadow-emerald-900/20 p-4 flex items-center gap-4"
        >
          <!-- Product Image -->
          <img
            :src="item.product.thumbnail"
            :alt="item.product.title"
            class="w-20 h-20 object-cover rounded-xl"
          />

          <!-- Product Info -->
          <div class="flex-1">
            <p class="text-xs text-emerald-500 uppercase font-semibold">{{ item.product.category }}</p>
            <h3 class="text-gray-900 dark:text-white font-semibold text-sm mt-1">{{ item.product.title }}</h3>
            <p v-if="item.size" class="text-xs text-emerald-500 mt-0.5">Size: {{ item.size }}</p>
            <p class="text-emerald-600 dark:text-emerald-400 font-bold mt-1">${{ item.product.price }}</p>
          </div>

          <!-- Quantity Controls -->
          <div class="flex items-center gap-3">
            <button
              @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
              class="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#062010] hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-gray-700 dark:text-white flex items-center justify-center transition-colors"
            >
              -
            </button>
            <span class="text-gray-900 dark:text-white font-semibold w-6 text-center">{{ item.quantity }}</span>
            <button
              @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
              class="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#062010] hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-gray-700 dark:text-white flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>

          <!-- Item Total -->
          <div class="text-right">
            <p class="text-gray-900 dark:text-white font-bold">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
            <button
              @click="cartStore.removeFromCart(item.product.id)"
              class="text-red-400 hover:text-red-600 text-xs mt-1 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="bg-white dark:bg-[#041a0a] rounded-2xl shadow-md dark:shadow-emerald-900/20 p-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
        <div class="space-y-3 mb-4">
          <div class="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal ({{ cartStore.totalItems }} items)</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Shipping</span>
            <span class="text-emerald-500">Free</span>
          </div>
          <div class="border-t border-gray-200 dark:border-emerald-900/50 pt-3 flex justify-between text-gray-900 dark:text-white font-bold text-lg">
            <span>Total</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
        </div>
        <button class="w-full bg-emerald-600 hover:bg-teal-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-teal-200 dark:hover:shadow-teal-900">
          Checkout 🛒
        </button>
        <button
          @click="cartStore.clearCart()"
          class="w-full mt-3 text-red-400 hover:text-red-600 text-sm transition-colors"
        >
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../composables/useCartStore'

const cartStore = useCartStore()
</script>