"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameProgress } from "@/components/game-progress";
import { GameImage } from "@/components/game-image";
import { getRandomAbleItem } from "@/utils/getRandomAbleItem";
import { GameItem } from "@/types/game";
import { Swipeable } from "@/components/Swipeable";

type GameState = "showing-item" | "showing-answer";

interface MemoryGameProps {
  items: GameItem[];
  initialItem?: GameItem;
  title: string;
  useOptimizedImages?: boolean;
}

export default function MemoryGame({
  items,
  title,
  initialItem,
  useOptimizedImages = true,
}: MemoryGameProps) {
  const [gameState, setGameState] = useState<GameState>("showing-item");
  const [currentItem, setCurrentItem] = useState(initialItem ?? items[0]);
  const [itemsInGame, setItemsInGame] = useState<GameItem[]>([
    initialItem ?? items[0],
  ]);
  const [hits, setHits] = useState<GameItem[]>([]);

  const showAnswer = useCallback(() => {
    if (gameState === "showing-item") {
      setGameState("showing-answer");
    }
  }, [gameState]);

  const handleResponse = useCallback(
    (wasCorrect: boolean) => {
      console.log('LOG:', 'currentItem', currentItem);
      if (hits.length === items.length || !currentItem) return;

      if (gameState === "showing-answer") {
        setGameState("showing-item");

        let newItem: GameItem;
        if (wasCorrect) {
          if (!hits.some((item) => item.answer === currentItem.answer)) {
            setHits((prev) => [...prev, currentItem]);
          }
          newItem = getRandomAbleItem(hits, items, currentItem)!;
          setItemsInGame((prev) => [...prev, newItem!]);
        } else {
          newItem = getRandomAbleItem(hits, itemsInGame, currentItem)!;
        }

        setCurrentItem(newItem!);
      }
    },
    [gameState, currentItem, hits, itemsInGame, items]
  );

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent handling if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case " ": // Space key
          event.preventDefault(); // Prevent page scroll
          showAnswer();
          break;
        case "a":
          handleResponse(false);
          break;
        case "d":
          handleResponse(true);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameState, handleResponse, showAnswer]); // Re-run effect when gameState change

  useEffect(() => {
    const newItem = getRandomAbleItem([], items, currentItem);
    setItemsInGame((prev) => [...prev, newItem!]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="w-full lg:w-2/4" onClick={showAnswer}>
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        <GameProgress current={hits.length} total={items.length} />
      </CardHeader>
      {hits.length === items.length || !currentItem ? (
        <div className="flex flex-col items-center gap-6">
          <span className="text-2xl font-bold">You Win!</span>
        </div>
      ) : (
        <CardContent className="max-h-full">
          <motion.div
            className="w-full aspect-video relative border border-border rounded-lg overflow-hidden bg-muted"
            key={currentItem.answer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Swipeable
              swipeThreshold={100}
              maxSwipeDistance={100}
              onSwipeLeft={() => handleResponse(false)}
              onSwipeRight={() => handleResponse(true)}
            >
              <div className="flex flex-col items-center gap-6 relative z-20 max-h-full w-full">
                {"imageUrl" in currentItem && (
                  <GameImage
                    src={currentItem.imageUrl}
                    alt="Item to guess"
                    className="aspect-video"
                    useOptimization={useOptimizedImages}
                  />
                )}
                {"text" in currentItem && (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-center">
                      {currentItem.text}
                    </span>
                  </div>
                )}
                {"component" in currentItem && (
                  <div className="aspect-video w-full h-full flex items-center justify-center">
                    {currentItem.component}
                  </div>
                )}
              </div>
            </Swipeable>
          </motion.div>
          <div className="h-[140px] flex justify-center mt-6">
            <AnimatePresence mode="wait">
              {gameState === "showing-item" ? (
                <motion.div
                  className="flex flex-col items-center gap-2"
                  key="show-answer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button onClick={showAnswer} size="lg">
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
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-xl font-bold text-center line-clamp-4"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {currentItem.answer}
                  </motion.div>
                  <div className="flex justify-between gap-4 mt-4">
                    <div className="flex flex-col items-center gap-2 w-full">
                      <Button
                        onClick={() => handleResponse(false)}
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
                        onClick={() => handleResponse(true)}
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
      )
      }
    </Card >
  );
}
