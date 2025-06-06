import '@/styles/globals.css';

// Libraries
import dynamic from 'next/dynamic';
import { type Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
// Providers
import { ThemeProvider } from 'next-themes';
import { Provider as JotaiProvider } from 'jotai';
// Components
const Navbar = dynamic(() => import('@/app/_components/navbar'));
import Footer from '@/app/_components/footer';

export const metadata: Metadata = {
  title: 'XIV Raider',
  description: 'Raid management simplified.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    title: 'XIV Raider',
    description: 'Raid management simplified.',
    url: 'https://xiv-raider.vercel.app',
    siteName: 'XIV Raider',
    images: [
      {
        url: '/og.png',
        width: 64,
        height: 64,
        alt: 'XIV Raider Open Graph Image',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'XIV Raider',
    description: 'Raid management simplified.',
    images: [
      {
        url: '/og.png',
        width: 64,
        height: 64,
        alt: 'XIV Raider Twitter Image',
      },
    ],
  },
};

const worksans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="en" className={worksans.className} suppressHydrationWarning>
      <body className="bg-zinc-50 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
        <ThemeProvider attribute="class">
          <JotaiProvider>
            <div id="modal-root" />
            {modal}
            <div className="flex min-h-screen flex-col">
              <header>
                <Navbar />
              </header>
              <main className="flex flex-1 items-center justify-center p-4 px-2 md:px-0">{children}</main>
              <Footer />
            </div>
            <SpeedInsights />
          </JotaiProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
