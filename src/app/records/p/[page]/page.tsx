import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PaperContainer from '@/components/PaperContainer'
import Pagination from '@/components/Pagination'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 12

export async function generateStaticParams() {
  const allPosts = await getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  // Always generate at least page 2 to avoid build error
  // Page will return 404 if accessed when totalPages <= 1
  const pagesToGenerate = Math.max(totalPages - 1, 1)

  return Array.from({ length: pagesToGenerate }, (_, i) => ({
    page: String(i + 2),
  }))
}

export default async function RecordsPageNumber({ params }: { params: { page: string } }) {
  const allPosts = await getAllPosts()
  const currentPage = Number(params.page)
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  // Validate page number
  if (currentPage < 1 || currentPage > totalPages || isNaN(currentPage)) {
    notFound()
  }

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const posts = allPosts.slice(startIndex, endIndex)

  return (
    <div>
      <h1 className="page-title">记录</h1>

      {posts.length === 0 ? (
        <p className="text-secondary">暂无文章</p>
      ) : (
        <>
          <div className="section-spacing">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/records/${post.slug}`}
                className="block group"
              >
                <article className="card-spacing card-hover">
                  <h2 className="card-title card-title-hover">
                    {post.title}
                  </h2>
                  <p className="text-description mb-4">
                    {post.description}
                  </p>
                  <div className="meta-info">
                    <time>{post.date}</time>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.map(tag => (
                          <span key={tag} className="tag">
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
