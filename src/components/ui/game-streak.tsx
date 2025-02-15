import { Flame } from "lucide-react";

interface GameStreakProps {
  current: number;
  best: number;
  lastPlayed: string;
}

export function GameStreak({ current, best, lastPlayed }: GameStreakProps) {
  return (
    <span className="flex items-center gap-1">
      <Flame
        className={`h-4 w-4 ${
          lastPlayed === new Date().toDateString() ? "text-orange-500" : ""
        }`}
      />
      Streak: {current} (Best: {best})
    </span>
  );
}
