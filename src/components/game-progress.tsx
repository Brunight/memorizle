import { Progress } from "@/components/ui/progress"

interface GameProgressProps {
  current: number
  total: number
}

export function GameProgress({ current, total }: GameProgressProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Progress: {current}/{total}
        </span>
      </div>
      <Progress value={(current / total) * 100} />
    </div>
  )
} 