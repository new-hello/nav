import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 源文件夹和目标文件夹
const sourceDir = path.join(__dirname, '../public/icons/AI')
const targetDir = path.join(__dirname, '../public/icons/AITools')

// 统计信息
let stats = {
  copied: 0,
  deleted: 0,
  skipped: 0,
  errors: 0
}

// 文件夹映射
const folderMapping = {
  'Chat': 'Chat',      // AI/Chat -> AITools/Chat
  'Coding': 'Coding',  // AI/Coding -> AITools/Coding
  'Image': 'Image',    // AI/Image -> AITools/Image
  'Video': 'Video'     // AI/Video -> AITools/Video
}

// 复制文件并删除占位符
function copyAndReplace(sourceFile, targetFolder, fileName) {
  try {
    const targetFile = path.join(targetFolder, fileName)
    const placeholderFile = path.join(targetFolder, path.parse(fileName).name + '.png')
    
    // 确保目标文件夹存在
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true })
    }
    
    // 如果目标文件已存在且不是占位符，跳过
    if (fs.existsSync(targetFile)) {
      const fileSize = fs.statSync(targetFile).size
      if (fileSize > 100) {
        console.log(`  ⏭️  ${fileName} - 已存在真实文件，跳过`)
        stats.skipped++
        return
      }
    }
    
    // 复制文件
    fs.copyFileSync(sourceFile, targetFile)
    console.log(`  ✅ ${fileName} - 已复制`)
    stats.copied++
    
    // 如果是 svg/jpg 文件，删除对应的 png 占位符
    const ext = path.extname(fileName).toLowerCase()
    if (ext !== '.png' && fs.existsSync(placeholderFile)) {
      const placeholderSize = fs.statSync(placeholderFile).size
      if (placeholderSize <= 100) {
        fs.unlinkSync(placeholderFile)
        console.log(`    🗑️  删除占位符: ${path.basename(placeholderFile)}`)
        stats.deleted++
      }
    }
    
    // 如果是 png 文件且替换了占位符
    if (ext === '.png') {
      console.log(`    🔄 替换占位符`)
    }
    
  } catch (error) {
    console.error(`  ❌ 处理失败 ${fileName}: ${error.message}`)
    stats.errors++
  }
}

// 处理文件夹
function processFolder(sourceFolderPath, targetFolderPath, folderName) {
  console.log(`\n📂 处理文件夹: ${folderName}`)
  
  if (!fs.existsSync(sourceFolderPath)) {
    console.log(`  ⚠️  源文件夹不存在`)
    return
  }
  
  const files = fs.readdirSync(sourceFolderPath)
  
  files.forEach(file => {
    const sourceFile = path.join(sourceFolderPath, file)
    const stat = fs.statSync(sourceFile)
    
    if (stat.isFile()) {
      copyAndReplace(sourceFile, targetFolderPath, file)
    }
  })
}

// 主函数
function main() {
  console.log('🚀 开始从 AI 文件夹复制图标到 AITools 文件夹...\n')
  console.log('=' .repeat(60))
  
  // 遍历映射
  Object.entries(folderMapping).forEach(([sourceFolder, targetFolder]) => {
    const sourcePath = path.join(sourceDir, sourceFolder)
    const targetPath = path.join(targetDir, targetFolder)
    
    processFolder(sourcePath, targetPath, sourceFolder)
  })
  
  console.log('\n' + '='.repeat(60))
  console.log('\n📊 处理统计:')
  console.log(`  ✅ 复制文件: ${stats.copied}`)
  console.log(`  🗑️  删除占位符: ${stats.deleted}`)
  console.log(`  ⏭️  跳过文件: ${stats.skipped}`)
  console.log(`  ❌ 错误: ${stats.errors}`)
  
  console.log(`\n✨ 处理完成！`)
}

// 执行
try {
  main()
} catch (error) {
  console.error('❌ 执行失败:', error)
  console.error(error.stack)
}
