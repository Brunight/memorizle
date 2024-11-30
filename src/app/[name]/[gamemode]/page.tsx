import { notFound } from "next/navigation";
import MemoryGame from "@/components/MemoryGame";
import { SpeedrunGame } from "@/components/SpeedrunGame";
import { gamesRegistry } from "@/data/games";
import { getRandomAbleItem } from "@/utils/getRandomAbleItem";

type Params = Promise<{
  name: string;
  gamemode: string;
}>;

interface GamePageProps {
  params: Params;
}

export default async function GameModePage({ params }: GamePageProps) {
  const { name: gameName, gamemode } = await params;

  if (!["memorize", "speedrun"].includes(gamemode)) {
    notFound();
  }

  const game = gamesRegistry[gameName];

  if (!game) {
    notFound();
  }

  const initialItem = getRandomAbleItem([], game.data.items, undefined)!;

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-8">
      {gamemode === "memorize" ? (
        <MemoryGame
          items={game.data.items}
          title={game.data.title}
          gameName={gameName}
          useOptimizedImages={false}
          initialItem={initialItem}
        />
      ) : (
        <SpeedrunGame
          items={game.data.items}
          title={game.data.title}
          useOptimizedImages={false}
          initialItem={initialItem}
        />
      )}
    </div>
  );
}
