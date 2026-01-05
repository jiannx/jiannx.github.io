import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  slug: string
  title: string
  date: string
  tags?: string[]
  description?: string
  content: string
  year: string
  fileName: string
}

// 递归获取所有年份文件夹中的 markdown 文件
function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = []
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        // 跳过 moments 目录
        if (entry.name === 'moments') continue
        
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

// 从文件路径提取年份
function extractYear(filePath: string): string {
  const match = filePath.match(/posts\/(\d{4})\//)
  return match ? match[1] : 'unknown'
}

// 生成 slug（使用文件名或标题）
function generateSlug(fileName: string, title?: string): string {
  const baseSlug = fileName.replace(/\.md$/, '').toLowerCase()
  return baseSlug.replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
}

// 解析单个文章
export function parsePost(filePath: string): Post | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const fileName = path.basename(filePath, '.md')
    const year = extractYear(filePath)
    
    // 如果没有 frontmatter，尝试从文件名或内容提取
    const title = data.title || fileName
    const dateValue = data.date
    const date = dateValue instanceof Date 
      ? dateValue.toISOString().split('T')[0] 
      : (typeof dateValue === 'string' ? dateValue : `${year}-01-01`)
    const slug = generateSlug(fileName, title)
    
    return {
      slug,
      title,
      date,
      tags: Array.isArray(data.tags) ? data.tags : [],
      description: data.description || content.slice(0, 150).replace(/[#\n]/g, ''),
      content,
      year,
      fileName,
    }
  } catch (error) {
    console.error(`Error parsing post ${filePath}:`, error)
    return null
  }
}

// 获取所有文章
export async function getAllPosts(): Promise<Post[]> {
  const markdownFiles = getAllMarkdownFiles(postsDirectory)
  
  const posts = markdownFiles
    .map(parsePost)
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      // 按日期倒序排列
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  
  return posts
}

// 根据 slug 获取单篇文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts()
  const post = posts.find(post => post.slug === slug)
  return post || null
}

// 获取指定数量的最新文章
export async function getRecentPosts(limit: number = 5): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.slice(0, limit)
}

// 按年份分组文章
export async function getPostsByYear(): Promise<Record<string, Post[]>> {
  const posts = await getAllPosts()
  const postsByYear: Record<string, Post[]> = {}
  
  for (const post of posts) {
    if (!postsByYear[post.year]) {
      postsByYear[post.year] = []
    }
    postsByYear[post.year].push(post)
  }
  
  return postsByYear
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tagsSet = new Set<string>()
  
  posts.forEach(post => {
    post.tags?.forEach(tag => tagsSet.add(tag))
  })
  
  return Array.from(tagsSet).sort()
}

// 根据标签筛选文章
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.tags?.includes(tag))
}
