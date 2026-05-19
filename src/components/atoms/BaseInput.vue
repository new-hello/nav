<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="handleInput"
    @focus="isFocused = true"
    @blur="isFocused = false"
    :class="inputClasses"
    class="
      w-full px-4 py-2 rounded-lg
      border transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    "
  />
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'url', 'file'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)

const inputClasses = computed(() => {
  const classes = []
  
  // Base styles
  classes.push(
    'bg-white dark:bg-dark-surface',
    'text-gray-900 dark:text-gray-100',
    'placeholder-gray-400 dark:placeholder-gray-500'
  )
  
  // Border and focus styles
  if (isFocused.value) {
    classes.push(
      'border-primary-500 dark:border-primary-600',
      'ring-primary-500 dark:ring-primary-600'
    )
  } else {
    classes.push(
      'border-gray-300 dark:border-dark-border',
      'hover:border-gray-400 dark:hover:border-gray-500'
    )
  }
  
  return classes.join(' ')
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
