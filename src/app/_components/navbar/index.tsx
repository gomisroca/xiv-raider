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
    <nav className="fixed right-0 bottom-0 z-20 flex h-12 w-fit items-center justify-end space-x-2 px-2 transition ease-in">
      {/* Link to the home page */}
      <div className="absolute -top-28 left-25 h-60 w-60 translate-x-3 translate-y-10 scale-x-150 skew-12 bg-black dark:bg-white"></div>
      <div className="pointer-events-none absolute -top-25 -right-25 h-60 w-60 translate-x-3 translate-y-10 skew-10 bg-sky-500"></div>
      <Link name="Home" href="/" skew="high" className="translate-x-5 -translate-y-7 shadow-md">
        <MdHome size={20} />
      </Link>
      <UserMenu session={session} />
      <ThemeButton />
    </nav>
  );
}
