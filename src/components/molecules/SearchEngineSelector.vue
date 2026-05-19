<template>
  <div class="relative">
    <button
      type="button"
      @click="toggleDropdown"
      class="
        flex items-center gap-2 px-3 py-2 rounded-lg
        bg-white dark:bg-dark-surface
        border border-gray-200 dark:border-dark-border
        text-gray-900 dark:text-gray-100
        hover:bg-gray-50 dark:hover:bg-gray-800
        focus:outline-none focus:ring-2 focus:ring-primary-500
        transition-all duration-200
        min-w-[120px]
      "
    >
      <BaseIcon
        v-if="selectedEngine"
        :src="selectedEngine.icon"
        :alt="selectedEngine.name"
        size="sm"
      />
      <span class="flex-1 text-left text-sm">
        {{ selectedEngine?.name || '选择搜索引擎' }}
      </span>
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="
          absolute z-10 mt-2 w-full min-w-[200px]
          bg-white dark:bg-dark-surface
          border border-gray-200 dark:border-dark-border
          rounded-lg shadow-lg
          overflow-hidden
        "
      >
        <button
          v-for="engine in engines"
          :key="engine.id"
          type="button"
          @click="selectEngine(engine)"
          class="
            w-full flex items-center gap-3 px-4 py-3
            text-left text-sm
            text-gray-900 dark:text-gray-100
            hover:bg-gray-50 dark:hover:bg-gray-800
            transition-colors duration-150
          "
          :class="{
            'bg-primary-50 dark:bg-primary-900/20': modelValue === engine.id
          }"
        >
          <BaseIcon
            :src="engine.icon"
            :alt="engine.name"
            size="sm"
          />
          <span class="flex-1">{{ engine.name }}</span>
          <svg
            v-if="modelValue === engine.id"
            class="w-5 h-5 text-primary-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  engines: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const selectedEngine = computed(() => {
  return props.engines.find(e => e.id === props.modelValue)
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectEngine = (engine) => {
  emit('update:modelValue', engine.id)
  isOpen.value = false
}

const closeDropdown = (event) => {
  if (!event.target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>
