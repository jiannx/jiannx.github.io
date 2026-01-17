import { IconDeer } from './IconDear';

export default function Footer() {
  return (
    <footer className="flex align-center text-sm text-[var(--color-text-secondary)] text-xs mt-16 mb-8">
      <aside className='mx-auto text-center flex flex-col items-center mb-8'>
        <div className="m-0 md:m-8">
          <IconDeer className="w-10 h-10 text-base-100" />
        </div>
        <p>Designed by Jiann Lu</p>
        <p>Copyright © 2025 - All right reserved</p>
      </aside>
    </footer>
  );
}
