import MemoryGame from "@/components/MemoryGame";
import { flagsGame } from "@/data/games/flags";
import { getRandomAbleItem } from "@/utils/getRandomAbleItem";

export default function FlagsPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center py-8">
      <MemoryGame 
        items={flagsGame.items} 
        title={flagsGame.title}
        useOptimizedImages={false}
        initialItem={getRandomAbleItem([], flagsGame.items, undefined)!}
      />
    </div>
  );
} 