import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { gamesRegistry } from "@/data/games"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-[1220px] px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Memorizle</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {Object.entries(gamesRegistry).map(([key, game]) => (
                <Link
                  key={key}
                  href={`/${key}`}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {game.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
} 