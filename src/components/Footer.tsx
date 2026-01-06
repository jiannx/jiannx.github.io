import { IconDeer } from './IconDear';

export default function Footer() {
  return (
    <footer className="flex align-center text-sm">
      <aside className='mx-auto text-center flex flex-col items-center mb-8'>
        <div className="m-8">
          <IconDeer className="w-12 h-12 text-base-100" />
        </div>
        <p>Designed by Jiann Lu</p>
        <p>Copyright © 2025 - All right reserved</p>
      </aside>
    </footer>
  );
}
