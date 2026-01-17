import Link from 'next/link'

export default async function PostCard({ post }: { post: any }) {
  return (
    <Link
      href={`/records/${post.slug}`}
      className="block group"
    >
      <article className="border-b border-[var(--color-border)] hover:border-primary transition-colors">
        <h3 className="text-xl font-medium mb-6 text-[var(--color-text)]">
          {post.title}
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm break-words">
          {post.description}
        </p>
        <div className="text-xs text-[var(--color-text-secondary)] flex gap-4 my-8">
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
  )
}
