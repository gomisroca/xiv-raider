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
  title: 'XIV Raider',
  description: 'Raid management simplified.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const worksans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default async function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="en" className={worksans.className} suppressHydrationWarning>
      <body className="bg-zinc-50 text-zinc-800 dark:bg-neutral-950 dark:text-zinc-200">
        <ThemeProvider attribute="class">
          <JotaiProvider>
            <div id="modal-root" />
            {modal}
            <div className="flex min-h-screen flex-col">
              <header>
                <Navbar />
              </header>
              <main className="flex flex-1 items-center justify-center px-2 md:px-0">{children}</main>
              <Footer />
            </div>
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
