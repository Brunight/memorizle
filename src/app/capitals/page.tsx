import MemoryGame from "@/components/MemoryGame";
import { capitalsGame } from "@/data/games/capitals";

export default function CapitalsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <MemoryGame 
        items={capitalsGame.items} 
        title={capitalsGame.title} 
      />
    </div>
  );
} 