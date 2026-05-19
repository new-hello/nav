<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
    class="
      inline-flex items-center justify-center
      font-medium rounded-lg
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    "
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const classes = []
  
  // Variant styles
  switch (props.variant) {
    case 'primary':
      classes.push(
        'bg-primary-500 hover:bg-primary-600 text-white',
        'dark:bg-primary-600 dark:hover:bg-primary-700',
        'focus:ring-primary-500'
      )
      break
    case 'secondary':
      classes.push(
        'bg-gray-200 hover:bg-gray-300 text-gray-900',
        'dark:bg-dark-surface dark:hover:bg-dark-hover dark:text-gray-100',
        'focus:ring-gray-400'
      )
      break
    case 'danger':
      classes.push(
        'bg-red-500 hover:bg-red-600 text-white',
        'dark:bg-red-600 dark:hover:bg-red-700',
        'focus:ring-red-500'
      )
      break
    case 'ghost':
      classes.push(
        'bg-transparent hover:bg-gray-100 text-gray-700',
        'dark:hover:bg-dark-surface dark:text-gray-300',
        'focus:ring-gray-400'
      )
      break
  }
  
  // Size styles
  switch (props.size) {
    case 'sm':
      classes.push('px-3 py-1.5 text-sm')
      break
    case 'md':
      classes.push('px-4 py-2 text-base')
      break
    case 'lg':
      classes.push('px-6 py-3 text-lg')
      break
  }
  
  return classes.join(' ')
})

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>
