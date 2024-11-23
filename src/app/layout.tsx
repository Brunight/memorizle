import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Memorizle - Memory Games",
  description: "Learn through memory games",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 mx-auto w-full max-w-[1220px] px-4">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
