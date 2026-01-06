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
          <div className="list-spacing hover:text-primary">
            {recentPosts.map(post => (
              <Link
                key={post.slug}
                href={`/records/${post.slug}`}
                className="block group"
              >
                <article className="py-4 card-hover ">
                  <h3 className="article-title">
                    {post.title}
                  </h3>
                  <p className="text-secondary text-sm">
                    {post.description}
                  </p>
                  <div className="text-xs text-secondary flex gap-4 mt-4">
                    <time>{post.date}</time>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2">
                        {post.tags.slice(0, 3).map(tag => (
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
            <div className='text-center mt-8'>
              <Link href="/records" className="link-view-all">
                查看全部 →
              </Link>
            </div>

          </div>
        </>
      )}

      {/* Recent Moments */}
      {recentMoments.length > 0 && (
        <PaperContainer>
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">时刻</h2>
            <Link href="/moments" className="link-view-all">
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
                <p className="text-meta line-clamp-2">
                  {moment.description}
                </p>
                <time className="text-xs text-secondary">
                  {moment.date}
                </time>
              </div>
            ))}
          </div>
        </PaperContainer>
      )}
    </div>
  )
}
