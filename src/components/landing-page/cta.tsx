import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="w-full bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto px-4 text-center md:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          Ready to Boost Your Memory?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl">
          Join thousands of users who are improving their memory skills while
          having fun with Memorizle. It&apos;s completely free!
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/games">Start Playing Now</Link>
        </Button>
      </div>
    </section>
  );
}
