import './globals.css';
import { Inter, Dancing_Script } from 'next/font/google';
import { AppProvider } from '@/context/AppContext';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Notifications from '@/components/ui/Notifications';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const dancingScript = Dancing_Script({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing',
  display: 'swap',
});

export const metadata = {
  title: 'Amel & Firzal | Wedding Invitation',
  description: 'Join us for our special day',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${dancingScript.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AppProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
              <Notifications />
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
