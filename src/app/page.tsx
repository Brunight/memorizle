import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const games = [
  {
    title: "Flags",
    description: "Learn country flags through a simple memory game",
    href: "/flags"
  },
  // Add more games here as they're created
]

export default function HomePage() {
  return (
    <div className="py-10 w-full">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to Memorizle</h1>
        <p className="text-lg text-muted-foreground">
          Choose a game and start learning through memorization
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card key={game.title}>
            <CardHeader>
              <CardTitle>{game.title}</CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={game.href}>
                <Button className="w-full">Start Game</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
