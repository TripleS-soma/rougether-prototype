import type { CSSProperties } from "react";
import imgMirror from "../../imports/가구/eddfe86e5a2032bb969dc9b8c751b5fe3d193ee7.png";
import imgRug from "../../imports/가구/81135942a1e4a5837215c9b18b35e0e07b8a9810.png";
import imgClock from "../../imports/가구/a6bbd019d58714fccd73871365eb8dcbb9dffd1a.png";
import imgLamp from "../../imports/가구/d31ebf33275efbd18076595867876807f83da709.png";
import imgWindow from "../../imports/가구/ce544a3b81978b5a44b4c29169475dde9fa4a99f.png";
import imgPlant from "../../imports/가구/2c93434ddb8fb26189185f452f005139554f00d4.png";
import imgCushion from "../../imports/가구/6d24a40aeb6e3c7078e700461101166ce4ddb189.png";
import imgShelf from "../../imports/가구/44e046cbca7d54d13ef792817f227191208833ba.png";
import imgBed from "../../imports/가구/1ef11fcd8643a9a49305303823c668a3ff554e36.png";
import imgDrawer from "../../imports/가구/584ba16cf578863f0f63c1822006d1ce03a32921.png";
import imgSofa from "../../imports/가구/fab3e27133274d705a0c34d6c98ba975dabc616d.png";
import imgTv from "../../imports/가구/e7774d15cdf7e869c9e644ab773a34d7db0ee9bd.png";
import imgDesk from "../../imports/가구/fb9d206a137526f99c489c0674663e0ca3f9719e.png";
import bgSimple from "../../imports/___________.png";
import bgPaw from "../../imports/____________.png";
import bgFlower from "../../imports/__________.png";
// 고즈넉 한옥 테마 가구 (뽑기 보상)
import imgHanokBed from "../../imports/\uAC00\uAD6C/image-9.png";
import imgHanokArmchair from "../../imports/\uAC00\uAD6C/image-10.png";
import imgHanokDesk from "../../imports/\uAC00\uAD6C/image-11.png";
import imgHanokShelf from "../../imports/\uAC00\uAD6C/image-12.png";
import imgHanokRug from "../../imports/\uAC00\uAD6C/image-13.png";
import imgHanokPlant from "../../imports/\uAC00\uAD6C/image-14.png";
import imgHanokWindow from "../../imports/\uAC00\uAD6C/image-15.png";
import imgHanokDrawer from "../../imports/\uAC00\uAD6C/image-16.png";
import imgHanokTeaTable from "../../imports/\uAC00\uAD6C/image-17.png";

export type Rarity = "일반" | "희귀" | "전설";

export type FurnitureSlot =
  | "bed"
  | "shelf"
  | "window"
  | "storage"
  | "chair"
  | "plant"
  | "rug"
  | "table";

export interface FurnitureItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  placedStyle: CSSProperties;
  zIndex?: number;
  slot?: FurnitureSlot;
  /** Gacha theme this item belongs to (only for reward items) */
  theme?: string;
  /** Gacha rarity (only for reward items) */
  rarity?: Rarity;
}

export interface Wallpaper {
  id: string;
  name: string;
  price: number;
  /** Image URL or CSS background applied to the room */
  background?: string;
  backgroundImage?: string;
  /** Small preview swatch for the catalog tile */
  previewClass: string;
}

export const WALLPAPERS: Wallpaper[] = [
  {
    id: "simple",
    name: "심플 베이지",
    price: 0,
    backgroundImage: bgSimple,
    previewClass:
      "bg-gradient-to-b from-[#E8DCC8] to-[#F5E6D3]",
  },
  {
    id: "paw",
    name: "발자국 패턴",
    price: 400,
    backgroundImage: bgPaw,
    previewClass:
      "bg-gradient-to-b from-[#E8DCC8] to-[#F5E6D3]",
  },
  {
    id: "flower",
    name: "꽃무늬 패턴",
    price: 450,
    backgroundImage: bgFlower,
    previewClass:
      "bg-gradient-to-b from-[#F4D4D8] to-[#FBE6E8]",
  },
  {
    id: "mint",
    name: "민트 숲",
    price: 400,
    background: "linear-gradient(to bottom, #C8E4D4, #E4F0E0)",
    previewClass:
      "bg-gradient-to-b from-[#C8E4D4] to-[#E4F0E0]",
  },
  {
    id: "sky",
    name: "하늘 창가",
    price: 400,
    background: "linear-gradient(to bottom, #C4DCEC, #E4EEF6)",
    previewClass:
      "bg-gradient-to-b from-[#C4DCEC] to-[#E4EEF6]",
  },
  {
    id: "night",
    name: "별빛의 밤",
    price: 600,
    background: "linear-gradient(to bottom, #3E4A6B, #6A7AA0)",
    previewClass:
      "bg-gradient-to-b from-[#3E4A6B] to-[#6A7AA0]",
  },
];

