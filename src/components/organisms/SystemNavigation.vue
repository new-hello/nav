<template>
  <div class="w-full">
    <!-- 一级分类导航标签 -->
    <div class="mb-8 sticky top-0 bg-white dark:bg-gray-900 py-4 z-10 border-b border-gray-200 dark:border-gray-700">
      <div class="flex flex-wrap gap-3">
        <button
          v-for="(category, catIndex) in categories"
          :key="catIndex"
          @click="scrollToCategory(catIndex)"
          class="
            px-6 py-2.5 rounded-lg
            bg-gray-100 hover:bg-gray-200
            dark:bg-gray-800 dark:hover:bg-gray-700
            text-gray-700 dark:text-gray-200
            font-medium
            transition-all duration-200
            hover:shadow-md
            border border-gray-200 dark:border-gray-700
          "
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <!-- 错误提示 -->
    <div
      v-if="error"
      class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
    >
      <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
    </div>

    <!-- 加载状态 -->
    <div
      v-if="loading"
      class="text-center py-12"
    >
      <p class="text-gray-500 dark:text-gray-400">加载中...</p>
    </div>

    <!-- 分类列表 - 每个一级分类独立显示 -->
    <div v-else-if="categories.length > 0" class="space-y-8">
      <div
        v-for="(category, catIndex) in categories"
        :key="catIndex"
        :ref="el => setCategoryRef(el, catIndex)"
        class="space-y-4 scroll-mt-24"
      >
        <!-- 如果有二级分类，显示二级分类按钮 -->
        <div v-if="category.subcategories && category.subcategories.length > 0">
          <!-- 一级分类标题和二级分类按钮在同一行 -->
          <div class="flex items-center gap-4 border-b-2 border-primary-500 pb-2 mb-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
              {{ category.name }}
            </h3>
            
            <!-- 二级分类按钮 -->
            <div class="flex gap-2 flex-1">
              <button
                v-for="(subcategory, subIndex) in category.subcategories"
                :key="subIndex"
                @click="setActiveSubcategory(catIndex, subIndex)"
                :class="[
                  'px-4 py-1.5 rounded-lg text-base font-medium transition-colors duration-200',
                  isActiveSubcategory(catIndex, subIndex)
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-hover'
                ]"
              >
                {{ subcategory.name }}
              </button>
            </div>
          </div>

          <!-- 二级分类的标签列表 -->
          <div class="flex flex-wrap gap-3">
            <NavigationTag
              v-for="(tag, tagIndex) in getTagsForSubcategory(catIndex, activeSubcategories[catIndex])"
              :key="tagIndex"
              :tag="tag"
              :editable="false"
              @click="handleTagClick"
            />
          </div>

          <!-- 空状态 -->
          <div
            v-if="getTagsForSubcategory(catIndex, activeSubcategories[catIndex]).length === 0"
            class="text-center py-8 text-gray-500 dark:text-gray-400 text-sm"
          >
            该分类暂无标签
          </div>
        </div>

        <!-- 如果没有二级分类，直接显示一级分类下的标签 -->
        <div v-else>
          <!-- 一级分类标题 -->
          <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 border-b-2 border-primary-500 pb-2 mb-4">
            {{ category.name }}
          </h3>
          
          <div class="flex flex-wrap gap-3">
            <NavigationTag
              v-for="(tag, tagIndex) in (category.tags || [])"
              :key="tagIndex"
              :tag="tag"
              :editable="false"
              @click="handleTagClick"
            />
          </div>

          <!-- 空状态 -->
          <div
            v-if="!category.tags || category.tags.length === 0"
            class="text-center py-8 text-gray-500 dark:text-gray-400 text-sm"
          >
            该分类暂无标签
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div
      v-else
      class="text-center py-12 bg-gray-50 dark:bg-dark-surface rounded-lg border-2 border-dashed border-gray-300 dark:border-dark-border"
    >
      <p class="text-gray-500 dark:text-gray-400">
        暂无系统导航配置
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useSystemNavigation } from '@/composables/useSystemNavigation'
import NavigationTag from '@/components/molecules/NavigationTag.vue'

const {
  categories,
  loading,
  error
} = useSystemNavigation()

// 每个一级分类的当前选中二级分类（使用对象存储）
const activeSubcategories = ref({})

// 存储分类元素的引用
const categoryRefs = ref({})

// 设置分类元素引用
const setCategoryRef = (el, index) => {
  if (el) {
    categoryRefs.value[index] = el
  }
}

// 滚动到指定分类
const scrollToCategory = (categoryIndex) => {
  const element = categoryRefs.value[categoryIndex]
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 设置当前选中的二级分类
const setActiveSubcategory = (categoryIndex, subcategoryIndex) => {
  activeSubcategories.value[categoryIndex] = subcategoryIndex
}

// 判断是否为当前选中的二级分类
const isActiveSubcategory = (categoryIndex, subcategoryIndex) => {
  return activeSubcategories.value[categoryIndex] === subcategoryIndex
}

// 获取指定二级分类的标签
const getTagsForSubcategory = (categoryIndex, subcategoryIndex) => {
  if (subcategoryIndex === null || subcategoryIndex === undefined) return []
  
  const category = categories.value[categoryIndex]
  if (!category) return []
  
  const subcategory = category.subcategories?.[subcategoryIndex]
  if (!subcategory || !subcategory.tags) return []
  
  return subcategory.tags
}

// 初始化：为每个一级分类选中第一个二级分类
watch(categories, (newCategories) => {
  newCategories.forEach((category, index) => {
    if (category.subcategories && category.subcategories.length > 0) {
      // 如果还没有选中的二级分类，选中第一个（索引 0）
      if (activeSubcategories.value[index] === undefined) {
        activeSubcategories.value[index] = 0
      }
    }
  })
}, { immediate: true })

const handleTagClick = (tag) => {
  if (tag.url) {
    window.open(tag.url, '_blank')
  }
}
</script>
