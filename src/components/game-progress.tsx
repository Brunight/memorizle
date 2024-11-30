import { Progress } from "@/components/ui/progress";

interface GameProgressProps {
  current: number;
  total: number;
}

export function GameProgress({ current, total }: GameProgressProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Progress: {current}/{total}
        </span>
      </div>
      <Progress value={(current / total) * 100} />
    </div>
  );
}