export const DEFAULT_WALLPAPER_ID = "simple";

export const FURNITURE_SLOT_STYLES: Record<FurnitureSlot, CSSProperties> = {
  shelf: { left: "11%", top: "14%", width: "22%" },
  window: { right: "12%", top: "14%", width: "20%" },
  bed: { left: "6%", top: "38%", width: "34%" },
  storage: { left: "47%", top: "45%", width: "18%" },
  chair: { right: "6%", top: "44%", width: "28%" },
  plant: { left: "15%", bottom: "16%", width: "13%" },
  rug: {
    left: "33%",
    bottom: "7%",
    width: "38%",
    transform: "translateX(-50%)",
  },
  table: { right: "8%", bottom: "13%", width: "25%" },
};

export const FURNITURE_SLOT_BY_ID: Record<string, FurnitureSlot> = {
  bed: "bed",
  sofa: "bed",
  shelf: "shelf",
  clock: "shelf",
  window: "window",
  drawer: "storage",
  desk: "storage",
  tv: "storage",
  lamp: "chair",
  mirror: "chair",
  cushion: "chair",
  plant: "plant",
  rug: "rug",
  "hanok-bed": "bed",
  "hanok-shelf": "shelf",
  "hanok-window": "window",
  "hanok-drawer": "storage",
  "hanok-desk": "storage",
  "hanok-armchair": "chair",
  "hanok-plant": "plant",
  "hanok-rug": "rug",
  "hanok-teatable": "table",
};

export const getFurnitureSlot = (item: FurnitureItem): FurnitureSlot =>
  item.slot ?? FURNITURE_SLOT_BY_ID[item.id] ?? "storage";

export const getFurniturePlacement = (item: FurnitureItem): CSSProperties => ({
  ...FURNITURE_SLOT_STYLES[getFurnitureSlot(item)],
  zIndex: item.zIndex ?? 1,
});


