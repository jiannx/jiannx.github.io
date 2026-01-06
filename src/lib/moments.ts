import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Moment {
  id: string
  date: string
  images: string[]
  description: string
  location?: string
  content?: string
}

// 递归获取所有 markdown 文件
function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = []
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        // 递归扫描子目录
        files.push(...getAllMarkdownFiles(fullPath))
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
  }
  
  return files
}

// 解析单个时刻（从 post 文件中筛选）
function parseMoment(filePath: string): Moment | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // 只处理带有 images 字段的文件
    if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
      return null
    }
    
    const fileName = path.basename(filePath, '.md')
    const id = fileName
    
    return {
      id,
      date: data.date || new Date().toISOString().split('T')[0],
      images: data.images,
      description: data.description || content.slice(0, 100),
      location: data.location,
      content: content || '',
    }
  } catch (error) {
    console.error(`Error parsing moment ${filePath}:`, error)
    return null
  }
}

// 获取所有时刻
export async function getAllMoments(): Promise<Moment[]> {
  const markdownFiles = getAllMarkdownFiles(postsDirectory)
  
  const moments = markdownFiles
    .map(parseMoment)
    .filter((moment): moment is Moment => moment !== null)
    .sort((a, b) => {
      // 按日期倒序排列
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  
  return moments
}

// 获取最新的时刻
export async function getRecentMoments(limit: number = 3): Promise<Moment[]> {
  const moments = await getAllMoments()
  return moments.slice(0, limit)
}

// 根据 ID 获取单个时刻
export async function getMomentById(id: string): Promise<Moment | null> {
  const moments = await getAllMoments()
  return moments.find(moment => moment.id === id) || null
}
