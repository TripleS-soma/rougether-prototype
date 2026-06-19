import catNormal from "../../imports/image-1.png";
import catHappy from "../../imports/image-2.png";

interface CatAvatarProps {
  size?: number;
  className?: string;
  variant?: "normal" | "happy";
}

export function CatAvatar({ size = 64, className = "", variant = "normal" }: CatAvatarProps) {
  const imageSrc = variant === "happy" ? catHappy : catNormal;

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <img
        src={imageSrc}
        alt="cat"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
