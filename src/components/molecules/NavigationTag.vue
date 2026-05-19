<template>
  <div
    class="
      group relative
      bg-white dark:bg-dark-surface
      border border-gray-200 dark:border-dark-border
      rounded-lg px-4 py-3
      hover:shadow-lg dark:hover:shadow-gray-900/50
      hover:-translate-y-1
      transition-all duration-200
      cursor-pointer
      flex items-center
      w-40
      overflow-hidden
    "
    @click="handleClick"
  >
    <div class="flex items-center gap-3 min-w-0 w-full">
      <BaseIcon
        v-if="tag.icon"
        :src="tag.icon"
        :alt="tag.name"
        size="md"
        class="flex-shrink-0"
      />
      
      <span class="
        text-sm font-medium
        text-gray-900 dark:text-gray-100
        truncate
        group-hover:whitespace-normal
        group-hover:overflow-visible
        group-hover:break-words
        transition-all duration-200
      ">
        {{ tag.name }}
      </span>
    </div>
    
    <div
      v-if="editable"
      class="
        absolute top-2 right-2
        flex gap-1
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
      "
      @click.stop
    >
      <button
        type="button"
        @click="handleEdit"
        class="
          p-1.5 rounded
          bg-primary-500 hover:bg-primary-600
          text-white
          focus:outline-none focus:ring-2 focus:ring-primary-500
          transition-colors duration-150
        "
        aria-label="编辑"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
      
      <button
        type="button"
        @click="handleDelete"
        class="
          p-1.5 rounded
          bg-red-500 hover:bg-red-600
          text-white
          focus:outline-none focus:ring-2 focus:ring-red-500
          transition-colors duration-150
        "
        aria-label="删除"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import BaseIcon from '@/components/atoms/BaseIcon.vue'

const props = defineProps({
  tag: {
    type: Object,
    required: true
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'edit', 'delete'])

const handleClick = () => {
  emit('click', props.tag)
}

const handleEdit = () => {
  emit('edit', props.tag)
}

const handleDelete = () => {
  emit('delete', props.tag)
}
</script>
