import { GameData } from "@/types/game";
import { removeRepeatedItems } from "@/utils/removeRepeatedItems";

import { flagsGame } from "./flags";
import { paintingsGame } from "./paintings";
import { capitalsGame } from "./capitals";
import { periodicTableGame } from "./periodicTable";
import { regionsGame } from "./regions";
import { chessGame } from "./chess";
import { notesGame } from "./notes";
import { hiraganaGame } from "./hiragana";
import { katakanaGame } from "./katakana";

export interface GameRegistry {
  [key: string]: {
    title: string;
    description: string;
    data: GameData;
  };
}

export const gamesRegistry: GameRegistry = {
  flags: {
    title: "Flags",
    description:
      "Challenge yourself with our interactive flag memory game. Learn to recognize flags from countries around the world while testing and improving your memory skills.",
    data: {
      title: flagsGame.title,
      items: removeRepeatedItems(flagsGame.items),
    },
  },
  paintings: {
    title: "Paintings",
    description:
      "Explore the world of fine art through this engaging memory game. Learn to identify famous paintings and their artists from different periods and artistic movements.",
    data: {
      title: paintingsGame.title,
      items: removeRepeatedItems(paintingsGame.items),
    },
  },
  capitals: {
    title: "Capitals",
    description:
      "Master world geography by learning capital cities from every corner of the globe. Perfect for students, travelers, and anyone interested in expanding their geographical knowledge.",
    data: {
      title: capitalsGame.title,
      items: removeRepeatedItems(capitalsGame.items),
    },
  },
  "periodic-table": {
    title: "Periodic Table",
    description:
      "Dive into chemistry with our periodic table memory game. Learn element symbols, names, and atomic numbers in an entertaining and effective way.",
    data: {
      title: periodicTableGame.title,
      items: removeRepeatedItems(periodicTableGame.items),
    },
  },
  regions: {
    title: "Regions",
    description:
      "Test your knowledge of world geography by identifying countries from their shapes and outlines. A perfect way to improve your understanding of global geography and borders.",
    data: {
      title: regionsGame.title,
      items: removeRepeatedItems(regionsGame.items),
    },
  },
  chess: {
    title: "Chess Openings",
    description:
      "Sharpen your chess skills with this memory game focused on famous chess openings. Learn and recognize classic strategies while improving your tactical understanding of the game.",
    data: {
      title: chessGame.title,
      items: removeRepeatedItems(chessGame.items),
    },
  },
  notes: {
    title: 'Notes',
    description: "Train your ear to recognize musical notes",
    data: {
      title: notesGame.title,
      items: notesGame.items,
    }
  },
  hiragana: {
    title: "Hiragana",
    description:
      "Learn Japanese Hiragana characters through this engaging memory game. Master the basic Japanese writing system while having fun.",
    data: {
      title: hiraganaGame.title,
      items: removeRepeatedItems(hiraganaGame.items),
    },
  },
  katakana: {
    title: "Katakana",
    description:
      "Practice Japanese Katakana characters with this interactive memory game. Perfect for learning the Japanese writing system used for foreign words.",
    data: {
      title: katakanaGame.title,
      items: removeRepeatedItems(katakanaGame.items),
    },
  },
};
