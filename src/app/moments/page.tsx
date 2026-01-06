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
    <div>
      <h1 className="page-title">时刻</h1>

      {moments.length === 0 ? (
        <p className="text-secondary">暂无时刻</p>
      ) : (
        <>
          <div className="grid-moments">
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
                  <p className="text-description">
                    {moment.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-secondary">
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
