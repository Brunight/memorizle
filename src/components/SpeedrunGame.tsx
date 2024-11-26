"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameProgress } from "@/components/game-progress";
import { GameImage } from "@/components/game-image";
import { getRandomAbleItem } from "@/utils/getRandomAbleItem";
import { GameItem } from "@/types/game";
import { Swipeable } from "@/components/Swipeable";

type GameState = "idle" | "showing-item" | "showing-answer" | "finished";

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
    console.log("LOG:", "gameState", gameState);
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
      0
    );

    if (hitItems.length >= items.length || !nextItem) {
      setGameState("finished");
      setIsRunning(false);

      // Save best time to localStorage if it's better than previous
      const storageKey = `speedrun-best-time-${title}`;
      const previousBestTime = localStorage.getItem(storageKey);

      if (!previousBestTime || time < parseInt(previousBestTime)) {
        localStorage.setItem(storageKey, time.toString());
        setBestTime(time);
      }

      return;
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
      className="w-full max-w-[800px] lg:w-2/4 h-full"
      onMouseDown={handleCardClick}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-mono">{formatTime(time)}</span>
            {bestTime && (
              <span className="text-sm text-muted-foreground">
                Best: {formatTime(bestTime)}
              </span>
            )}
          </div>
        </CardTitle>
        <GameProgress current={hitItems.length} total={items.length} />
      </CardHeader>
      {gameState === "idle" ? (
        <CardContent className="flex flex-col items-center gap-6">
          <p className="text-muted-foreground text-center">
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
          <p className="text-muted-foreground text-center">
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
        <CardContent className="flex flex-col items-center gap-6 h-full">
          <motion.div
            className="w-full aspect-video relative border border-border rounded-lg overflow-hidden"
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
              <div className="flex flex-col items-center gap-6 relative z-20 max-h-full">
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
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-center">
                      {currentItem!.text}
                    </span>
                  </div>
                )}
              </div>
            </Swipeable>
          </motion.div>

          <div className="flex items-center min-h-56">
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
                    className="text-xl font-bold text-center line-clamp-4"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {currentItem!.answer}
                  </motion.div>
                  <div className="flex justify-between gap-4 mt-4">
                    <div className="flex flex-col items-center gap-2 w-full">
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
                    <div className="flex flex-col items-center gap-2 w-full">
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
