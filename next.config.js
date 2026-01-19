/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')()

const nextConfig = {
  // 只在生产构建时启用静态导出，开发时禁用以避免 generateStaticParams 验证问题
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  reactStrictMode: true,
  trailingSlash: true, // 为 Cloudflare Pages 添加尾部斜杠，生成目录结构
  images: {
    unoptimized: true, // 静态导出需要
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  }
}

module.exports = process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig
