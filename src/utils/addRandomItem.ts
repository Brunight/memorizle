import { GameItem } from "@/types/game.js";
import { genRandomNumbers } from "./randomNumber.js";

export const addRandomItem = (
  items: GameItem[],
  data?: GameItem[],
): GameItem | undefined => {
  if (data?.length === items.length) return;

  const randomNumber = genRandomNumbers(data!.length);

  const newItem = data?.[randomNumber];

  if (items.find((item) => item.answer === newItem?.answer))
    return addRandomItem(items);

  if (!items.find((item) => item.answer === newItem?.answer)) {
    items.push(newItem!);
  }

  return newItem;
};
