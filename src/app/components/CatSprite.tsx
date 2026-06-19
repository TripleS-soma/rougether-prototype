interface CatSpriteProps {
  variant:
    | "sitting"
    | "star"
    | "walking"
    | "lying"
    | "reading"
    | "writing"
    | "waving"
    | "sleeping"
    | "leaf"
    | "ball"
    | "standing"
    | "backpack";
  size?: number;
  className?: string;
}

export function CatSprite({ variant, size = 64, className = "" }: CatSpriteProps) {
  const positions: Record<typeof variant, { x: number; y: number }> = {
    sitting: { x: 0, y: 0 },
    star: { x: 1, y: 0 },
    walking: { x: 2, y: 0 },
    lying: { x: 3, y: 0 },
    reading: { x: 0, y: 1 },
    writing: { x: 1, y: 1 },
    waving: { x: 2, y: 1 },
    sleeping: { x: 3, y: 1 },
    leaf: { x: 0, y: 2 },
    ball: { x: 1, y: 2 },
    standing: { x: 2, y: 2 },
    backpack: { x: 3, y: 2 },
  };

  const pos = positions[variant];
  const spriteSize = 384; // Original sprite sheet dimensions
  const cellSize = spriteSize / 4; // 4 columns
  const scale = size / cellSize;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <img
        src="/src/imports/image.png"
        alt="cat"
        style={{
          position: "absolute",
          width: `${spriteSize * scale}px`,
          height: `${(spriteSize * 3) / 4 * scale}px`,
          left: `${-pos.x * cellSize * scale}px`,
          top: `${-pos.y * cellSize * scale}px`,
          imageRendering: "crisp-edges",
        }}
      />
    </div>
  );
}
