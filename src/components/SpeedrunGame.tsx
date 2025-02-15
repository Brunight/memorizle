"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameProgress } from "@/components/game-progress";
import { GameImage } from "@/components/game-image";
import { getRandomAbleItem } from "@/utils/getRandomAbleItem";
import { GameItem } from "@/types/game";
import { Swipeable } from "@/components/Swipeable";
import { useStreak } from "@/hooks/useStreak";
import { GameStreak } from "@/components/ui/game-streak";

type GameState = "idle" | "showing-item" | "showing-answer" | "finished";

export type SpeedrunGameStats = {
  bestTime: number;
};

interface SpeedrunGameProps {
  items: GameItem[];
  initialItem?: GameItem;
  title: string;
  useOptimizedImages?: boolean;
}

export function SpeedrunGame({
  items,
  initialItem,
  title,
  useOptimizedImages = true,
}: SpeedrunGameProps) {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentItem, setCurrentItem] = useState(initialItem);
  const [hitItems, setHitItems] = useState<GameItem[]>([]);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const { updateStreak, getStreak } = useStreak(title);

  useEffect(() => {
    // Load best time from localStorage on component mount
    const storageKey = `speedrun-best-time-${title}`;
    const savedBestTime = localStorage.getItem(storageKey);
    if (savedBestTime) {
      setBestTime(parseInt(savedBestTime));
    }
  }, [title]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case " ": // Space key
          event.preventDefault();
          if (gameState === "showing-item") {
            handleShowAnswer();
          } else if (gameState === "idle") {
            handleStart();
          }
          break;
        case "a":
          if (gameState === "showing-answer") {
            handleNext(false);
          }
          break;
        case "d":
          if (gameState === "showing-answer") {
            handleNext(true);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  const handleStart = () => {
    setGameState("showing-item");
    setHitItems([]);
    setTime(0);
    setCurrentItem(initialItem);
    setIsRunning(true);
  };

  const handleShowAnswer = () => {
    setGameState("showing-answer");
  };

  const handleNext = (wasCorrect: boolean) => {
    const newHitItems: GameItem[] = [...hitItems];

    if (currentItem && wasCorrect) {
      if (!hitItems.some((item) => item.answer === currentItem.answer)) {
        newHitItems.push(currentItem);
        setHitItems(newHitItems);
      }
    }

    const nextItem = getRandomAbleItem(
      newHitItems,
      items,
      items.length - hitItems.length === 1 ? undefined : currentItem,
      0,
    );

    if (hitItems.length >= items.length || !nextItem) {
      setGameState("finished");
      setIsRunning(false);
      updateStreak();

      // Save best time to localStorage if it's better than previous
      const storageKey = `speedrun-best-time-${title}`;
      const previousBestTime = localStorage.getItem(storageKey);

      if (!previousBestTime || time < parseInt(previousBestTime)) {
        localStorage.setItem(storageKey, time.toString());
        setBestTime(time);
      }
    } else {
      setCurrentItem(nextItem);
      setGameState("showing-item");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleCardClick = () => {
    if (gameState === "showing-item") {
      handleShowAnswer();
    }
  };

  return (
    <Card
      className="h-full w-full max-w-[800px] lg:w-2/4"
      onMouseDown={handleCardClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <div className="flex flex-col items-end">
            <span className="font-mono text-2xl">{formatTime(time)}</span>
            <div className="flex gap-4 text-sm text-muted-foreground">
              {bestTime && <span>Best: {formatTime(bestTime)}</span>}
              <GameStreak
                current={getStreak?.()?.current ?? 0}
                best={getStreak?.()?.best ?? 0}
                lastPlayed={getStreak?.()?.lastPlayed ?? ""}
              />
            </div>
          </div>
        </CardTitle>
        <GameProgress current={hitItems.length} total={items.length} />
      </CardHeader>
      {gameState === "idle" ? (
        <CardContent className="flex flex-col items-center gap-6">
          <p className="text-center text-muted-foreground">
            How fast can you identify all items? Press{" "}
            <span className="text-sm">SPACE</span> to begin!
          </p>
          <Button onClick={handleStart} size="lg">
            Start Game
          </Button>
        </CardContent>
      ) : gameState === "finished" ? (
        <CardContent className="flex flex-col items-center gap-6">
          <span className="text-2xl font-bold">Congratulations!</span>
          <p className="text-center text-muted-foreground">
            You completed the game in {formatTime(time)} with {hitItems.length}{" "}
            correct answers!
            {bestTime && time < bestTime && (
              <span className="block font-medium text-primary">
                New best time! Previous: {formatTime(bestTime)}
              </span>
            )}
          </p>
          <Button onClick={handleStart} size="lg">
            Play Again
          </Button>
        </CardContent>
      ) : (
        <CardContent className="flex h-full flex-col items-center gap-6">
          <motion.div
            className="relative aspect-video w-full overflow-hidden rounded-lg border border-border"
            key={currentItem?.answer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Swipeable
              swipeThreshold={100}
              maxSwipeDistance={100}
              onSwipeLeft={() =>
                gameState === "showing-answer" && handleNext(false)
              }
              onSwipeRight={() =>
                gameState === "showing-answer" && handleNext(true)
              }
            >
              <div className="relative z-20 flex h-full max-h-full flex-col items-center gap-6">
                {"imageUrl" in currentItem! ? (
                  <GameImage
                    src={currentItem!.imageUrl}
                    alt="Item to guess"
                    className="aspect-video"
                    useOptimization={useOptimizedImages}
                  />
                ) : "component" in currentItem! ? (
                  currentItem!.component
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-center text-3xl font-bold">
                      {currentItem!.text}
                    </span>
                  </div>
                )}
              </div>
            </Swipeable>
          </motion.div>

          <div className="flex min-h-56 items-center">
            <AnimatePresence mode="wait">
              {gameState === "showing-item" ? (
                <motion.div
                  className="flex flex-col items-center gap-2"
                  key="show-answer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.01 }}
                >
                  <Button onClick={handleShowAnswer} size="lg">
                    Show Answer
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Press SPACE
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col items-center gap-4"
                  key="answer-buttons"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.01 }}
                >
                  <motion.div
                    className="line-clamp-4 text-center text-xl font-bold"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {currentItem!.answer}
                  </motion.div>
                  <div className="mt-4 flex justify-between gap-4">
                    <div className="flex w-full flex-col items-center gap-2">
                      <Button
                        onClick={() => handleNext(false)}
                        variant="destructive"
                        className="w-full"
                      >
                        Got it Wrong
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        Press A
                      </span>
                    </div>
                    <div className="flex w-full flex-col items-center gap-2">
                      <Button
                        onClick={() => handleNext(true)}
                        variant="success"
                        className="w-full"
                      >
                        Got it Right
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        Press D
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
