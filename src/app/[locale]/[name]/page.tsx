import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

import { gamesRegistry } from "@/data/games";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GAME_ICONS } from "@/config/game-icons";
import { GameStructuredData } from "@/components/structured-data";

type Params = Promise<{ name: string }>;

interface GamePageProps {
  params: Params;
}

const GAME_MODES = [
  {
    id: "memorize",
    title: "Memorize",
    description: "Test your memory by remembering and identifying items",
  },
  {
    id: "speedrun",
    title: "Speedrun",
    description: "How long does it take you to complete all items?",
  },
];

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { name } = await params;
  const game = gamesRegistry[name];

  if (!game) {
    return {};
  }

  const title = `${game.title} Memory Game`;
  const description = game.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://memorizle.com/${name}`,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { name: gameName } = await params;
  const game = gamesRegistry[gameName];

  if (!game) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        {GAME_ICONS[gameName as keyof typeof GAME_ICONS]}
        <h1 className="text-4xl font-bold">{game.title}</h1>
      </div>

      <p className="mb-8 text-muted-foreground">{game.description}</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {GAME_MODES.map((mode) => (
          <Link key={mode.id} href={`/${gameName}/${mode.id}`}>
            <Card className="h-full cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:border-primary/50">
              <CardHeader>
                <CardTitle>{mode.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{mode.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <GameStructuredData
        game={game}
        url={`https://memorizle.com/${gameName}`}
      />
    </div>
  );
}