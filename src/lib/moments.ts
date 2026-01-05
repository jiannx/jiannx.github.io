import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const momentsDirectory = path.join(process.cwd(), 'posts/moments')

export interface Moment {
  id: string
  date: string
  images: string[]
  description: string
  location?: string
  content?: string
}

// 获取所有时刻文件
function getAllMomentFiles(): string[] {
  try {
    if (!fs.existsSync(momentsDirectory)) {
      return []
    }
    
    const files = fs.readdirSync(momentsDirectory)
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(momentsDirectory, file))
  } catch (error) {
    console.error('Error reading moments directory:', error)
    return []
  }
}

// 解析单个时刻
function parseMoment(filePath: string): Moment | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const fileName = path.basename(filePath, '.md')
    const id = fileName
    
    return {
      id,
      date: data.date || new Date().toISOString().split('T')[0],
      images: data.images || [],
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
  const momentFiles = getAllMomentFiles()
  
  const moments = momentFiles
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
