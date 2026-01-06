import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PaperContainer from '@/components/PaperContainer'
import Pagination from '@/components/Pagination'

const POSTS_PER_PAGE = 12

export default async function RecordsPage() {
  const allPosts = await getAllPosts()
  const currentPage = 1
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  const startIndex = 0
  const endIndex = POSTS_PER_PAGE
  const posts = allPosts.slice(startIndex, endIndex)

  return (
    <div>
      <h1 className="text-4xl mb-12">记录</h1>

      {posts.length === 0 ? (
        <p className="text-[var(--color-text-secondary)]">暂无文章</p>
      ) : (
        <>
          <div className="space-y-8">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/records/${post.slug}`}
                className="block group"
              >
                <article className="py-8 border-b border-[var(--color-border)] hover:border-primary transition-colors">
                  <h3 className="text-xl font-medium mb-6">
                    {post.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm">
                    {post.description}
                  </p>
                  <div className="text-xs text-[var(--color-text-secondary)] flex gap-4 mt-8">
                    <time>{post.date}</time>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[var(--color-text-secondary)]">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/records/p"
            />
          )}
        </>
      )}
    </div>
  )
}
