import Link from 'next/link'
import Image from 'next/image'
import { getRecentPosts } from '@/lib/posts'
import { getRecentMoments } from '@/lib/moments'
import PaperContainer from '@/components/PaperContainer'

export default async function Home() {
  const recentPosts = await getRecentPosts(10)
  const recentMoments = await getRecentMoments(3)

  return (
    <div>
      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <>
          <div className="space-y-6 hover:text-primary">
            {recentPosts.map(post => (
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
          <div className='text-center mt-16'>
            <Link href="/records" className="text-sm text-[var(--color-text)] hover:text-primary transition-colors">
              查看全部 →
            </Link>
          </div>
        </>
      )}

      {/* Recent Moments */}
      {recentMoments.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold mb-0">时刻</h2>
            <Link href="/moments" className="text-sm text-[var(--color-text)] hover:text-primary transition-colors">
              查看全部 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentMoments.map(moment => (
              <div key={moment.id} className="space-y-2">
                {moment.images[0] && (
                  <div className="aspect-square bg-[var(--color-border)] rounded-lg overflow-hidden relative">
                    <Image
                      src={moment.images[0]}
                      alt={moment.description}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                  {moment.description}
                </p>
                <time className="text-xs text-[var(--color-text-secondary)]">
                  {moment.date}
                </time>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
