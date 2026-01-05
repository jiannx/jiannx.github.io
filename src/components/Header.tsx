"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { IconBrandWechat, IconBrandX, IconCurrentLocation, IconMail } from "@tabler/icons-react";
import Copy from '../components/Copy';

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/records', label: '记录' },
    { href: '/moments', label: '时刻' },
    { href: '/about', label: '关于' },
  ]

  return (
    <header className='w-full'>
      <nav className=" flex items-center justify-between">
        <div></div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition-colors ${pathname.startsWith(item.href)
                    ? 'text-primary font-medium'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-paper)]">
          <ul className="px-6 py-4 space-y-4">
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 transition-colors ${pathname.startsWith(item.href)
                    ? 'text-primary font-medium'
                    : 'text-[var(--color-text-secondary)]'
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <Link href="/" className="font-bold text-lg hover:text-primary transition-colors">
          Jiann 大鹿
        </Link>
        <div>
          <div>
            Do not go gentle into that good night. 🏕️
          </div>
          <div>
            <div className="grid grid-flow-col gap-4 w-40">
              <Copy copyTip="Copy Wechat" copyData="lomo_hao">
                <IconBrandWechat stroke={1} />
              </Copy>
              <Copy copyTip="Copy Email" copyData="lemoo.lu@gmail.com">
                <IconMail stroke={1} />
              </Copy>
              {/* <Link>
                <IconBrandWhatsapp stroke={1} />
              </Link> */}
              <div className="tooltip" data-tip="Click to open">
                <Link href="https://x.com/jiann_lu" target="_blank">
                  <IconBrandX stroke={1} />
                </Link>
              </div>
              <Copy copyTip="Hangzhou, China" copyData="Hangzhou, China">
                <IconCurrentLocation stroke={1} />
              </Copy>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
