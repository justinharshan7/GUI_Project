<template>
  <footer class="mt-12 bg-white dark:bg-[#111111] border-t border-gray-200 dark:border-white/10">
    <div class="container mx-auto px-4 py-10">
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

        <!-- Brand Section -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
              <span class="font-bold text-lg" style="filter: sepia(1) saturate(3) hue-rotate(180deg) brightness(1.5);">⚡</span>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Glitch</span>
          </div>
          <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Next-gen shopping experience. Discover amazing products at unbeatable prices.
          </p>
          <!-- Social Media Icons -->
          <div class="flex items-center gap-3 mt-4">
            <a href="#" class="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 flex items-center justify-center transition-all hover:scale-110">
              <span class="text-sm">𝕏</span>
            </a>
            <a href="#" class="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 flex items-center justify-center transition-all hover:scale-110">
              <span class="text-sm">📘</span>
            </a>
            <a href="#" class="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 flex items-center justify-center transition-all hover:scale-110">
              <span class="text-sm">📸</span>
            </a>
            <a href="#" class="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 flex items-center justify-center transition-all hover:scale-110">
              <span class="text-sm">▶️</span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><RouterLink to="/" class="text-gray-500 dark:text-gray-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">🏠 Home</RouterLink></li>
            <li><RouterLink to="/products" class="text-gray-500 dark:text-gray-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">📦 All Products</RouterLink></li>
            <li><RouterLink to="/products?sort=flash" class="text-gray-500 dark:text-gray-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">🔥 Flash Deals</RouterLink></li>
            <li><RouterLink to="/favourites" class="text-gray-500 dark:text-gray-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">♥ Favourites</RouterLink></li>
            <li><RouterLink to="/cart" class="text-gray-500 dark:text-gray-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">🛒 Cart</RouterLink></li>
            <li><RouterLink to="/support" class="text-gray-500 dark:text-gray-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">🎧 Support</RouterLink></li>
          </ul>
        </div>

        <!-- Info -->
        <div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">About</h3>
          <ul class="space-y-2">
            <li class="text-gray-500 dark:text-gray-400 text-sm">Built with Vue 3 + TypeScript</li>
            <li class="text-gray-500 dark:text-gray-400 text-sm">Styled with Tailwind CSS</li>
            <li class="text-gray-500 dark:text-gray-400 text-sm">Powered by DummyJSON API</li>
            <li class="text-gray-500 dark:text-gray-400 text-sm">State managed with Pinia</li>
          </ul>
          <div class="mt-4 flex gap-2 flex-wrap">
            <span class="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs px-2 py-1 rounded-lg">Vue 3</span>
            <span class="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs px-2 py-1 rounded-lg">TypeScript</span>
            <span class="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs px-2 py-1 rounded-lg">Tailwind</span>
            <span class="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs px-2 py-1 rounded-lg">Pinia</span>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-200 dark:border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-gray-400 dark:text-gray-500 text-sm">© 2026 Glitch. All rights reserved.</p>
        <p class="text-gray-400 dark:text-gray-500 text-sm">Powered by <span class="text-emerald-500 font-medium">DummyJSON</span></p>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
</script>