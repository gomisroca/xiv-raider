import dynamic from 'next/dynamic';
import ThemeButton from '@/app/_components/ui/theme-button';

// Dynamically import the Message component for SSG and SSR
const Message = dynamic(() => import('@/app/_components/ui/message'));

function Footer() {
  return (
    <>
      <Message />
      <footer className="flex h-12 w-full items-center justify-between space-x-2 bg-zinc-100 px-4 dark:bg-zinc-950">
        <p className="text-sm leading-none tracking-tight">© {new Date().getFullYear()} XIV Raider</p>
        <ThemeButton />
      </footer>
    </>
  );
}

export default Footer;
