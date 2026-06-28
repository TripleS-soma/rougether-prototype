import type { CSSProperties } from "react";
import {
  CharacterId,
  DEFAULT_CHARACTER_ID,
  getCharacterOption,
} from "../components/character";
import { DEFAULT_DESIGN_ID, DesignId, cx, getDesign } from "./theme";

type CharacterAvatarVariant = "badge" | "plain" | "room" | "tile";

interface CharacterAvatarProps {
  characterId?: CharacterId;
  designId?: DesignId;
  frame?: number;
  size?: number;
  variant?: CharacterAvatarVariant;
  className?: string;
  imageClassName?: string;
  label?: string;
}

export function CharacterAvatar({
  characterId = DEFAULT_CHARACTER_ID,
  designId = DEFAULT_DESIGN_ID,
  frame = 0,
  size = 64,
  variant = "badge",
  className,
  imageClassName,
  label,
}: CharacterAvatarProps) {
  const character = getCharacterOption(characterId);
  const design = getDesign(designId);
  const safeFrame =
    ((frame % character.images.length) + character.images.length) %
    character.images.length;
  const image = character.images[safeFrame] ?? character.images[0];
  const sizeStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
  };

  if (variant === "plain") {
    return (
      <img
        src={image}
        alt={label ?? character.name}
        className={cx("object-contain", className)}
        style={sizeStyle}
      />
    );
  }

  if (variant === "room") {
    return (
      <div
        className={cx(
          "flex items-center justify-center overflow-visible",
          className,
        )}
        style={sizeStyle}
      >
        <img
          src={image}
          alt={label ?? character.name}
          className={cx("h-full w-full object-contain", imageClassName)}
        />
      </div>
    );
  }

  if (variant === "tile") {
    return (
      <div
        className={cx(
          "flex shrink-0 items-center justify-center overflow-hidden rounded-2xl ring-1",
          design.avatarRing,
          design.avatarShadow,
          className,
        )}
        style={{ ...sizeStyle, backgroundColor: character.bg }}
      >
        <img
          src={image}
          alt={label ?? character.name}
          className={cx("h-[82%] w-[82%] object-contain", imageClassName)}
        />
      </div>
    );
  }

  return (
    <div
      className={cx(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-1",
        design.avatarRing,
        design.avatarShadow,
        className,
      )}
      style={{ ...sizeStyle, backgroundColor: character.bg }}
    >
      <img
        src={image}
        alt={label ?? character.name}
        className={cx("h-[82%] w-[82%] object-contain", imageClassName)}
      />
    </div>
  );
}
