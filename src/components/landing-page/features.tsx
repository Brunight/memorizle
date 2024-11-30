import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { gamesRegistry } from "@/data/games";
import { GAME_ICONS } from "@/config/game-icons";

export function Features() {
  const features = Object.entries(gamesRegistry).map(([key, game]) => ({
    icon: GAME_ICONS[key as keyof typeof GAME_ICONS],
    title: game.title,
    description: game.description,
    href: `/${key}`,
  }));

  return (
    <section id="features" className="w-full bg-muted py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Our Featured Games
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {feature.icon}
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-4 text-muted-foreground">
                  {feature.description}
                </p>
                <Button asChild className="w-full">
                  <Link href={feature.href}>Explore Game Modes</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
