<template>
  <div class="w-full">
    <h3 class="
      text-lg font-semibold
      text-gray-900 dark:text-gray-100
      border-b-2 border-primary-500
      pb-2
      mb-4
    ">
      {{ category.name }}
    </h3>
    
    <div class="
      flex flex-wrap gap-3
    ">
      <NavigationTag
        v-for="tag in sortedTags"
        :key="tag.id"
        :tag="tag"
        :editable="false"
        @click="handleTagClick"
      />
    </div>
    
    <div
      v-if="sortedTags.length === 0"
      class="
        text-center py-8
        text-gray-500 dark:text-gray-400
        text-sm
      "
    >
      该分类暂无标签
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import NavigationTag from './NavigationTag.vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  tags: {
    type: Array,
    required: true
  }
})

const sortedTags = computed(() => {
  return [...props.tags].sort((a, b) => a.order - b.order)
})

const handleTagClick = (tag) => {
  if (tag.url) {
    window.open(tag.url, '_blank')
  }
}
</script>