export const FURNITURE_ITEMS: FurnitureItem[] = [
  {
    id: "bed",
    name: "포근한 침대",
    price: 800,
    image: imgBed,
    category: "가구",
    placedStyle: { right: "8%", top: "30%", width: "38%" },
    zIndex: 2,
  },
  {
    id: "sofa",
    name: "구름 소파",
    price: 700,
    image: imgSofa,
    category: "가구",
    placedStyle: { left: "6%", top: "35%", width: "44%" },
    zIndex: 2,
  },
  {
    id: "desk",
    name: "원목 책상",
    price: 600,
    image: imgDesk,
    category: "가구",
    placedStyle: { right: "6%", bottom: "20%", width: "32%" },
    zIndex: 3,
  },
  {
    id: "drawer",
    name: "민트 서랍",
    price: 500,
    image: imgDrawer,
    category: "가구",
    placedStyle: { left: "6%", bottom: "18%", width: "24%" },
    zIndex: 3,
  },
  {
    id: "shelf",
    name: "책 선반",
    price: 450,
    image: imgShelf,
    category: "가구",
    placedStyle: { left: "14%", top: "8%", width: "28%" },
    zIndex: 1,
  },
  {
    id: "tv",
    name: "레트로 TV",
    price: 900,
    image: imgTv,
    category: "가구",
    placedStyle: { right: "37%", bottom: "22%", width: "30%" },
    zIndex: 3,
  },
  {
    id: "lamp",
    name: "은은한 조명",
    price: 350,
    image: imgLamp,
    category: "조명",
    placedStyle: { right: "0%", top: "30%", width: "16%" },
    zIndex: 1,
  },
  {
    id: "clock",
    name: "벽 시계",
    price: 300,
    image: imgClock,
    category: "장식",
    placedStyle: { left: "44%", top: "4%", width: "16%" },
    zIndex: 1,
  },
  {
    id: "mirror",
    name: "타원 거울",
    price: 320,
    image: imgMirror,
    category: "장식",
    placedStyle: { right: "4%", bottom: "6%", width: "18%" },
    zIndex: 3,
  },
  {
    id: "window",
    name: "햇살 창문",
    price: 400,
    image: imgWindow,
    category: "장식",
    placedStyle: { right: "14%", top: "8%", width: "22%" },
    zIndex: 1,
  },
  {
    id: "plant",
    name: "초록 식물",
    price: 250,
    image: imgPlant,
    category: "장식",
    placedStyle: { left: "2%", bottom: "14%", width: "18%" },
    zIndex: 4,
  },
  {
    id: "cushion",
    name: "보들 쿠션",
    price: 200,
    image: imgCushion,
    category: "장식",
    placedStyle: { left: "38%", bottom: "7%", width: "20%" },
    zIndex: 4,
  },
  {
    id: "rug",
    name: "체크 러그",
    price: 380,
    image: imgRug,
    category: "러그",
    placedStyle: {
      left: "50%",
      bottom: "6%",
      width: "60%",
      transform: "translateX(-50%)",
    },
    zIndex: 0,
  },

  // ── 고즈넉 한옥 테마 (뽑기 보상) ──
  {
    id: "hanok-rug",
    name: "한옥 풀잎 러그",
    price: 0,
    image: imgHanokRug,
    category: "한옥",
    theme: "hanok",
    rarity: "일반",
    placedStyle: {
      left: "33%",
      bottom: "7%",
      width: "38%",
      transform: "translateX(-50%)",
    },
    zIndex: 0,
  },
  {
    id: "hanok-bed",
    name: "한옥 자개 침대",
    price: 0,
    image: imgHanokBed,
    category: "한옥",
    theme: "hanok",
    rarity: "전설",
    placedStyle: { left: "6%", top: "38%", width: "34%" },
    zIndex: 2,
  },
  {
    id: "hanok-armchair",
    name: "한옥 안락의자",
    price: 0,
    image: imgHanokArmchair,
    category: "한옥",
    theme: "hanok",
    rarity: "희귀",
    placedStyle: { right: "6%", top: "44%", width: "28%" },
    zIndex: 3,
  },
  {
    id: "hanok-desk",
    name: "한옥 좌식 책상",
    price: 0,
    image: imgHanokDesk,
    category: "한옥",
    theme: "hanok",
    rarity: "희귀",
    placedStyle: { left: "44%", top: "43%", width: "22%" },
    zIndex: 3,
  },
  {
    id: "hanok-shelf",
    name: "한옥 벽 선반",
    price: 0,
    image: imgHanokShelf,
    category: "한옥",
    theme: "hanok",
    rarity: "희귀",
    placedStyle: { left: "11%", top: "14%", width: "22%" },
    zIndex: 1,
  },
  {
    id: "hanok-window",
    name: "한옥 아치 창문",
    price: 0,
    image: imgHanokWindow,
    category: "한옥",
    theme: "hanok",
    rarity: "일반",
    placedStyle: { right: "12%", top: "14%", width: "20%" },
    zIndex: 1,
  },
  {
    id: "hanok-drawer",
    name: "한옥 서랍장",
    price: 0,
    image: imgHanokDrawer,
    category: "한옥",
    theme: "hanok",
    rarity: "희귀",
    placedStyle: { left: "47%", top: "45%", width: "18%" },
    zIndex: 3,
  },
  {
    id: "hanok-plant",
    name: "한옥 화분",
    price: 0,
    image: imgHanokPlant,
    category: "한옥",
    theme: "hanok",
    rarity: "일반",
    placedStyle: { left: "15%", bottom: "16%", width: "13%" },
    zIndex: 4,
  },
  {
    id: "hanok-teatable",
    name: "한옥 다과상",
    price: 0,
    image: imgHanokTeaTable,
    category: "한옥",
    theme: "hanok",
    rarity: "희귀",
    placedStyle: { right: "8%", bottom: "13%", width: "25%" },
    zIndex: 3,
  },
];

/** Default-owned furniture (everything except gacha reward themes) */
export const DEFAULT_OWNED_FURNITURE_IDS: string[] = FURNITURE_ITEMS.map((i) => i.id);