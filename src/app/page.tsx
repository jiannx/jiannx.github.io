import Link from 'next/link'
import { getRecentPosts } from '@/lib/posts'
import { getRecentMoments } from '@/lib/moments'
import PostCard from '@/components/PostCard'

export default async function Home() {
  const recentPosts = await getRecentPosts(10)
  // const recentMoments = await getRecentMoments(3)

  return (
    <div>
      {recentPosts.length > 0 && (
        <>
          <div className="space-y-12">
            {recentPosts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className='text-center mt-16'>
            <Link href="/records" className="text-sm text-[var(--color-text)]">
              View all →
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
