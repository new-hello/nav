/**
 * 文件处理工具
 * 提供文件导入导出和转换功能
 */

/**
 * 导出数据为 JSON 文件
 * @param {Object} data - 要导出的数据
 * @param {string} filename - 文件名（不含扩展名）
 */
export function exportToJson(data, filename) {
  try {
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.json`
    
    // 触发下载
    document.body.appendChild(link)
    link.click()
    
    // 清理
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    return true
  } catch (error) {
    console.error('Failed to export JSON:', error)
    return false
  }
}

/**
 * 从 JSON 文件导入数据
 * @param {File} file - 文件对象
 * @returns {Promise<Object>} 解析后的数据
 */
export async function importFromJson(file) {
  try {
    const text = await file.text()
    const data = JSON.parse(text)
    return data
  } catch (error) {
    console.error('Failed to import JSON:', error)
    throw new Error('文件解析失败，请确保文件格式正确')
  }
}

/**
 * 将文件转换为 base64 字符串
 * @param {File} file - 文件对象
 * @returns {Promise<string>} base64 字符串
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = () => {
      resolve(reader.result)
    }
    
    reader.onerror = () => {
      reject(new Error('文件读取失败'))
    }
    
    reader.readAsDataURL(file)
  })
}

/**
 * 从 base64 字符串创建 Blob
 * @param {string} base64 - base64 字符串
 * @param {string} mimeType - MIME 类型
 * @returns {Blob}
 */
export function base64ToBlob(base64, mimeType) {
  const byteString = atob(base64.split(',')[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  
  return new Blob([ab], { type: mimeType })
}

/**
 * 预加载图片
 * @param {string} url - 图片 URL
 * @returns {Promise<void>}
 */
export function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject(new Error('图片加载失败'))
    img.src = url
  })
}

/**
 * 获取文件扩展名
 * @param {string} filename - 文件名
 * @returns {string}
 */
export function getFileExtension(filename) {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
