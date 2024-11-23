import { GameItem } from "@/types/game";

export const removeRepeatedItems = (items: GameItem[]): GameItem[] => {
  const seenAnswers = new Set<string>();
  
  return items.filter(item => {
    if (seenAnswers.has(item.answer)) {
      return false;
    }
    seenAnswers.add(item.answer);
    return true;
  });
};
