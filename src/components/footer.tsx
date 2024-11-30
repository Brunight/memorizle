import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted px-4 py-8 md:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Memorizle. All rights reserved.
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
    </footer>
  );
}
