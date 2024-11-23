import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { gamesRegistry } from '@/data/games'
import { GAME_ICONS } from '@/config/game-icons'

export function Features() {
  const features = Object.entries(gamesRegistry).map(([key, game]) => ({
    icon: GAME_ICONS[key as keyof typeof GAME_ICONS],
    title: game.title,
    description: game.description,
    href: `/${key}`
  }))

  return (
    <section id="features" className="w-full bg-muted py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Featured Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {feature.icon}
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Button asChild className="w-full">
                  <Link href={feature.href}>Play Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

