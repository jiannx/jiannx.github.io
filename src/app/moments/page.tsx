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
      <h1 className="text-4xl mb-12">时刻</h1>

      {moments.length === 0 ? (
        <p className="text-[var(--color-text-secondary)]">暂无时刻</p>
      ) : (
        <>
          <div className="space-y-24">
            {moments.map(moment => (
              <div key={moment.id} className="space-y-8 flex flex-col align-center">
                {moment.images[0] && (
                  <Image
                    src={moment.images[0]}
                    alt={moment.description}
                    width={800}
                    height={800}
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                )}
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] align-center justify-center">
                  <time>{moment.date}</time>
                  {moment.location && (
                    <>
                      <span>·</span>
                      <span>{moment.location}</span>
                    </>
                  )}
                  {moment.description}
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
