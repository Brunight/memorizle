"use client";
import { useCallback, useEffect, useState } from "react";

export function useStreak(gameName: string) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateStreak = useCallback(() => {
    if (!isClient) return;

    const storageKey = `memorizle-${gameName}`;
    const gameStatsString = localStorage.getItem(storageKey);
    const gameStats = gameStatsString
      ? JSON.parse(gameStatsString)
      : {
          gameName,
          memoryStats: { bestScore: 0, stats: {} },
          speedrunStats: { bestTime: 0 },
          dailyStreak: { current: 0, best: 0, lastPlayed: null },
        };

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
  }, [gameName, isClient]);

  const getStreak = useCallback(() => {
    if (!isClient) return { current: 0, best: 0, lastPlayed: null };

    const storageKey = `memorizle-${gameName}`;
    const gameStatsString = localStorage.getItem(storageKey);
    const gameStats = gameStatsString
      ? JSON.parse(gameStatsString)
      : {
          dailyStreak: { current: 0, best: 0, lastPlayed: null },
        };
    return gameStats.dailyStreak;
  }, [gameName, isClient]);

  return { updateStreak, getStreak };
}
