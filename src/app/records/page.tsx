import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import Pagination from '@/components/Pagination'
import PostCard from '@/components/PostCard'

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
      <h1 className="text-4xl mb-16">Records</h1>

      {posts.length === 0 ? (
        <p className="text-[var(--color-text-secondary)]">No posts available</p>
      ) : (
        <>
          <div className="space-y-12">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
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
