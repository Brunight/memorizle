import type { GameRegistry } from "@/data/games";

export function GameStructuredData({
  game,
  url,
}: {
  game: GameRegistry[keyof GameRegistry];
  url: string;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: game.title,
    description: game.description,
    url,
    genre: "Educational Game",
    gamePlatform: "Web Browser",
    applicationCategory: "Game",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
