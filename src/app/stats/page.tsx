import { gamesRegistry } from "@/data/games";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GAME_ICONS } from "@/config/game-icons";
import Link from "next/link";

export default function StatsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Game Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(gamesRegistry).map(([key, game]) => (
          <Link key={key} href={`/stats/${key}`}>
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
