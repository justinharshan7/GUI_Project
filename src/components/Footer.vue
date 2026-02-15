<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16 transition-colors duration-300">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xs">S</span>
          </div>
          <span class="text-lg font-bold text-indigo-600 dark:text-indigo-400">ShopVue</span>
        </div>

        <!-- Text -->
        <p class="text-gray-400 dark:text-gray-500 text-sm">
          Built with Vue 3 + TypeScript + Tailwind CSS
        </p>

        <!-- Links -->
        <div class="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
          <span>194 Products</span>
          <span>•</span>
          <span>24 Categories</span>
          <span>•</span>
          <span>Powered by DummyJSON</span>
        </div>

      </div>
    </div>
  </footer>
</template>