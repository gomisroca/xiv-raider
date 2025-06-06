import dynamic from 'next/dynamic';
import ThemeButton from '@/app/_components/footer/theme-button';

// Dynamically import the Message component for SSG and SSR
const Message = dynamic(() => import('@/app/_components/footer/message'));

function Footer() {
  return (
    <>
      <Message />
      <footer className="relative flex h-12 w-full items-center justify-between space-x-4 px-4">
        <section className="flex max-w-3/4 flex-col self-end py-2 text-xs leading-none tracking-tight opacity-40">
          <p className="pointer-events-none w-fit">FINAL FANTASY XIV © SQUARE ENIX CO., LTD.</p>
        </section>
        <ThemeButton />
      </footer>
    </>
  );
}

export default Footer;
