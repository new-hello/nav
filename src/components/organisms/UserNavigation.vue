<template>
  <div class="w-full">
    <!-- 标题和操作按钮 -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
        我的导航
      </h2>
      <div class="flex gap-2">
        <BaseButton
          variant="secondary"
          size="sm"
          @click="handleExport"
          :disabled="tags.length === 0"
        >
          导出
        </BaseButton>
        <BaseButton
          variant="secondary"
          size="sm"
          @click="openImportModeDialog"
        >
          导入
        </BaseButton>
        <BaseButton
          variant="primary"
          size="sm"
          @click="openAddModal"
        >
          添加标签
        </BaseButton>
      </div>
    </div>

    <!-- 错误提示 -->
    <div
      v-if="error"
      class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
    >
      <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
    </div>

    <!-- 标签网格 -->
    <div
      v-if="tags.length > 0"
      class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
    >
      <NavigationTag
        v-for="(tag, index) in tags"
        :key="index"
        :tag="tag"
        :editable="true"
        @click="handleTagClick"
        @edit="openEditModal(tag, index)"
        @delete="handleDelete(tag, index)"
      />
    </div>

    <!-- 空状态 -->
    <div
      v-else
      class="text-center py-12 bg-gray-50 dark:bg-dark-surface rounded-lg border-2 border-dashed border-gray-300 dark:border-dark-border"
    >
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        还没有添加任何导航标签
      </p>
      <BaseButton variant="primary" @click="openAddModal">
        添加第一个标签
      </BaseButton>
    </div>

    <!-- 添加/编辑表单 Modal -->
    <Teleport to="body">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="closeModal"
      >
        <NavigationTagForm
          :tag="editingTag"
          :mode="modalMode"
          @submit="handleFormSubmit"
          @cancel="closeModal"
        />
      </div>
    </Teleport>

    <!-- 删除确认 Modal -->
    <Teleport to="body">
      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="closeDeleteConfirm"
      >
        <div class="bg-white dark:bg-dark-surface rounded-lg shadow-lg p-6 max-w-sm w-full">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            确认删除
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            确定要删除标签 "{{ deletingTag?.name }}" 吗？此操作无法撤销。
          </p>
          <div class="flex gap-3">
            <BaseButton
              variant="danger"
              @click="confirmDelete"
              class="flex-1"
            >
              删除
            </BaseButton>
            <BaseButton
              variant="secondary"
              @click="closeDeleteConfirm"
              class="flex-1"
            >
              取消
            </BaseButton>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- 导入模式选择 Modal -->
    <Teleport to="body">
      <div
        v-if="showImportModeDialog"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="closeImportModeDialog"
      >
        <div class="bg-white dark:bg-dark-surface rounded-lg shadow-lg p-6 max-w-md w-full">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            选择导入模式
          </h3>
          
          <!-- 重要提示 -->
          <div class="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div class="flex flex-col items-center gap-2 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600 dark:text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p class="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-1">
                  重要提示
                </p>
                <p class="text-sm text-yellow-700 dark:text-yellow-400">
                  建议先导出备份当前配置，再进行导入操作
                </p>
              </div>
            </div>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            请选择导入模式
          </p>
          
          <div class="space-y-3 mb-6">
            <!-- 合并模式 -->
            <button
              @click="selectImportMode('merge')"
              class="w-full p-4 text-left border-2 border-gray-200 dark:border-dark-border rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
            >
              <div class="font-medium text-gray-900 dark:text-gray-100 mb-1">
                合并模式
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                保留现有标签，将导入的标签添加到后面
              </div>
            </button>
            
            <!-- 覆盖模式 -->
            <button
              @click="selectImportMode('replace')"
              class="w-full p-4 text-left border-2 border-gray-200 dark:border-dark-border rounded-lg hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <div class="font-medium text-gray-900 dark:text-gray-100 mb-1">
                覆盖模式
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                清空现有标签，只保留导入的内容
              </div>
            </button>
          </div>
          
          <BaseButton
            variant="secondary"
            @click="closeImportModeDialog"
            class="w-full"
          >
            取消
          </BaseButton>
        </div>
      </div>
    </Teleport>

    <!-- 隐藏的文件输入 -->
    <input
      ref="fileInput"
      type="file"
      accept="application/json"
      class="hidden"
      @change="handleImport"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserNavigation } from '@/composables/useUserNavigation'
import NavigationTag from '@/components/molecules/NavigationTag.vue'
import NavigationTagForm from '@/components/organisms/NavigationTagForm.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

const {
  tags,
  addTag,
  updateTag,
  deleteTag,
  exportConfig,
  importConfig,
  loading,
  error
} = useUserNavigation()

const showModal = ref(false)
const modalMode = ref('create')
const editingTag = ref(null)
const editingIndex = ref(null)
const showDeleteConfirm = ref(false)
const deletingTag = ref(null)
const deletingIndex = ref(null)
const showImportModeDialog = ref(false)
const selectedImportMode = ref(null)
const fileInput = ref(null)

// 打开导入模式选择对话框
const openImportModeDialog = () => {
  selectedImportMode.value = null
  showImportModeDialog.value = true
}

// 选择导入模式并触发文件选择
const selectImportMode = (mode) => {
  selectedImportMode.value = mode
  closeImportModeDialog()
  // 延迟触发文件选择，确保对话框已关闭
  setTimeout(() => {
    triggerImport()
  }, 100)
}

// 关闭导入模式对话框
const closeImportModeDialog = () => {
  showImportModeDialog.value = false
}

// 打开添加 Modal
const openAddModal = () => {
  modalMode.value = 'create'
  editingTag.value = null
  editingIndex.value = null
  showModal.value = true
}

// 打开编辑 Modal
const openEditModal = (tag, index) => {
  modalMode.value = 'edit'
  editingTag.value = tag
  editingIndex.value = index
  showModal.value = true
}

// 关闭 Modal
const closeModal = () => {
  showModal.value = false
  editingTag.value = null
  editingIndex.value = null
}

// 处理表单提交
const handleFormSubmit = (tagData) => {
  if (modalMode.value === 'create') {
    addTag(tagData)
  } else {
    updateTag(editingIndex.value, tagData)
  }
  closeModal()
}

// 处理标签点击
const handleTagClick = (tag) => {
  window.open(tag.url, '_blank')
}

// 处理删除
const handleDelete = (tag, index) => {
  deletingTag.value = tag
  deletingIndex.value = index
  showDeleteConfirm.value = true
}

// 确认删除
const confirmDelete = () => {
  if (deletingIndex.value !== null) {
    deleteTag(deletingIndex.value)
  }
  closeDeleteConfirm()
}

// 关闭删除确认
const closeDeleteConfirm = () => {
  showDeleteConfirm.value = false
  deletingTag.value = null
  deletingIndex.value = null
}

// 导出配置
const handleExport = () => {
  exportConfig()
}

// 触发导入
const triggerImport = () => {
  fileInput.value?.click()
}

// 处理导入
const handleImport = async (event) => {
  const file = event.target.files?.[0]
  if (file && selectedImportMode.value) {
    await importConfig(file, selectedImportMode.value)
    selectedImportMode.value = null
  }
  // 重置文件输入
  event.target.value = ''
}
</script>
