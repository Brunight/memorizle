import MemoryGame from "@/components/MemoryGame";
import { paintingsGame } from "@/data/games/paintings";
import { getRandomAbleItem } from "@/utils/getRandomAbleItem";

export default function PaintingPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center py-8">
      <MemoryGame 
        items={paintingsGame.items} 
        title={paintingsGame.title}
        useOptimizedImages={false}
        initialItem={getRandomAbleItem([], paintingsGame.items, undefined)!}
      />
    </div>
  );
} 