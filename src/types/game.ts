export interface CommonGameItemProps {
  answer: string;
}

export interface GameItemWithImage extends CommonGameItemProps {
  imageUrl: string;
}

export interface GameItemWithText extends CommonGameItemProps {
  text: string;
}

export type GameItem = GameItemWithImage | GameItemWithText;

export interface GameData {
  title: string;
  items: GameItem[];
} 