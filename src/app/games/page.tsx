import Link from "next/link";

import { gamesRegistry } from "@/data/games";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { GAME_ICONS } from "@/config/game-icons";
import { SearchBar } from "@/components/search-bar";

type Params = Promise<{ q?: string }>;

interface GamesPageProps {
  searchParams: Params;
}

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || "";

  const filteredGames = Object.entries(gamesRegistry).filter(
    ([_, game]) =>
      game.title.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">All Games</h1>

      <div className="mx-auto mb-8 max-w-xl">
        <SearchBar defaultValue={query} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGames.map(([key, game]) => (
          <Link key={key} href={`/${key}`}>
            <Card className="h-full cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {GAME_ICONS[key as keyof typeof GAME_ICONS]}
                  <span>{game.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{game.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
