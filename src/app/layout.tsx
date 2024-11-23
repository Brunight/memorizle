import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'
import "./globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Memorizle - Fun Memory Games',
  description: 'Boost your memory skills with engaging image-based games.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

