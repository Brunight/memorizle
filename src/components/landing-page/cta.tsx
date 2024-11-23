import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTA() {
  return (
    <section className="w-full bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Your Memory?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of users who are improving their memory skills while having fun with Memorizle. It&apos;s completely free!
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/games">Start Playing Now</Link>
        </Button>
      </div>
    </section>
  )
}

