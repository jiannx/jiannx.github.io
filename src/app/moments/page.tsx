import Image from 'next/image'
import { getAllMoments } from '@/lib/moments'
import PaperContainer from '@/components/PaperContainer'
import Pagination from '@/components/Pagination'

const MOMENTS_PER_PAGE = 12

export default async function MomentsPage() {
  const allMoments = await getAllMoments()
  const currentPage = 1
  const totalPages = Math.ceil(allMoments.length / MOMENTS_PER_PAGE)

  const startIndex = 0
  const endIndex = MOMENTS_PER_PAGE
  const moments = allMoments.slice(startIndex, endIndex)

  return (
    <div className="">
      <h1 className="text-4xl font-bold mb-12">时刻</h1>

      {moments.length === 0 ? (
        <p className="text-[var(--color-text-secondary)]">暂无时刻</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {moments.map(moment => (
              <div key={moment.id} className="space-y-3">
                {moment.images[0] && (
                  <div className="aspect-square bg-[var(--color-border)] rounded-lg overflow-hidden relative group">
                    <Image
                      src={moment.images[0]}
                      alt={moment.description}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {moment.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                    <time>{moment.date}</time>
                    {moment.location && (
                      <>
                        <span>·</span>
                        <span>{moment.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/moments/p"
            />
          )}
        </>
      )}
    </div>
  )
}
