<template>
  <nav class="sticky top-0 z-50 bg-white/80 dark:bg-[#0d2420]/95 backdrop-blur-md shadow-sm dark:shadow-emerald-900/50 dark:border-b dark:border-emerald-900/30 transition-colors duration-300">
    <div class="container mx-auto px-4 py-3 flex items-center gap-6">

      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 group flex-shrink-0">
  <!-- Glitch Logo Box -->
  <div class="relative w-9 h-9 flex-shrink-0">
    <div class="absolute inset-0 bg-emerald-700 rounded-xl translate-x-0.5 translate-y-0.5 opacity-60"></div>
    <div class="absolute inset-0 bg-emerald-900 rounded-xl -translate-x-0.5 -translate-y-0.5 opacity-40"></div>
    <div class="relative w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
  </div>

  <!-- Glitch Text -->
  <div class="relative">
    <span class="absolute top-0 left-0 text-xl font-black uppercase tracking-tighter text-emerald-700 opacity-60" style="transform: translate(1.5px, 1px);">Glitch</span>
    <span class="absolute top-0 left-0 text-xl font-black uppercase tracking-tighter text-emerald-900 opacity-40" style="transform: translate(-1.5px, -1px);">Glitch</span>
    <span class="relative text-xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">Glitch</span>
  </div>
</RouterLink>

      <!-- Nav Links -->
      <div class="hidden md:flex items-center gap-0 flex-shrink-0">
        <RouterLink to="/" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-white/10">
          HOME
        </RouterLink>
        <RouterLink to="/products" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-white/10">
          CATEGORIES
        </RouterLink>
        <RouterLink to="/products?sort=flash" class="text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 flex items-center gap-1">
  🔥 FLASH DEALS
</RouterLink>
        <RouterLink to="/support" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-white/10">
  SUPPORT
</RouterLink>
      </div>

<div class="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-2"></div>
      <!-- Right Side Icons -->
      <div class="flex items-center gap-2 flex-shrink-0 ml-auto">

        <!-- Notifications Bell -->
<div class="relative" ref="notifDropdownRef">
  <button
    @click="showNotifDropdown = !showNotifDropdown"
    class="relative p-2.5 rounded-xl bg-gray-100 dark:bg-[#111111] hover:bg-emerald-100 dark:hover:bg-white/10 transition-all duration-200 hover:scale-105"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
</svg>
    <span class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{{ unreadCount }}</span>
  </button>

  <!-- Notifications Dropdown -->
  <div
    v-if="showNotifDropdown"
    class="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden"
  >
    <!-- Header -->
    <div class="px-4 py-3 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
      <p class="font-bold text-gray-900 dark:text-white text-sm">Notifications</p>
      <button @click="markAllRead" class="text-xs text-emerald-500 hover:text-emerald-400 transition-colors">
        Mark all read
      </button>
    </div>

    <!-- Notifications List -->
    <div class="max-h-72 overflow-y-auto">
      <div
        v-for="notif in notifications"
        :key="notif.id"
        class="px-4 py-3 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
        :class="!notif.read ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''"
      >
        <div class="flex items-start gap-3">
          <span class="text-xl flex-shrink-0">{{ notif.icon }}</span>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ notif.title }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ notif.message }}</p>
            <p class="text-xs text-emerald-500 mt-1">{{ notif.time }}</p>
          </div>
          <div v-if="!notif.read" class="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-1"></div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-4 py-3 text-center">
      <p class="text-xs text-gray-400 dark:text-gray-500">You're all caught up! 🎉</p>
    </div>
  </div>
</div>

        <!-- Favourites Button -->
        <RouterLink
          to="/favourites"
          class="relative p-2.5 rounded-xl bg-gray-100 dark:bg-[#111111] hover:bg-emerald-100 dark:hover:bg-white/10 transition-all duration-200 hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>
          <span
            v-if="favouritesStore.totalFavourites > 0"
            class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          >
            {{ favouritesStore.totalFavourites }}
          </span>
        </RouterLink>

        <!-- Cart Button -->
        <RouterLink
          to="/cart"
          class="relative p-2.5 rounded-xl bg-gray-100 dark:bg-[#111111] hover:bg-emerald-100 dark:hover:bg-white/10 transition-all duration-200 hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
