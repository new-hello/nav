<template>
  <div :class="containerClasses" class="inline-flex items-center justify-center">
    <img
      v-if="!imageError"
      :src="src"
      :alt="alt"
      :class="imageClasses"
      @error="handleImageError"
      class="object-contain"
    />
    <div
      v-else
      :class="placeholderClasses"
      class="
        flex items-center justify-center
        bg-gray-200 dark:bg-dark-surface
        text-gray-400 dark:text-gray-600
        rounded
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        :class="iconSize"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Icon'
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const imageError = ref(false)

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
}

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-3 h-3'
    case 'md':
      return 'w-4 h-4'
    case 'lg':
      return 'w-6 h-6'
    default:
      return 'w-4 h-4'
  }
})

const containerClasses = computed(() => sizeMap[props.size] || sizeMap.md)
const imageClasses = computed(() => sizeMap[props.size] || sizeMap.md)
const placeholderClasses = computed(() => sizeMap[props.size] || sizeMap.md)

const handleImageError = () => {
  imageError.value = true
}
</script>
