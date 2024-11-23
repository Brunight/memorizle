import { notFound } from "next/navigation"
import MemoryGame from "@/components/MemoryGame"
import { gamesRegistry } from "@/data/games"
import { getRandomAbleItem } from "@/utils/getRandomAbleItem"

type Params = Promise<{ name: string }>

interface GamePageProps {
  params: Params
}

export default async function GamePage({ params }: GamePageProps) {
  const { name: gameName } = await params

  const game = gamesRegistry[gameName]
  
  if (!game) {
    notFound()
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center py-8">
      <MemoryGame 
        items={game.data.items} 
        title={game.data.title}
        useOptimizedImages={false}
        initialItem={getRandomAbleItem([], game.data.items, undefined)!}
      />
    </div>
  )
} 