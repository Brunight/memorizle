import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto py-20 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Memorize with Fun, Learn with Ease
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Boost your memory skills with engaging image-based games. From flags to landmarks, make learning an adventure - all for free!
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
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

