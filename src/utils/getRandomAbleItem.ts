import { GameItem } from "@/types/game";
import { genRandomNumbers } from "./randomNumber";

export const getRandomAbleItem = (
  hitItems: GameItem[],
  items: GameItem[],
  lastItem: GameItem | undefined
): GameItem | undefined => {
  const notHitItems = items.filter(
    (item) => !hitItems.some((hItem) => hItem.answer === item.answer)
  );

  const returnHitItems = Math.random() > 0.9 && !!hitItems.length;

  const randomNumber = genRandomNumbers(
    returnHitItems ? hitItems.length : notHitItems.length
  );

  const currentItem = returnHitItems
    ? hitItems[randomNumber]
    : notHitItems[randomNumber];

  if (lastItem?.answer === currentItem?.answer && items.length > 1)
    return getRandomAbleItem(hitItems, items, lastItem);

  return currentItem;
};
