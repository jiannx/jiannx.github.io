import { ReactNode } from 'react'

interface PaperContainerProps {
  children: ReactNode
  className?: string
}

export default function PaperContainer({ children, className = '' }: PaperContainerProps) {
  return (
    <div className={`max-w-4xl mx-auto my-8 paper-container rounded-lg ${className}`}>
      <div className="px-6 md:px-12 py-12">
        {children}
      </div>
    </div>
  )
}
