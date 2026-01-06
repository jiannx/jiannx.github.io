import * as React from 'react';
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Jiann',
  description: '个人博客',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-5xl w-[1000px] mx-auto my-16 bg-[var(--color-paper)] shadow-md overflow-hidden p-16">
            <Header />
            {children}

          </div>
          <Footer />
        </ThemeProvider>
        <GoogleAnalytics gaId="G-E7F7XTH2Y0" />
      </body>
    </html>
  )
}