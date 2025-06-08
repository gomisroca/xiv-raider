/**
 * Navbar component with links to the home page.
 */

// Components
import Link from '@/app/_components/ui/link';
import { MdHome } from 'react-icons/md';
import { auth } from '@/server/auth';
import UserMenu from './user-menu';
import ThemeButton from './theme-button';

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="fixed right-0 bottom-0 z-20 flex w-fit items-center justify-end space-x-2 px-2 transition ease-in">
      {/* Link to the home page */}

      {/* Should be smaller */}
      <div className="absolute -top-20 left-25 h-40 w-30 translate-x-3 translate-y-10 scale-x-150 skew-12 bg-black md:-top-28 dark:bg-white"></div>
      <div className="pointer-events-none absolute -top-15 -right-25 h-40 w-50 translate-x-3 translate-y-10 skew-10 bg-sky-500 md:-top-25"></div>
      <Link
        name="Home"
        href="/"
        skew="high"
        className="translate-x-12 -translate-y-3 shadow-md md:translate-x-16 md:-translate-y-6">
        <MdHome size={20} />
      </Link>
      <UserMenu session={session} />
      <ThemeButton />
    </nav>
  );
}
