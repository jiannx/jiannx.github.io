import Link from 'next/link'
import Image from 'next/image'
import { getRecentPosts } from '@/lib/posts'
import { getRecentMoments } from '@/lib/moments'

export default async function Home() {
  const recentPosts = await getRecentPosts(10)
  const recentMoments = await getRecentMoments(3)

  return (
    <div>
      {recentPosts.length > 0 && (
        <>
          <div className="space-y-6">
            {recentPosts.map(post => (
              <Link
                key={post.slug}
                href={`/records/${post.slug}`}
                className="block group"
              >
                <article className="py-8 border-b border-[var(--color-border)] hover:border-primary transition-colors">
                  <h3 className="text-xl font-medium mb-6 text-[var(--color-text)]">
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
          <div className='text-center mt-16'>
            <Link href="/records" className="text-sm text-[var(--color-text)]">
              查看全部 →
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