</svg>
          <span
            v-if="cartStore.totalItems > 0"
            class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          >
            {{ cartStore.totalItems }}
          </span>
        </RouterLink>

        <!-- User Dropdown -->
        <div class="relative" ref="userDropdownRef">
          <button
            @click="showUserDropdown = !showUserDropdown"
            class="relative p-2.5 rounded-xl bg-gray-100 dark:bg-[#111111] hover:bg-emerald-100 dark:hover:bg-white/10 transition-all duration-200 hover:scale-105"
          >
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-md"
  :class="authStore.isLoggedIn ? 'bg-emerald-500' : 'bg-gray-400 dark:bg-gray-600'"
>
  <span v-if="authStore.isLoggedIn">
    {{ authStore.user?.firstName?.charAt(0).toUpperCase() }}
  </span>
  <svg v-else class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
</div>  
            <span v-if="authStore.isLoggedIn" class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900"></span>
          </button>

          <!-- Dropdown -->
          <div
            v-if="showUserDropdown"
            class="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            <template v-if="authStore.isLoggedIn">
              <div class="px-4 py-3 border-b border-gray-100 dark:border-white/10">
                <p class="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</p>
              </div>
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                🚪 Logout
              </button>
            </template>

            <template v-else>
              <div class="px-4 py-3 border-b border-gray-100 dark:border-white/10">
  <p class="text-sm font-bold tracking-tight text-gray-900 dark:text-white">Welcome to <span class="text-emerald-500">Glitch!</span></p>
  <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Your next-gen store</p>
</div>
              <RouterLink
  to="/login"
  @click="showUserDropdown = false"
  class="flex items-center gap-2 px-4 py-3 text-sm font-bold tracking-tight text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
  </svg>
  Sign In
</RouterLink>
<RouterLink
  to="/register"
  @click="showUserDropdown = false"
  class="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
  Create Account
</RouterLink>
            </template>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-px h-5 bg-gray-200 dark:bg-gray-700"></div>

       <!-- Dark Mode Toggle -->
<div class="flex items-center gap-1.5">
  <!-- Sun icon -->
  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>

  <!-- Toggle -->
  <button
    @click="$emit('toggleDark')"
    class="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none"
    :class="isDark ? 'bg-emerald-500' : 'bg-gray-300'"
  >
    <span
      class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300"
      :class="isDark ? 'translate-x-6' : 'translate-x-0'"
    ></span>
  </button>

  <!-- Moon icon -->
  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
</div>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../composables/useCartStore'
import { useFavouritesStore } from '../composables/useFavouritesStore'
import { useAuthStore } from '../composables/useAuthStore'
import { useRouter } from 'vue-router'

defineProps<{
  isDark: boolean
}>()

defineEmits<{
  toggleDark: []
}>()

const cartStore = useCartStore()
const favouritesStore = useFavouritesStore()
const authStore = useAuthStore()
const router = useRouter()

const showUserDropdown = ref(false)
const showNotifDropdown = ref(false)
const notifDropdownRef = ref<HTMLElement | null>(null)

const notifications = ref([
  { id: 1, icon: '🔥', title: 'Flash Deals Live!', message: 'Up to 20% off on selected items today only!', time: '2 mins ago', read: false },
  { id: 2, icon: '📦', title: 'New Arrivals', message: 'Check out the latest products just added to Glitch!', time: '1 hour ago', read: false },
  { id: 3, icon: '💳', title: 'Special Offer', message: 'Free shipping on orders above $50 this weekend!', time: '3 hours ago', read: false },
  { id: 4, icon: '⭐', title: 'Top Rated Products', message: 'See what customers are loving this week!', time: '1 day ago', read: true },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const markAllRead = () => {
  notifications.value.forEach(n => n.read = true)
}
const userDropdownRef = ref<HTMLElement | null>(null)


const handleLogout = () => {
  authStore.logout()
  showUserDropdown.value = false
  router.push('/')
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    if (userDropdownRef.value && !userDropdownRef.value.contains(e.target as Node)) {
      showUserDropdown.value = false
    }
    if (notifDropdownRef.value && !notifDropdownRef.value.contains(e.target as Node)) {
      showNotifDropdown.value = false
    }
  })
})
</script>