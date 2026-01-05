import PaperContainer from '@/components/PaperContainer'

export default function AboutPage() {
  return (
    <div className="px-6 py-20">
      <h1 className="text-4xl font-bold mb-8">关于</h1>

      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-bold mt-8 mb-4">Jiann Lu</h2>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          十年全栈工程师，专注于互联网产品设计与开发。
        </p>

        <h3 className="text-xl font-bold mt-8 mb-4">Previously</h3>
        <ul className="space-y-2 text-[var(--color-text-secondary)]">
          <li>硕盘智能科技 - 前端专家，从事低代码开发平台</li>
          <li>阿里巴巴 - 全栈开发，从事数字农业 SaaS 和物联网平台</li>
        </ul>

        <h3 className="text-xl font-bold mt-8 mb-4">Contact</h3>
        <p className="text-[var(--color-text-secondary)]">
          Email: lemmoo.lu@gmail.com
        </p>
      </div>
    </div>
  )
}
