import { useMemo, useState } from "react";

type StarPosition = {
  x: number;
  y: number;
};

function randomPosition(): StarPosition {
  return {
    x: 12 + Math.random() * 76,
    y: 18 + Math.random() * 64,
  };
}

export default function TapTheStarGame() {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState<StarPosition>(() => randomPosition());
  const encouragement = useMemo(() => {
    if (score === 0) return "Tap the star";
    if (score < 5) return "Nice!";
    if (score < 10) return "Great!";
    return "Amazing!";
  }, [score]);

  function handleTap() {
    setScore((current) => current + 1);
    setPosition(randomPosition());
  }

  return (
    <div className="tapGame">
      <div className="tapGameHud">
        <strong>{encouragement}</strong>
        <span>{score}</span>
      </div>

      <button
        className="starTarget"
        type="button"
        aria-label="Tap the star"
        onClick={handleTap}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
        }}
      >
        ⭐
      </button>
    </div>
  );
}
