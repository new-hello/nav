<template>
  <div class="bg-white dark:bg-dark-surface rounded-lg shadow-xl p-6 w-full max-w-md">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
      背景设置
    </h2>

    <!-- 错误提示 -->
    <div
      v-if="error"
      class="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
    >
      <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
    </div>

    <!-- 当前背景预览 -->
    <div v-if="background" class="mb-4">
      <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        当前背景
      </p>
      <div
        class="w-full h-32 rounded-lg bg-cover bg-center border border-gray-200 dark:border-dark-border"
        :style="{ backgroundImage: `url(${background})` }"
      ></div>
    </div>

    <!-- URL 输入 -->
    <div class="mb-4">
      <label for="bg-url" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        图片 URL
      </label>
      <div class="flex gap-2">
        <BaseInput
          id="bg-url"
          v-model="urlInput"
          type="url"
          placeholder="https://example.com/image.jpg"
          :disabled="loading"
          class="flex-1"
        />
        <BaseButton
          variant="primary"
          size="sm"
          @click="handleSetUrl"
          :disabled="loading || !urlInput.trim()"
        >
          应用
        </BaseButton>
      </div>
    </div>

    <!-- 文件上传 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        上传图片
      </label>
      <div class="flex gap-2">
        <BaseButton
          variant="secondary"
          size="sm"
          @click="triggerFileInput"
          :disabled="loading"
          class="flex-1"
        >
          选择文件
        </BaseButton>
        <p v-if="selectedFileName" class="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          {{ selectedFileName }}
        </p>
      </div>
      <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
        支持 JPG、PNG、GIF、WebP 格式，最大 5MB
      </p>
    </div>

    <!-- 移除背景按钮 -->
    <div class="pt-4 border-t border-gray-200 dark:border-dark-border">
      <BaseButton
        variant="danger"
        size="sm"
        @click="handleRemove"
        :disabled="!background || loading"
        class="w-full"
      >
        移除背景
      </BaseButton>
    </div>

    <!-- 加载状态 -->
    <div
      v-if="loading"
      class="mt-4 text-center"
    >
      <p class="text-sm text-gray-500 dark:text-gray-400">处理中...</p>
    </div>

    <!-- 隐藏的文件输入 -->
    <input
      ref="fileInput"
      type="file"
      accept="image/jpeg,image/png,image/gif,image/webp"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBackground } from '@/composables/useBackground'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

const {
  background,
  setBackgroundUrl,
  setBackgroundFile,
  removeBackground,
  validateUrl,
  loading,
  error
} = useBackground()

const urlInput = ref('')
const fileInput = ref(null)
const selectedFileName = ref('')

// 应用 URL 背景
const handleSetUrl = async () => {
  if (!urlInput.value.trim()) return
  
  await setBackgroundUrl(urlInput.value.trim())
  if (!error.value) {
    urlInput.value = ''
  }
}

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileChange = async (event) => {
  const file = event.target.files?.[0]
  if (file) {
    selectedFileName.value = file.name
    await setBackgroundFile(file)
    
    // 重置文件输入
    event.target.value = ''
    if (!error.value) {
      selectedFileName.value = ''
    }
  }
}

// 移除背景
const handleRemove = () => {
  removeBackground()
  urlInput.value = ''
  selectedFileName.value = ''
}
</script>
