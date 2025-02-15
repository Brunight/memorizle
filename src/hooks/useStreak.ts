"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { GameStats } from "@/components/GameStats";

export function useStreak(gameName: string) {
  const [isClient, setIsClient] = useState(false);

  const defaultGameStats = useMemo(
    (): GameStats => ({
      gameName,
      memoryStats: { bestScore: 0, stats: {} },
      speedrunStats: { bestTime: 0 },
      dailyStreak: { current: 0, best: 0, lastPlayed: "" },
    }),
    [gameName],
  );

  const buildGameStats = useCallback(
    (gameStats: string | null) => {
      const parsedGameStats: Partial<GameStats> = gameStats
        ? JSON.parse(gameStats)
        : {};

      return {
        ...defaultGameStats,
        ...parsedGameStats,
      };
    },
    [defaultGameStats],
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateStreak = useCallback(() => {
    if (!isClient) return;

    const storageKey = `memorizle-${gameName}`;
    const gameStatsString = localStorage.getItem(storageKey);
    const gameStats = buildGameStats(gameStatsString);
    const today = new Date().toDateString();

    if (gameStats.dailyStreak.lastPlayed !== today) {
      // Check if the last played date was yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isConsecutiveDay =
        gameStats.dailyStreak.lastPlayed === yesterday.toDateString();

      const newStreak = isConsecutiveDay
        ? (gameStats.dailyStreak?.current ?? 0) + 1
        : 1;
      const newBestStreak = Math.max(
        newStreak,
        gameStats.dailyStreak?.best ?? 0,
      );

      const updatedStats = {
        ...gameStats,
        dailyStreak: {
          current: newStreak,
          best: newBestStreak,
          lastPlayed: today,
        },
      };

      localStorage.setItem(storageKey, JSON.stringify(updatedStats));
    }
  }, [buildGameStats, gameName, isClient]);

  const getStreak = useCallback(() => {
    if (!isClient) return defaultGameStats.dailyStreak;

    const storageKey = `memorizle-${gameName}`;
    const gameStatsString = localStorage.getItem(storageKey);
    const gameStats = buildGameStats(gameStatsString);

    return gameStats.dailyStreak;
  }, [buildGameStats, defaultGameStats.dailyStreak, gameName, isClient]);

  return { updateStreak, getStreak };
}
