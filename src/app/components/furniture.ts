import type { CSSProperties } from "react";
import imgMirror from "../../imports/furniture/Basic_chair_mirror.png";
import imgRug from "../../imports/furniture/Basic_rug_rug.png";
import imgClock from "../../imports/furniture/Basic_shelf_clock.png";
import imgLamp from "../../imports/furniture/Basic_chair_lamp.png";
import imgWindow from "../../imports/furniture/Basic_window_window.png";
import imgPlant from "../../imports/furniture/Basic_plant_plant.png";
import imgCushion from "../../imports/furniture/Basic_chair_cushion.png";
import imgShelf from "../../imports/furniture/Basic_shelf_shelf.png";
import imgBed from "../../imports/furniture/Basic_bed_bed.png";
import imgDrawer from "../../imports/furniture/Basic_storage_drawer.png";
import imgSofa from "../../imports/furniture/Basic_bed_sofa.png";
import imgTv from "../../imports/furniture/Basic_storage_tv.png";
import imgDesk from "../../imports/furniture/Basic_storage_desk.png";
import bgSimple from "../../imports/wallpaper/Basic_wallpaper_simple.png";
import bgPaw from "../../imports/wallpaper/Basic_wallpaper_paw.png";
import bgFlower from "../../imports/wallpaper/Basic_wallpaper_flower.png";
import bgForestSimple from "../../imports/wallpaper/Forest_wallpaper_simple.png";
import bgForestGrass from "../../imports/wallpaper/Forest_wallpaper_grass.png";
import bgHanokSimple from "../../imports/wallpaper/Hanok_wallpaper_simple.png";
// 고즈넉 한옥 테마 가구 (뽑기 보상)
import imgHanokBed from "../../imports/furniture/Hanok_bed_bed.png";
import imgHanokArmchair from "../../imports/furniture/Hanok_chair_armchair.png";
import imgHanokDesk from "../../imports/furniture/Hanok_storage_desk.png";
import imgHanokShelf from "../../imports/furniture/Hanok_shelf_shelf.png";
import imgHanokRug from "../../imports/furniture/Hanok_rug_rug.png";
import imgHanokPlant from "../../imports/furniture/Hanok_plant_plant.png";
import imgHanokWindow from "../../imports/furniture/Hanok_window_window.png";
import imgHanokDrawer from "../../imports/furniture/Hanok_storage_drawer.png";
import imgHanokTeaTable from "../../imports/furniture/Hanok_table_teatable.png";

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
    id: "forest-simple",
    name: "\uC232\uC18D \uBCBD\uC9C0",
    price: 500,
    backgroundImage: bgForestSimple,
    previewClass:
      "bg-gradient-to-b from-[#DDEAD2] to-[#F3E8D3]",
  },
  {
    id: "forest-grass",
    name: "\uD480\uB978 \uC232 \uBCBD\uC9C0",
    price: 500,
    backgroundImage: bgForestGrass,
    previewClass:
      "bg-gradient-to-b from-[#C8E4D4] to-[#E4F0E0]",
  },
  {
    id: "hanok-simple",
    name: "\uD55C\uC625 \uBCBD\uC9C0",
    price: 600,
    backgroundImage: bgHanokSimple,
    previewClass:
      "bg-gradient-to-b from-[#E8DCC8] to-[#F5E6D3]",
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
  window: { right: "12%", top: "10%", width: "20%" },
  bed: { left: "6%", top: "38%", width: "34%" },
  storage: { left: "47%", top: "45%", width: "18%" },
  chair: { right: "4%", top: "40%", width: "28%" },
  plant: { left: "10%", bottom: "14%", width: "13%" },
  rug: {
    left: "50%",
    bottom: "7%",
    width: "38%",
    transform: "translateX(-50%)",
  },
  table: { right: "4%", bottom: "13%", width: "25%" },
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
    placedStyle: FURNITURE_SLOT_STYLES["bed"],
    zIndex: 2,
  },
  {
    id: "sofa",
    name: "구름 소파",
    price: 700,
    image: imgSofa,
    category: "가구",
    placedStyle: FURNITURE_SLOT_STYLES["bed"],
    zIndex: 2,
  },
  {
    id: "desk",
    name: "원목 책상",
    price: 600,
    image: imgDesk,
    category: "가구",
    placedStyle: FURNITURE_SLOT_STYLES["storage"],
    zIndex: 3,
  },
  {
    id: "drawer",
    name: "민트 서랍",
    price: 500,
    image: imgDrawer,
    category: "가구",
    placedStyle: FURNITURE_SLOT_STYLES["storage"],
    zIndex: 3,
  },
  {
    id: "shelf",
    name: "책 선반",
    price: 450,
    image: imgShelf,
    category: "가구",
    placedStyle: FURNITURE_SLOT_STYLES["shelf"],
    zIndex: 1,
  },
  {
    id: "tv",
    name: "레트로 TV",
    price: 900,
    image: imgTv,
    category: "가구",
    placedStyle: FURNITURE_SLOT_STYLES["storage"],
    zIndex: 3,
  },
  {
    id: "lamp",
    name: "은은한 조명",
    price: 350,
    image: imgLamp,
    category: "조명",
    placedStyle: FURNITURE_SLOT_STYLES["chair"],
    zIndex: 1,
  },
  {
    id: "clock",
    name: "벽 시계",
    price: 300,
    image: imgClock,
    category: "장식",
    placedStyle: FURNITURE_SLOT_STYLES["shelf"],
    zIndex: 1,
  },
  {
    id: "mirror",
    name: "타원 거울",
    price: 320,
    image: imgMirror,
    category: "장식",
    placedStyle: FURNITURE_SLOT_STYLES["chair"],
    zIndex: 3,
  },
  {
    id: "window",
    name: "햇살 창문",
    price: 400,
    image: imgWindow,
    category: "장식",
    placedStyle: FURNITURE_SLOT_STYLES["window"],
    zIndex: 1,
  },
  {
    id: "plant",
    name: "초록 식물",
    price: 250,
    image: imgPlant,
    category: "장식",
    placedStyle: FURNITURE_SLOT_STYLES["plant"],
    zIndex: 4,
  },
  {
    id: "cushion",
    name: "보들 쿠션",
    price: 200,
    image: imgCushion,
    category: "장식",
    placedStyle: FURNITURE_SLOT_STYLES["chair"],
    zIndex: 4,
  },
  {
    id: "rug",
    name: "체크 러그",
    price: 380,
    image: imgRug,
    category: "러그",
    placedStyle: FURNITURE_SLOT_STYLES["rug"],
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
    placedStyle: FURNITURE_SLOT_STYLES["rug"],
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
    placedStyle: FURNITURE_SLOT_STYLES["bed"],
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
    placedStyle: FURNITURE_SLOT_STYLES["chair"],
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
    placedStyle: FURNITURE_SLOT_STYLES["storage"],
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
    placedStyle: FURNITURE_SLOT_STYLES["shelf"],
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
    placedStyle: FURNITURE_SLOT_STYLES["window"],
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
    placedStyle: FURNITURE_SLOT_STYLES["storage"],
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
    placedStyle: FURNITURE_SLOT_STYLES["plant"],
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
    placedStyle: FURNITURE_SLOT_STYLES["table"],
    zIndex: 3,
  },
];

/** Default-owned furniture (everything except gacha reward themes) */
export const DEFAULT_OWNED_FURNITURE_IDS: string[] = FURNITURE_ITEMS.map((i) => i.id);