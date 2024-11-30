import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4 py-20 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-10 md:mb-0 md:w-1/2">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Memorize with Fun, Learn with Ease
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Boost your memory skills with engaging image-based games. From
              flags to landmarks, make learning an adventure - all for free!
            </p>
            <Button size="lg" asChild>
              <Link href="/games">Start Playing Now</Link>
            </Button>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/hero-placeholder.svg"
              alt="Memorizle Game Preview"
              width={400}
              height={400}
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
