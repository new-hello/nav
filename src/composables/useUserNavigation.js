import { ref } from 'vue'
import { useLocalStorage } from './useLocalStorage'
import { validateNavigationTag, validateConfigContent } from '@/services/validators'
import { exportToJson, importFromJson } from '@/utils/fileUtils'

/**
 * User navigation management composable
 * 管理用户自定义导航标签的增删改查和导入导出
 */
export function useUserNavigation() {
  const storage = useLocalStorage()
  const tags = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  // 初始化：从 LocalStorage 加载
  const loadTags = () => {
    const saved = storage.get('nav_user_tags', [])
    tags.value = saved
  }
  
  // 保存到 LocalStorage
  const saveTags = () => {
    const success = storage.set('nav_user_tags', tags.value)
    if (!success) {
      error.value = 'LocalStorage 空间不足，无法保存'
      return false
    }
    return true
  }
  
  // 添加标签
  const addTag = (tag) => {
    const validation = validateNavigationTag(tag)
    if (!validation.valid) {
      error.value = validation.error
      return
    }
    
    tags.value.push(tag)
    saveTags()
    error.value = null
  }
  
  // 更新标签
  const updateTag = (index, updates) => {
    if (index < 0 || index >= tags.value.length) return
    
    const updatedTag = {
      ...tags.value[index],
      ...updates
    }
    
    const validation = validateNavigationTag(updatedTag)
    if (!validation.valid) {
      error.value = validation.error
      return
    }
    
    tags.value[index] = updatedTag
    saveTags()
    error.value = null
  }
  
  // 删除标签
  const deleteTag = (index) => {
    if (index < 0 || index >= tags.value.length) return
    tags.value.splice(index, 1)
    saveTags()
    error.value = null
  }
  
  // 移动标签位置
  const moveTag = (fromIndex, toIndex) => {
    if (fromIndex < 0 || fromIndex >= tags.value.length) return
    if (toIndex < 0 || toIndex >= tags.value.length) return
    
    const [movedTag] = tags.value.splice(fromIndex, 1)
    tags.value.splice(toIndex, 0, movedTag)
    saveTags()
  }
  
  // 导出配置
  const exportConfig = () => {
    const config = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      tags: tags.value
    }
    
    exportToJson(config, `navigation-config-${Date.now()}.json`)
  }
  
  // 导入配置
  const importConfig = async (file, mode = 'replace') => {
    loading.value = true
    error.value = null
    
    try {
      const config = await importFromJson(file)
      
      // 验证配置内容
      const validation = validateConfigContent(config)
      if (!validation.valid) {
        throw new Error(validation.error)
      }
      
      // 根据模式处理标签
      if (mode === 'merge') {
        // 合并模式：保留现有标签，追加新标签
        tags.value = [...tags.value, ...config.tags]
      } else {
        // 覆盖模式：替换所有标签
        tags.value = config.tags
      }
      
      saveTags()
    } catch (e) {
      error.value = e.message || '导入失败'
    } finally {
      loading.value = false
    }
  }
  
  // 初始化加载
  loadTags()
  
  return {
    tags,
    addTag,
    updateTag,
    deleteTag,
    moveTag,
    exportConfig,
    importConfig,
    loading,
    error
  }
}
