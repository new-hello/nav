<template>
  <div 
    class="min-h-screen transition-all duration-300 bg-white dark:bg-gray-900"
    :style="backgroundStyle"
  >
    <!-- Semi-transparent overlay for content readability (only when custom background is set) -->
    <div v-if="background" class="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm -z-10"></div>
    
    <!-- Main content layer -->
    <div class="relative min-h-screen flex flex-col">
      <!-- Disclaimer Banner -->
      <div v-if="showDisclaimer" class="w-full bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2 px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <strong>免责声明：</strong>本页面提供的链接仅供参考，不构成任何形式的推荐或背书。请用户自行判断相关网站内容的真实性和安全性。链接更新时间为：2026-05-20
        <button @click="showDisclaimer = false" class="ml-2 underline hover:no-underline text-gray-500 dark:text-gray-500">关闭</button>
      </div>

      <!-- Header with theme toggle and settings -->
      <header class="w-full py-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto flex justify-end items-center gap-4">
          <ThemeToggle />
          <button
            @click="showSettings = !showSettings"
            class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="打开设置"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      <!-- Main content -->
      <main class="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
        <div class="max-w-5xl mx-auto space-y-12">
          <!-- Search Bar Section -->
          <section class="flex justify-center">
            <SearchBar />
          </section>

          <!-- User Navigation Section -->
          <section>
            <UserNavigation />
          </section>

          <!-- System Navigation Section -->
          <section>
            <SystemNavigation />
          </section>
        </div>
      </main>

      <!-- Footer -->
      <footer class="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <p>导航页面 &copy; {{ currentYear }}</p>
        </div>
      </footer>
    </div>

    <!-- Settings Modal -->
    <Transition name="modal">
      <div
        v-if="showSettings"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="showSettings = false"
      >
        <div class="relative">
          <button
            @click="showSettings = false"
            class="absolute -top-2 -right-2 z-10 bg-white dark:bg-dark-surface rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <BackgroundSettings />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBackground } from '@/composables/useBackground'
import SearchBar from '@/components/molecules/SearchBar.vue'
import UserNavigation from '@/components/organisms/UserNavigation.vue'
import SystemNavigation from '@/components/organisms/SystemNavigation.vue'
import ThemeToggle from '@/components/atoms/ThemeToggle.vue'
import BackgroundSettings from '@/components/organisms/BackgroundSettings.vue'

const { background } = useBackground()
const showSettings = ref(false)
const showDisclaimer = ref(true)

const currentYear = new Date().getFullYear()

const backgroundStyle = computed(() => {
  if (!background.value) {
    // No custom background - let Tailwind classes handle it
    return {}
  }
  
  return {
    backgroundImage: `url(${background.value})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  }
})
</script>

<style scoped>
/* Ensure smooth transitions for theme changes */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Modal transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
</style>
