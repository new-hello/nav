<template>
  <div class="bg-white dark:bg-dark-surface rounded-lg shadow-lg p-6 max-w-md w-full">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
      {{ mode === 'create' ? '添加导航标签' : '编辑导航标签' }}
    </h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- 名称输入 -->
      <div>
        <label for="tag-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          名称
        </label>
        <BaseInput
          id="tag-name"
          v-model="formData.name"
          type="text"
          placeholder="请输入标签名称"
          :disabled="loading"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600 dark:text-red-400">
          {{ errors.name }}
        </p>
      </div>

      <!-- URL 输入 -->
      <div>
        <label for="tag-url" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          URL
        </label>
        <BaseInput
          id="tag-url"
          v-model="formData.url"
          type="url"
          placeholder="https://example.com"
          :disabled="loading"
        />
        <p v-if="errors.url" class="mt-1 text-sm text-red-600 dark:text-red-400">
          {{ errors.url }}
        </p>
      </div>

      <!-- 图标输入 -->
      <div>
        <label for="tag-icon" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          图标 URL（可选）
        </label>
        <BaseInput
          id="tag-icon"
          v-model="formData.icon"
          type="url"
          placeholder="https://example.com/icon.png"
          :disabled="loading"
        />
        <p v-if="errors.icon" class="mt-1 text-sm text-red-600 dark:text-red-400">
          {{ errors.icon }}
        </p>
      </div>

      <!-- 按钮组 -->
      <div class="flex gap-3 pt-2">
        <BaseButton
          type="submit"
          variant="primary"
          :disabled="loading"
          class="flex-1"
        >
          {{ mode === 'create' ? '添加' : '保存' }}
        </BaseButton>
        <BaseButton
          type="button"
          variant="secondary"
          :disabled="loading"
          @click="handleCancel"
          class="flex-1"
        >
          取消
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

const props = defineProps({
  tag: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit'].includes(value)
  }
})

const emit = defineEmits(['submit', 'cancel'])

const loading = ref(false)
const formData = reactive({
  name: '',
  url: '',
  icon: ''
})

const errors = reactive({
  name: '',
  url: '',
  icon: ''
})

// 初始化表单数据
watch(() => props.tag, (newTag) => {
  if (newTag && props.mode === 'edit') {
    formData.name = newTag.name || ''
    formData.url = newTag.url || ''
    formData.icon = newTag.icon || ''
  }
}, { immediate: true })

// 验证表单
const validateForm = () => {
  let isValid = true
  
  // 重置错误
  errors.name = ''
  errors.url = ''
  errors.icon = ''
  
  // 验证名称
  if (!formData.name.trim()) {
    errors.name = '请输入标签名称'
    isValid = false
  } else if (formData.name.length > 50) {
    errors.name = '名称不能超过50个字符'
    isValid = false
  }
  
  // 验证 URL
  if (!formData.url.trim()) {
    errors.url = '请输入 URL'
    isValid = false
  } else {
    try {
      new URL(formData.url)
    } catch {
      errors.url = '请输入有效的 URL'
      isValid = false
    }
  }
  
  // 验证图标（可选）
  if (formData.icon.trim()) {
    try {
      new URL(formData.icon)
    } catch {
      errors.icon = '请输入有效的图标 URL'
      isValid = false
    }
  }
  
  return isValid
}

// 提交表单
const handleSubmit = () => {
  if (!validateForm()) {
    return
  }
  
  const tagData = {
    name: formData.name.trim(),
    url: formData.url.trim(),
    icon: formData.icon.trim() || undefined
  }
  
  emit('submit', tagData)
}

// 取消操作
const handleCancel = () => {
  emit('cancel')
}
</script>
