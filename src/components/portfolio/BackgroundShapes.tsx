import { useMemo } from "react";

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

interface Shape {
  className: string;
  style: React.CSSProperties;
}

export function BackgroundShapes() {
  const shapes = useMemo<Shape[]>(() => [
    {
      className:
        "w-72 h-72 bg-pink-400/20 rounded-full blur-xl opacity-50 animate-float",
      style: {
        top: "-12rem",
        left: "-8rem",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
    {
      className:
        "w-28 h-28 bg-indigo-400/20 rounded-md blur-xl opacity-40 animate-rotate",
      style: {
        top: "20%",
        right: "-3rem",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
    {
      className:
        "w-40 h-40 bg-emerald-400/20 rounded-md blur-xl opacity-30 animate-pulseScale rotate-45",
      style: {
        bottom: "-6rem",
        right: "5%",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
    {
      className:
        "w-96 h-96 bg-yellow-400/15 opacity-20 blur-3xl animate-floatSlow",
      style: {
        top: "30%",
        left: "-10rem",
        clipPath:
          "polygon(50% 0%, 90% 30%, 80% 80%, 30% 90%, 0% 50%, 20% 20%)",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
  ], []);

  return (
    <>
      {shapes.map((s, i) => (
        <div
          key={i}
          className={s.className + " absolute pointer-events-none"}
          style={s.style}
        />
      ))}
    </>
  );
}
