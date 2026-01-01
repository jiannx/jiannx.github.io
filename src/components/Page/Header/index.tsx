"use client"
import { IconDeer, } from '@/components';
import { DarkSwitch } from '@/components';
import Link from '../../Link';
import { IconMenu2 } from '@tabler/icons-react'
import { useEffect, useState } from 'react';
import classNames from 'classnames';


export default function Header({ }: {}) {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const event = () => {
      if (window?.document.documentElement.scrollTop > 0) {
        setIsTop(false);
      } else if (window?.document.documentElement.scrollTop === 0) {
        setIsTop(true);
      }
    }
    event();
    window?.addEventListener('scroll', event);
    return () => {
      window?.removeEventListener('scroll', event);
    };
  }, []);

  return (
    <nav className={classNames('px-4 z-10 fixed top-0 h-16 pc:px-10 transition-all duration-500 flex items-center justify-between', { 'bg-base-200 bg-opacity-60': !isTop })}>
      <div className="flex-1">
        <Link href="/">
          <IconDeer className='w-8 h-8 text-primary' />
        </Link>
      </div>

      <div className="flex-none hidden pc:flex items-center gap-4">
        <ul className="flex gap-4 px-4">
          <li>
            <Link href="/blog">BLOG</Link>
          </li>
          {/* <li>
            <Link href="/project">PROJECT</Link>
          </li> */}
        </ul>
        <DarkSwitch />
        <Link href="/about">
          <div className='border border-primary px-6 h-10 rounded-full font-normal flex items-center justify-center text-sm hover:bg-primary hover:text-white transition-colors'>ABOUT ME</div>
        </Link>
      </div>

      <div className='flex-none pc:hidden'>
        <input id="my-drawer" type="checkbox" className="hidden" />
        <label htmlFor="my-drawer" className="cursor-pointer">
          <IconMenu2 ></IconMenu2>
        </label>
        <div className="fixed inset-0 z-40 hidden" id="drawer-overlay">
          <label htmlFor="my-drawer" className="absolute inset-0"></label>
        </div>
        <div className={classNames('fixed top-0 right-0 h-full w-40 bg-base-200 shadow-lg transition-transform z-50', {
          'translate-x-0': typeof window !== 'undefined' && (document.getElementById('my-drawer') as HTMLInputElement)?.checked,
          'translate-x-full': typeof window !== 'undefined' && !(document.getElementById('my-drawer') as HTMLInputElement)?.checked,
        })}>
          <label htmlFor="my-drawer" className="absolute top-4 left-4 cursor-pointer text-xl">×</label>
          <ul className="p-4 pt-16 space-y-4">
            <li><Link href="/blog">BLOG</Link></li>
            <li><Link href="/project">PROJECT</Link></li>
            <li><Link href="/about">ABOUT</Link></li>
            <li>
              <DarkSwitch />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}