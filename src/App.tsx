import { Suspense, lazy, useMemo, useState } from "react";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { games, type GameDefinition } from "./games/registry";

export function App() {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  const activeGame = useMemo(
    () => games.find((game) => game.id === activeGameId) ?? null,
    [activeGameId],
  );

  if (activeGame) {
    return <GameScreen game={activeGame} onBack={() => setActiveGameId(null)} />;
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="brand">
          <span className="brandIcon">
            <Gamepad2 size={28} />
          </span>
          <span>Lucent Lab</span>
        </div>

        <h1>Mini Games</h1>
        <p>Small playful experiments. Pick one and start.</p>
      </section>

      <section className="gameGrid" aria-label="Available games">
        {games.map((game) => (
          <button
            key={game.id}
            className="gameCard"
            type="button"
            onClick={() => setActiveGameId(game.id)}
          >
            <span className="gameEmoji" aria-hidden="true">
              {game.emoji}
            </span>
            <span className="gameTitle">{game.title}</span>
            <span className="gameDescription">{game.description}</span>
            <span className="playButton">Play</span>
          </button>
        ))}
      </section>
    </main>
  );
}

function GameScreen({
  game,
  onBack,
}: {
  game: GameDefinition;
  onBack: () => void;
}) {
  const GameComponent = lazy(game.load);

  return (
    <main className="gamePage">
      <header className="gameHeader">
        <button className="backButton" type="button" onClick={onBack}>
          <ArrowLeft size={20} />
          Home
        </button>
        <div>
          <h1>
            <span aria-hidden="true">{game.emoji}</span> {game.title}
          </h1>
          <p>{game.description}</p>
        </div>
      </header>

      <section className="gameFrame">
        <Suspense fallback={<div className="loading">Loading…</div>}>
          <GameComponent />
        </Suspense>
      </section>
    </main>
  );
}
