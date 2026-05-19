import { ref, onMounted } from 'vue'
import { useLocalStorage } from './useLocalStorage'
import searchEnginesConfig from '@/config/searchEngines'

/**
 * Search engine management composable
 * 管理搜索引擎选择和搜索功能
 */
export function useSearchEngine() {
  const storage = useLocalStorage()
  const engines = ref([])
  const selectedEngine = ref('')
  const loading = ref(false)
  
  // 加载搜索引擎配置
  const loadEngines = () => {
    engines.value = searchEnginesConfig
    
    // 设置默认选中
    const saved = storage.get('nav_selected_engine')
    if (saved && engines.value.find(e => e.id === saved)) {
      selectedEngine.value = saved
    } else {
      const defaultEngine = engines.value.find(e => e.default)
      selectedEngine.value = defaultEngine?.id || engines.value[0]?.id
    }
  }
  
  // 选择搜索引擎
  const selectEngine = (engineId) => {
    selectedEngine.value = engineId
    storage.set('nav_selected_engine', engineId)
  }
  
  // 执行搜索
  const search = (query) => {
    if (!query.trim()) return
    
    const engine = engines.value.find(e => e.id === selectedEngine.value)
    if (!engine) return
    
    const url = engine.urlTemplate.replace('{query}', encodeURIComponent(query))
    window.open(url, '_blank')
  }
  
  onMounted(() => {
    loadEngines()
  })
  
  return {
    engines,
    selectedEngine,
    selectEngine,
    search,
    loading
  }
}
