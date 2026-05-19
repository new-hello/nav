<template>
  <div 
    class="min-h-screen flex items-center justify-center transition-all duration-300 bg-white dark:bg-gray-900"
    :style="backgroundStyle"
  >
    <!-- Semi-transparent overlay for content readability (only when custom background is set) -->
    <div v-if="background" class="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm -z-10"></div>
    
    <!-- Main content layer -->
    <div class="relative w-full px-4">
      <!-- Theme toggle in top right corner -->
      <div class="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <!-- Centered search bar -->
      <div class="max-w-3xl mx-auto">
        <SearchBar />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBackground } from '@/composables/useBackground'
import SearchBar from '@/components/molecules/SearchBar.vue'
import ThemeToggle from '@/components/atoms/ThemeToggle.vue'

const { background } = useBackground()

const backgroundStyle = computed(() => {
  if (!background.value) {
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
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
