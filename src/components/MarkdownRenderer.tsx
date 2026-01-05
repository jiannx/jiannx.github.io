"use client"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="
      prose prose-lg max-w-none
      prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-0
      prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-[var(--color-border)]
      prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
      prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-2
      prose-p:leading-relaxed prose-p:mb-6 prose-p:text-[var(--color-text)]
      prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:text-primary-light prose-a:transition-colors
      prose-strong:text-[var(--color-text)] prose-strong:font-semibold
      prose-code:text-primary prose-code:bg-[var(--color-border)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-[var(--color-border)] prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:text-sm
      prose-pre:border prose-pre:border-[var(--color-border)]
      prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-[var(--color-text-secondary)]
      prose-img:rounded-lg prose-img:mx-auto prose-img:shadow-lg
      prose-ul:my-6 prose-ul:list-disc
      prose-ol:my-6 prose-ol:list-decimal
      prose-li:my-2 prose-li:leading-relaxed
      prose-table:w-full prose-table:my-6
      prose-th:bg-[var(--color-border)] prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
      prose-td:px-4 prose-td:py-2 prose-td:border-t prose-td:border-[var(--color-border)]
      prose-hr:my-12 prose-hr:border-[var(--color-border)]
      dark:prose-invert
      dark:prose-pre:bg-neutral-900
      dark:prose-code:bg-neutral-900
    ">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // 自定义链接在新标签页打开
          a: ({ node, ...props }) => {
            const href = props.href || ''
            const isExternal = href.startsWith('http')
            return (
              <a
                {...props}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              />
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
