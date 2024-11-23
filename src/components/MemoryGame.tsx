"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameProgress } from "@/components/game-progress";
import { GameImage } from "@/components/game-image";
import { getRandomAbleItem } from "@/utils/getRandomAbleItem";
import { GameItem } from "@/types/game";

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
      if (hits.length === items.length) return;

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
  }, []);

  return (
    <Card className="w-full lg:w-2/4">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        <GameProgress current={hits.length} total={items.length} />
      </CardHeader>
      {hits.length === items.length ? (
        <div className="flex flex-col items-center gap-6">
          <span className="text-2xl font-bold">You Win!</span>
        </div>
      ) : (
        <CardContent className="flex flex-col items-center gap-6">
          <motion.div
            className="w-full aspect-video relative border border-border rounded-lg overflow-hidden"
            key={currentItem.answer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {"imageUrl" in currentItem && (
              <GameImage
                src={currentItem.imageUrl}
                alt="Item to guess"
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
            {"component" in currentItem && currentItem.component}
          </motion.div>

          <div className="h-[100px] flex items-center">
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
                    className="text-xl font-bold text-center"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {currentItem.answer}
                  </motion.div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <Button
                          onClick={() => handleResponse(false)}
                          variant="destructive"
                        >
                          Got it Wrong
                        </Button>
                        <span className="text-sm text-muted-foreground mt-1">
                          Press A
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Button
                          onClick={() => handleResponse(true)}
                          variant="default"
                        >
                          Got it Right
                        </Button>
                        <span className="text-sm text-muted-foreground mt-1">
                          Press D
                        </span>
                      </div>
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
