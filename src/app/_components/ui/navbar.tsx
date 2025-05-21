/**
 * Navbar component with links to the home page.
 */

// Components
import Link from '@/app/_components/ui/link';
import { MdHome } from 'react-icons/md';

function Navbar() {
  return (
    <nav className="fixed top-0 z-10 flex h-12 w-full items-center justify-end space-x-4 px-4 transition ease-in">
      {/* Link to the home page */}
      <Link href="/">
        <MdHome size={20} />
      </Link>
      {/* User menu and search bar */}
      {/* <NavMenu session={session} /> */}
    </nav>
  );
}

export default Navbar;
