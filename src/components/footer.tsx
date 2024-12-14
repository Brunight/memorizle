import Link from "next/link";
export function Footer() {
  return (
    <footer className="bg-muted px-4 py-8 md:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Memorizle. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by{" "}
            <Link
              href="https://github.com/brunight"
              className="text-primary hover:text-primary/80"
            >
              Brunight
            </Link>
            ,{" "}
            <Link
              href="https://github.com/IncognitaDev"
              className="text-primary hover:text-primary/80"
            >
              Incognita
            </Link>
            ,{" "}
            <Link
              href="https://github.com/marcoshenriquemaia"
              className="text-primary hover:text-primary/80"
            >
              Marcos Maia
            </Link>{" "}
            and{" "}
            <Link
              href="https://github.com/vavarine"
              className="text-primary hover:text-primary/80"
            >
              Vavarine
            </Link>
          </p>
        </div>
        <nav className="flex space-x-4">
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Terms of Service
          </Link>
          <a
            href="mailto:contact@memorizle.com"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Contact Us
          </a>
        </nav>
      </div>
      <span className="fixed bottom-0 right-0 h-24 w-24 translate-x-1/2 translate-y-1/2 rotate-45 bg-background text-sm text-muted-foreground">
        <Link
          href="https://github.com/brunight/memorizle"
          className="relative left-2 top-9 text-primary hover:text-primary/80"
          target="_blank"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            height={24}
            width={24}
            className="-rotate-45"
          >
            <title>GitHub</title>
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
        </Link>
      </span>
    </footer>
  );
}
