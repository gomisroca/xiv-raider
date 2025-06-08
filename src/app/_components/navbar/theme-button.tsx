'use client';

/**
 * Button to toggle the theme between light and dark mode.
 *
 * @example
 * <ThemeButton />
 */

// Libraries
import { useTheme } from 'next-themes';
// Components
import { FaSun, FaMoon } from 'react-icons/fa6';
import Button from '@/app/_components/ui/button';

function ThemeButton() {
  const { theme, setTheme } = useTheme(); // Hook to get and set the theme using next-themes

  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      name="Theme Button"
      skew="high"
      className="-translate-y-15 shadow-md *:skew-3">
      <FaMoon name="light" size={20} className="absolute scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
      <FaSun name="dark" size={20} className="absolute scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Theme Button</span>
    </Button>
  );
}
export default ThemeButton;
