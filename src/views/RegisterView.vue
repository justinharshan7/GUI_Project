<template>
  <div class="fixed inset-0 overflow-hidden">

    <!-- Background Product Grid -->
    <div class="absolute inset-0 grid grid-cols-4 md:grid-cols-6 gap-1 opacity-40 scale-105">
      <div
        v-for="product in bgProducts"
        :key="product.id"
        class="relative overflow-hidden"
      >
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/50"></div>
        <div class="absolute bottom-2 left-2 right-2">
          <p class="text-white text-xs uppercase font-bold opacity-70">{{ product.category }}</p>
          <p class="text-white text-xs font-medium line-clamp-1">{{ product.title }}</p>
        </div>
      </div>
    </div>

    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

    <!-- Register Card -->
    <div class="relative z-10 flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-md bg-white/10 dark:bg-black/40 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">

        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="flex items-center justify-center gap-2 mb-3">
  <!-- Glitch Logo Box -->
  <div class="relative w-10 h-10 flex-shrink-0">
    <div class="absolute inset-0 bg-emerald-700 rounded-xl translate-x-0.5 translate-y-0.5 opacity-60"></div>
    <div class="absolute inset-0 bg-emerald-900 rounded-xl -translate-x-0.5 -translate-y-0.5 opacity-40"></div>
    <div class="relative w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md">
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
  </div>
  <!-- Glitch Text -->
  <div class="relative">
    <span class="absolute top-0 left-0 text-3xl font-black uppercase tracking-tighter text-emerald-700 opacity-60" style="transform: translate(1.5px, 1px);">Glitch</span>
    <span class="absolute top-0 left-0 text-3xl font-black uppercase tracking-tighter text-emerald-900 opacity-40" style="transform: translate(-1.5px, -1px);">Glitch</span>
    <span class="relative text-3xl font-black uppercase tracking-tighter text-white">Glitch</span>
  </div>
</div>
          <p class="text-white/70 text-sm">Create your premium account</p>
        </div>

        <!-- Info Message -->
        <div class="bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-xs px-4 py-3 rounded-xl mb-4 text-center">
          ℹ️ Registration uses DummyJSON simulation. Use the demo account to sign in.
        </div>

        <!-- Form -->
        <div class="space-y-4">
          <!-- Full Name -->
          <div>
            <label class="text-white/70 text-xs uppercase tracking-wide font-semibold mb-2 block">Full Name</label>
            <input
              v-model="fullName"
              type="text"
              placeholder="Enter your full name"
              class="w-full px-4 py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="text-white/70 text-xs uppercase tracking-wide font-semibold mb-2 block">Email Address</label>
            <input
              v-model="email"
              type="email"
              placeholder="name@example.com"
              class="w-full px-4 py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="text-white/70 text-xs uppercase tracking-wide font-semibold mb-2 block">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          <!-- Sign Up Button -->
          <button
            @click="handleRegister"
            class="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/30 mt-2"
          >
            CREATE ACCOUNT
          </button>
        </div>

        <!-- Login Link -->
        <p class="text-center text-white/60 text-sm mt-6">
          Already have an account?
          <RouterLink to="/login" class="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
            Sign in
          </RouterLink>
        </p>

        <!-- Back to Home -->
        <p class="text-center mt-4">
          <RouterLink to="/" class="text-white/40 text-xs hover:text-white/60 transition-colors">
            ← Back to Home
          </RouterLink>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../composables/useAuthStore'
import type { Product, ProductsResponse } from '../types/index'

const router = useRouter()
const authStore = useAuthStore()
const fullName = ref('')
const email = ref('')
const password = ref('')
const bgProducts = ref<Product[]>([])

const handleRegister = () => {
  router.push('/login')
}

const fetchBgProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=24')
    const data: ProductsResponse = await response.json()
    bgProducts.value = data.products
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  fetchBgProducts()
  if (authStore.isLoggedIn) router.push('/')
})
</script>