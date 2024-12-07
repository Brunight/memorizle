import Link from "next/link";

import { gamesRegistry } from "@/data/games";

import { ThemeSelector } from "./theme-selector";
import { LanguageSwitcher } from "./LanguageSwitcher";

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

          <input id="menu-toggle" type="checkbox" className="peer hidden" />
          <div className="flex gap-2 md:hidden">
            <div className="flex items-center space-x-2 md:hidden">
              <ThemeSelector />
            </div>
            <label
              htmlFor="menu-toggle"
              className="flex cursor-pointer items-center p-2 md:hidden"
              aria-label="Toggle Menu"
            >
              <div className="space-y-1">
                <span className="block h-0.5 w-5 bg-current"></span>
                <span className="block h-0.5 w-5 bg-current"></span>
                <span className="block h-0.5 w-5 bg-current"></span>
              </div>
            </label>
          </div>

          <nav className="absolute left-0 top-14 hidden w-full flex-col bg-background text-sm font-medium shadow-md peer-checked:flex md:relative md:top-0 md:flex md:w-auto md:flex-row md:items-center md:space-x-6 lg:bg-transparent lg:shadow-none">
            <div className="p-4 md:flex md:space-x-6 md:space-y-0 md:p-0">
              {Object.entries(gamesRegistry).map(([key, game]) => (
                <Link
                  key={key}
                  href={`/${key}`}
                  className="block py-2 text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  {game.title}
                </Link>
              ))}
              <Link
                href="/stats"
                className="block py-2 text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Statistics
              </Link>
            </div>
          </nav>

          <div className="hidden items-center space-x-2 md:flex">
            <ThemeSelector />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
