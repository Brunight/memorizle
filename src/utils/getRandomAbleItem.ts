import { GameItem } from "@/types/game";

import { genRandomNumbers } from "./randomNumber";

export const getRandomAbleItem = (
  hitItems: GameItem[],
  items: GameItem[],
  lastItem: GameItem | undefined,
  repeatProbability = 0.1,
  attempts = 0,
): GameItem | undefined => {
  if (attempts > items.length * 4) return;

  const notHitItems = items.filter(
    (item) => !hitItems.some((hItem) => hItem.answer === item.answer),
  );

  const returnHitItems =
    Math.random() > 1 - repeatProbability && !!hitItems.length;

  const randomNumber = genRandomNumbers(
    returnHitItems ? hitItems.length : notHitItems.length,
  );

  const currentItem = returnHitItems
    ? hitItems[randomNumber]
    : notHitItems[randomNumber];

  if (lastItem?.answer === currentItem?.answer && items.length > 1)
    return getRandomAbleItem(
      hitItems,
      items,
      lastItem,
      repeatProbability,
      attempts + 1,
    );

  return currentItem;
};
