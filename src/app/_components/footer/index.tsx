import dynamic from 'next/dynamic';
import ThemeButton from '@/app/_components/footer/theme-button';

// Dynamically import the Message component for SSG and SSR
const Message = dynamic(() => import('@/app/_components/footer/message'));

function Footer() {
  return (
    <>
      <Message />
      <footer className="flex h-12 w-full items-center justify-between space-x-4 px-4">
        <p className="text-sm leading-none tracking-tight">
          © {new Date().getFullYear()} XIV Raider | All icons are property of SQUARE-ENIX Ltd{' '}
          {new Date().getFullYear()} all rights reserved
        </p>
        <ThemeButton />
      </footer>
    </>
  );
}

export default Footer;
