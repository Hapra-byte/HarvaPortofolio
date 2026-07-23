interface FloatingOrbProps {
  delay: number;
  size: number;
  x: string;
  y: string;
  color: string;
}

export function FloatingOrb({ delay, size, x, y, color }: FloatingOrbProps) {
  return (
    <div
      className="absolute rounded-full pointer-events-none -z-10 animate-orb"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
        animationDelay: `${delay}s`,
      }}
    />
  );
}