export interface CommonGameItemProps {
  answer: string;
  categories?: string[];
}

export interface GameItemWithImage extends CommonGameItemProps {
  imageUrl: string;
}

export interface GameItemWithComponent extends CommonGameItemProps {
  component: React.ReactNode;
}

export interface GameItemWithText extends CommonGameItemProps {
  text: string;
}

export type GameItem =
  | GameItemWithImage
  | GameItemWithText
  | GameItemWithComponent;

export interface GameData {
  title: string;
  items: GameItem[];
}
