import { GameData } from "@/types/game";

export const katakanaGame: GameData = {
  title: "Katakana Memory Game",
  items: [
    // Basic vowels
    { answer: "a", text: "ア" },
    { answer: "i", text: "イ" },
    { answer: "u", text: "ウ" },
    { answer: "e", text: "エ" },
    { answer: "o", text: "オ" },

    // K-row
    { answer: "ka", text: "カ" },
    { answer: "ki", text: "キ" },
    { answer: "ku", text: "ク" },
    { answer: "ke", text: "ケ" },
    { answer: "ko", text: "コ" },

    // S-row
    { answer: "sa", text: "サ" },
    { answer: "shi", text: "シ" },
    { answer: "su", text: "ス" },
    { answer: "se", text: "セ" },
    { answer: "so", text: "ソ" },

    // T-row
    { answer: "ta", text: "タ" },
    { answer: "chi", text: "チ" },
    { answer: "tsu", text: "ツ" },
    { answer: "te", text: "テ" },
    { answer: "to", text: "ト" },

    // N-row
    { answer: "na", text: "ナ" },
    { answer: "ni", text: "ニ" },
    { answer: "nu", text: "ヌ" },
    { answer: "ne", text: "ネ" },
    { answer: "no", text: "ノ" },

    // H-row
    { answer: "ha", text: "ハ" },
    { answer: "hi", text: "ヒ" },
    { answer: "fu", text: "フ" },
    { answer: "he", text: "ヘ" },
    { answer: "ho", text: "ホ" },

    // M-row
    { answer: "ma", text: "マ" },
    { answer: "mi", text: "ミ" },
    { answer: "mu", text: "ム" },
    { answer: "me", text: "メ" },
    { answer: "mo", text: "モ" },

    // Y-row
    { answer: "ya", text: "ヤ" },
    { answer: "yu", text: "ユ" },
    { answer: "yo", text: "ヨ" },

    // R-row
    { answer: "ra", text: "ラ" },
    { answer: "ri", text: "リ" },
    { answer: "ru", text: "ル" },
    { answer: "re", text: "レ" },
    { answer: "ro", text: "ロ" },

    // W-row
    { answer: "wa", text: "ワ" },
    { answer: "wo", text: "ヲ" },

    // N
    { answer: "n", text: "ン" },

    // Dakuten (G-row)
    { answer: "ga", text: "ガ" },
    { answer: "gi", text: "ギ" },
    { answer: "gu", text: "グ" },
    { answer: "ge", text: "ゲ" },
    { answer: "go", text: "ゴ" },

    // Dakuten (Z-row)
    { answer: "za", text: "ザ" },
    { answer: "ji", text: "ジ" },
    { answer: "zu", text: "ズ" },
    { answer: "ze", text: "ゼ" },
    { answer: "zo", text: "ゾ" },

    // Dakuten (D-row)
    { answer: "da", text: "ダ" },
    { answer: "dji", text: "ヂ" },
    { answer: "dzu", text: "ヅ" },
    { answer: "de", text: "デ" },
    { answer: "do", text: "ド" },

    // Dakuten (B-row)
    { answer: "ba", text: "バ" },
    { answer: "bi", text: "ビ" },
    { answer: "bu", text: "ブ" },
    { answer: "be", text: "ベ" },
    { answer: "bo", text: "ボ" },

    // Handakuten (P-row)
    { answer: "pa", text: "パ" },
    { answer: "pi", text: "ピ" },
    { answer: "pu", text: "プ" },
    { answer: "pe", text: "ペ" },
    { answer: "po", text: "ポ" },

    // Youon (K-row)
    { answer: "kya", text: "キャ" },
    { answer: "kyu", text: "キュ" },
    { answer: "kyo", text: "キョ" },

    // Youon (S-row)
    { answer: "sha", text: "シャ" },
    { answer: "shu", text: "シュ" },
    { answer: "sho", text: "ショ" },

    // Youon (Ch-row)
    { answer: "cha", text: "チャ" },
    { answer: "chu", text: "チュ" },
    { answer: "cho", text: "チョ" },

    // Youon (N-row)
    { answer: "nya", text: "ニャ" },
    { answer: "nyu", text: "ニュ" },
    { answer: "nyo", text: "ニョ" },

    // Youon (H-row)
    { answer: "hya", text: "ヒャ" },
    { answer: "hyu", text: "ヒュ" },
    { answer: "hyo", text: "ヒョ" },

    // Youon (M-row)
    { answer: "mya", text: "ミャ" },
    { answer: "myu", text: "ミュ" },
    { answer: "myo", text: "ミョ" },

    // Youon (R-row)
    { answer: "rya", text: "リャ" },
    { answer: "ryu", text: "リュ" },
    { answer: "ryo", text: "リョ" },

    // Youon (G-row)
    { answer: "gya", text: "ギャ" },
    { answer: "gyu", text: "ギュ" },
    { answer: "gyo", text: "ギョ" },

    // Youon (J-row)
    { answer: "ja", text: "ジャ" },
    { answer: "ju", text: "ジュ" },
    { answer: "jo", text: "ジョ" },

    // Youon (B-row)
    { answer: "bya", text: "ビャ" },
    { answer: "byu", text: "ビュ" },
    { answer: "byo", text: "ビョ" },

    // Youon (P-row)
    { answer: "pya", text: "ピャ" },
    { answer: "pyu", text: "ピュ" },
    { answer: "pyo", text: "ピョ" },

    // Sokuon (K-row)
    { answer: "kka", text: "ッカ" },
    { answer: "kki", text: "ッキ" },
    { answer: "kku", text: "ック" },
    { answer: "kke", text: "ッケ" },
    { answer: "kko", text: "ッコ" },

    // Sokuon (S-row)
    { answer: "ssa", text: "ッサ" },
    { answer: "sshi", text: "ッシ" },
    { answer: "ssu", text: "ッス" },
    { answer: "sse", text: "ッセ" },
    { answer: "sso", text: "ッソ" },

    // Sokuon (T-row)
    { answer: "tta", text: "ッタ" },
    { answer: "cchi", text: "ッチ" },
    { answer: "ttsu", text: "ッツ" },
    { answer: "tte", text: "ッテ" },
    { answer: "tto", text: "ット" },

    // Sokuon (P-row)
    { answer: "ppa", text: "ッパ" },
    { answer: "ppi", text: "ッピ" },
    { answer: "ppu", text: "ップ" },
    { answer: "ppe", text: "ッペ" },
    { answer: "ppo", text: "ッポ" },
  ],
};
