<template>
  <div class="
    w-full px-4
    sm:w-4/5 sm:px-0
    md:w-3/4
    lg:w-2/3
    xl:max-w-2xl
    mx-auto
  ">
    <div class="
      flex items-center gap-2
      bg-white dark:bg-dark-surface
      border border-gray-200 dark:border-dark-border
      rounded-lg shadow-md
      p-2
      transition-all duration-200
      focus-within:ring-2 focus-within:ring-primary-500
    ">
      <SearchEngineSelector
        v-model="selectedEngine"
        :engines="engines"
        class="flex-shrink-0"
      />
      
      <div class="w-px h-8 bg-gray-200 dark:bg-dark-border"></div>
      
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        @keyup.enter="handleSearch"
        class="
          flex-1 px-3 py-2
          bg-transparent
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none
          text-sm
        "
      />
      
      <button
        type="button"
        @click="handleSearch"
        :disabled="!searchQuery.trim()"
        class="
          flex-shrink-0 p-2 rounded-lg
          bg-primary-500 hover:bg-primary-600
          text-white
          disabled:bg-gray-300 dark:disabled:bg-gray-700
          disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          transition-all duration-200
        "
        aria-label="搜索"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SearchEngineSelector from './SearchEngineSelector.vue'
import { useSearchEngine } from '@/composables/useSearchEngine'

const { engines, selectedEngine: currentEngine, selectEngine, search } = useSearchEngine()

const searchQuery = ref('')
const selectedEngine = computed({
  get: () => currentEngine.value,
  set: (value) => selectEngine(value)
})

const placeholder = computed(() => {
  const engine = engines.value.find(e => e.id === selectedEngine.value)
  return engine ? `使用 ${engine.name} 搜索...` : '输入搜索内容...'
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    search(searchQuery.value)
    searchQuery.value = ''
  }
}
</script>
