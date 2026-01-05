"use client"

import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
  // 智能显示页码（当前页前后各2页）
  const getVisiblePages = () => {
    if (totalPages <= 7) return pages
    
    if (currentPage <= 3) {
      return [...pages.slice(0, 5), '...', totalPages]
    }
    
    if (currentPage >= totalPages - 2) {
      return [1, '...', ...pages.slice(totalPages - 5)]
    }
    
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    ]
  }

  const visiblePages = getVisiblePages()

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? basePath.replace('/p', '') : `${basePath}/${currentPage - 1}`}
          className="px-4 py-2 rounded-lg border border-[var(--color-border)] hover:border-primary hover:text-primary transition-colors"
        >
          上一页
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] cursor-not-allowed">
          上一页
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-[var(--color-text-secondary)]">
                ...
              </span>
            )
          }

          const pageNum = page as number
          const isActive = pageNum === currentPage
          const href = pageNum === 1 ? basePath.replace('/p', '') : `${basePath}/${pageNum}`

          return (
            <Link
              key={pageNum}
              href={href}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
                isActive
                  ? 'border-primary bg-primary text-white'
                  : 'border-[var(--color-border)] hover:border-primary hover:text-primary'
              }`}
            >
              {pageNum}
            </Link>
          )
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}/${currentPage + 1}`}
          className="px-4 py-2 rounded-lg border border-[var(--color-border)] hover:border-primary hover:text-primary transition-colors"
        >
          下一页
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] cursor-not-allowed">
          下一页
        </span>
      )}
    </nav>
  )
}
