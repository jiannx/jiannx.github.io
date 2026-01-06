import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import PaperContainer from '@/components/PaperContainer'

// 移除 dynamicParams = false 以允许动态路由在开发模式下工作

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug)
  const post = await getPostBySlug(decodedSlug)

  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  return {
    title: `${post.title}`,
    description: post.description,
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  // URL 解码 slug（浏览器会将中文编码，需要解码）
  const decodedSlug = decodeURIComponent(params.slug)

  const post = await getPostBySlug(decodedSlug)

  if (!post) {
    notFound()
  }

  return (
    <div>
      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
          <time>{post.date}</time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {post.tags.map(tag => (
                <span key={tag} className="text-[var(--color-text-secondary)]">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Article Content */}
      <MarkdownRenderer content={post.content} />
    </div>
  )
}
