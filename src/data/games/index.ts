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
    description: "Challenge yourself with our interactive flag memory game. Learn to recognize flags from countries around the world while testing and improving your memory skills.",
    data: flagsGame,
  },
  paintings: {
    title: "Paintings",
    description: "Explore the world of fine art through this engaging memory game. Learn to identify famous paintings and their artists from different periods and artistic movements.",
    data: paintingsGame,
  },
  capitals: {
    title: "Capitals",
    description: "Master world geography by learning capital cities from every corner of the globe. Perfect for students, travelers, and anyone interested in expanding their geographical knowledge.",
    data: capitalsGame,
  },
  "periodic-table": {
    title: "Periodic Table",
    description: "Dive into chemistry with our periodic table memory game. Learn element symbols, names, and atomic numbers in an entertaining and effective way.",
    data: periodicTableGame,
  },
  regions: {
    title: "Regions",
    description: "Test your knowledge of world geography by identifying countries from their shapes and outlines. A perfect way to improve your understanding of global geography and borders.",
    data: regionsGame,
  },
};
