import cat1 from "../../imports/character/cat-1.png";
import cat2 from "../../imports/character/cat-2.png";
import cat3 from "../../imports/character/cat-3.png";
import cat4 from "../../imports/character/cat-4.png";
import dog1 from "../../imports/character/dog-1.png";
import dog2 from "../../imports/character/dog-2.png";
import dog3 from "../../imports/character/dog-3.png";
import dog4 from "../../imports/character/dog-4.png";
import tiger1 from "../../imports/character/tiger-1.png";
import tiger2 from "../../imports/character/tiger-2.png";
import tiger3 from "../../imports/character/tiger-3.png";
import tiger4 from "../../imports/character/tiger-4.png";

export type CharacterId = "cat" | "dog" | "tiger";

export interface CharacterOption {
  id: CharacterId;
  name: string;
  description: string;
  images: string[];
  bg: string;
}

export const CHARACTER_OPTIONS: CharacterOption[] = [
  {
    id: "cat",
    name: "\uACE0\uC591\uC774",
    description: "\uC870\uC6A9\uD558\uACE0 \uB530\uB73B\uD55C \uB8E8\uD2F4 \uCE5C\uAD6C",
    images: [cat1, cat2, cat3, cat4],
    bg: "#F5E6D3",
  },
  {
    id: "dog",
    name: "\uAC15\uC544\uC9C0",
    description: "\uBC1D\uACE0 \uD65C\uBC1C\uD55C \uB8E8\uD2F4 \uCE5C\uAD6C",
    images: [dog1, dog2, dog3, dog4],
    bg: "#E3EEF8",
  },
  {
    id: "tiger",
    name: "\uD638\uB791\uC774",
    description: "\uB2F9\uCC28\uACE0 \uC6A9\uAC10\uD55C \uB8E8\uD2F4 \uCE5C\uAD6C",
    images: [tiger1, tiger2, tiger3, tiger4],
    bg: "#FFF0D8",
  },
];

export const DEFAULT_CHARACTER_ID: CharacterId = "cat";

export function getCharacterOption(id: CharacterId = DEFAULT_CHARACTER_ID) {
  return CHARACTER_OPTIONS.find((character) => character.id === id) ?? CHARACTER_OPTIONS[0];
}
