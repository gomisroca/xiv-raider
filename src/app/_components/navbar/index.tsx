/**
 * Navbar component with links to the home page.
 */

// Components
import Link from '@/app/_components/ui/link';
import { MdHome } from 'react-icons/md';
import { auth } from '@/server/auth';
import UserMenu from './user-menu';

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="fixed top-0 right-0 z-10 flex h-12 w-fit items-center justify-end space-x-2 px-4 transition ease-in">
      {/* Link to the home page */}
      <Link name="Home" href="/" className="shadow-md">
        <MdHome size={20} />
      </Link>
      <UserMenu session={session} />
    </nav>
  );
}
