import PaperContainer from '@/components/PaperContainer'

export default function AboutPage() {
  return (
    <div>
      <div className="w-full h-[300px] bg-[url('/images/aboutbg.jpg')] bg-cover bg-position-center"></div>
      <h1 className="page-title mt-12">关于</h1>

      <div className="prose prose-lg max-w-none">
        <h2 className="section-title">Jiann Lu</h2>
        <p className="text-description">
          Ten years of full-stack Engineer, Focus on Internet product design and development
        </p>

        <h3 className="text-xl font-bold mt-8 mb-4">Previously</h3>
        <ul className="space-y-2 text-secondary">
          <li>Expert front-end development at Shuopan Intelligent Technology working on Low-Code Development Platform</li>
          <li>Staff full-stack development at Alibaba working on Digital agriculture SaaS and IoT Platform.</li>
          <li>Front-end development at Didi working on car service marketing platform and energy-related business.</li>
        </ul>

        <h3 className="text-xl font-bold mt-8 mb-4">Contact</h3>
        <p className="text-secondary">
          Email: lemoo.lu@gmail.com
        </p>
      </div>
    </div>
  )
}
