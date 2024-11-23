import Link from "next/link"
import { ThemeSelector } from "./theme-selector"
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
          </div>

          <input
            id="menu-toggle"
            type="checkbox"
            className="hidden peer"
          />
          <label
            htmlFor="menu-toggle"
            className="md:hidden flex items-center p-2 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <div className="space-y-1">
              <span className="block w-5 h-0.5 bg-current"></span>
              <span className="block w-5 h-0.5 bg-current"></span>
              <span className="block w-5 h-0.5 bg-current"></span>
            </div>
          </label>

          <nav
            className="absolute top-14 left-0 w-full bg-background shadow-md hidden peer-checked:flex flex-col md:relative md:top-0 md:w-auto md:flex md:flex-row md:items-center md:space-x-6 text-sm font-medium lg:shadow-none"
          >
            <div className="p-4 md:p-0 md:flex md:space-y-0 md:space-x-6">
              {Object.entries(gamesRegistry).map(([key, game]) => (
                <Link
                  key={key}
                  href={`/${key}`}
                  className="block py-2 transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {game.title}
                </Link>
              ))}
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
