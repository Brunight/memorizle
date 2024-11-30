import { notFound } from "next/navigation";
import { gamesRegistry } from "@/data/games";
import { GAME_ICONS } from "@/config/game-icons";
import GameStats from "@/components/GameStats";

type Params = Promise<{ name: string }>;

interface Props {
  params: Params;
}

export default async function GameStatsPage({ params }: Props) {
  const { name: gameName } = await params;
  const game = gamesRegistry[gameName];

  if (!game) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        {GAME_ICONS[gameName as keyof typeof GAME_ICONS]}
        <h1 className="text-4xl font-bold">{game.title} Statistics</h1>
      </div>
      <GameStats name={gameName} game={game} />
    </div>
  );
}
