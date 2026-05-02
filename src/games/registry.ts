import type { ComponentType } from "react";

export type GameModule = {
  default: ComponentType;
};

export type GameDefinition = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  load: () => Promise<GameModule>;
};

export const games: GameDefinition[] = [
  {
    id: "tap-the-star",
    title: "Tap the Star",
    emoji: "⭐",
    description: "A tiny example game used as the first template.",
    load: () => import("./tap-the-star/Game"),
  },
];
