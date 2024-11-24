import { Beaker, Flag, Globe, Palette, Map, Crown } from "lucide-react";

export const GAME_ICONS = {
  flags: <Flag className="h-8 w-8 text-primary" />,
  paintings: <Palette className="h-8 w-8 text-primary" />,
  capitals: <Globe className="h-8 w-8 text-primary" />,
  "periodic-table": <Beaker className="h-8 w-8 text-primary" />,
  regions: <Map className="h-8 w-8 text-primary" />,
  chess: <Crown className="h-8 w-8 text-primary" />,
} as const;

export type GameIconKey = keyof typeof GAME_ICONS;
