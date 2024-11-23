export interface GameItem {
  answer: string;
  imageUrl: string;
}

export interface GameData {
  title: string;
  items: GameItem[];
} 