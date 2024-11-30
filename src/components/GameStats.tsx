"use client";

import { useState } from "react";

import { gamesRegistry } from "@/data/games";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { SpeedrunGameStats } from "./SpeedrunGame";
import { MemoryGameStats } from "./MemoryGame";

export type GameStats = {
  gameName: string;
  memoryStats: MemoryGameStats;
  speedrunStats: SpeedrunGameStats;
};

export function GameStats({
  name,
  game,
}: {
  name: string;
  game: (typeof gamesRegistry)[keyof typeof gamesRegistry];
}) {
  const [stats, setStats] = useState<GameStats | null>(() => {
    const storageKey = `memorizle-${name}`;
    const statsString = localStorage.getItem(storageKey);

    if (statsString) {
      return JSON.parse(statsString);
    }

    return null;
  });

  if (!stats) {
    return (
      <div>
        You haven&apos;t played this game yet.{" "}
        <a href={`/${name}`} className="underline">
          Play now!
        </a>
      </div>
    );
  }

  return (
    <>
      {stats.memoryStats && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Memory Mode Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Best Score: {stats.memoryStats.bestScore || 0}</p>
            <p>Total Items: {game.data.items.length}</p>
          </CardContent>
        </Card>
      )}

      {stats.speedrunStats && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Speedrun Mode Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Best Time: {stats.speedrunStats.bestTime || 0}s</p>
            <p>Total Items: {game.data.items.length}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {game.data.items
          .map((item) => {
            const memoryStats = stats.memoryStats?.stats?.[item.answer];
            const hitRate = memoryStats
              ? (memoryStats.correct / memoryStats.total) * 100
              : 0;
            return { item, hitRate };
          })
          .sort((a, b) => {
            const totalA =
              stats.memoryStats?.stats?.[a.item.answer]?.total || 0;
            const totalB =
              stats.memoryStats?.stats?.[b.item.answer]?.total || 0;
            return b.hitRate - a.hitRate || totalB - totalA;
          })
          .map(({ item, hitRate }) => {
            const memoryStats = stats.memoryStats?.stats?.[item.answer];
            const hitRateFormatted = hitRate.toFixed(1);

            return (
              <Card key={item.answer}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex-1">
                    <p className="font-medium">{item.answer}</p>
                    <p className="text-sm text-muted-foreground">
                      Memory Mode Attempts: {memoryStats?.total || 0}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="font-medium">{hitRateFormatted}%</p>
                      <p className="text-sm text-muted-foreground">
                        {memoryStats?.correct || 0}/{memoryStats?.total || 0}
                      </p>
                    </div>
                    <div
                      className="h-8 w-2 rounded-full"
                      style={{
                        backgroundColor: memoryStats?.total
                          ? `hsl(${Number(hitRateFormatted) * 1.2}, 100%, 50%)`
                          : "hsl(0, 0%, 80%)",
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </>
  );
}
