import { flagsGame } from "./flags";
import { paintingsGame } from "./paintings";
import { capitalsGame } from "./capitals";
import { GameData } from "@/types/game";
import { periodicTableGame } from "./periodicTable";
import { regionsGame } from "./regions";

interface GameRegistry {
  [key: string]: {
    title: string;
    description: string;
    data: GameData;
  };
}

export const gamesRegistry: GameRegistry = {
  flags: {
    title: "Flags",
    description: "Learn country flags through a simple memory game",
    data: flagsGame,
  },
  paintings: {
    title: "Paintings",
    description: "Learn famous paintings and their artists",
    data: paintingsGame,
  },
  capitals: {
    title: "Capitals",
    description: "Learn capital cities from around the world",
    data: capitalsGame,
  },
  "periodic-table": {
    title: "Periodic Table",
    description: "Learn the periodic table of elements",
    data: periodicTableGame,
  },
  regions: {
    title: "Regions",
    description: "Learn the regions of the world",
    data: regionsGame,
  },
};
