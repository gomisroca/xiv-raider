import '@/styles/globals.css';

// Libraries
import { type Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Provider as JotaiProvider } from 'jotai';
// Components
import Navbar from '@/app/_components/navbar';
import Footer from '@/app/_components/footer';

export const metadata: Metadata = {
  title: 'Next.js Boilerplate',
  description: 'Boilerplate for Next.js projects',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const worksans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={worksans.className} suppressHydrationWarning>
      <body className="bg-zinc-50 text-zinc-800 dark:bg-neutral-950 dark:text-zinc-200">
        <ThemeProvider attribute="class">
          <JotaiProvider>
            <div className="min-h-screen">
              <header>
                <Navbar />
              </header>
              <main>{children}</main>
              <Footer />
            </div>
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
