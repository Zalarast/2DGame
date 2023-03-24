import { useState, useRef, useEffect, MouseEvent } from "react";
import "./Game.css";

export default function Game() {
  const [position, setPosition] = useState(0);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    return () => stopMove();
  }, []);

  const move = (e: MouseEvent<HTMLButtonElement>) => {
    if (intervalRef.current) return;
    switch ((e.target as HTMLButtonElement).value) {
      case "up":
        intervalRef.current = setInterval(() => {
          setPosition((pos) => pos - 10);
        }, 100);
        break;
      case "down":
        intervalRef.current = setInterval(() => {
          setPosition((pos) => pos + 10);
        }, 100);
        break;
      default:
        return;
    }
  };

  const stopMove = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="game">
      <span
        className="model"
        style={{ transform: `translate(0,${position}px)` }}
      ></span>
      <button
        onMouseDown={move}
        onMouseUp={stopMove}
        onMouseLeave={stopMove}
        value="down"
      >
        Вниз
      </button>
      <button
        onMouseDown={move}
        onMouseUp={stopMove}
        onMouseLeave={stopMove}
        value="up"
      >
        Вверх
      </button>
      {position}
    </div>
  );
}
