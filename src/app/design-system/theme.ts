export type DesignId = "cozy" | "forest" | "hanok";

export interface AppDesign {
  id: DesignId;
  name: string;
  description: string;
  appShell: string;
  screen: string;
  surface: string;
  surfaceMuted: string;
  header: string;
  card: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryHover: string;
  primaryText: string;
  activeRing: string;
  avatarRing: string;
  avatarShadow: string;
  nav: string;
}

export const APP_DESIGNS: Record<DesignId, AppDesign> = {
  cozy: {
    id: "cozy",
    name: "포근",
    description: "따뜻한 기본 테마",
    appShell: "bg-[#E8DCC8]",
    screen: "bg-[#FBF8F3]",
    surface: "bg-white",
    surfaceMuted: "bg-[#F5F1E8]",
    header: "bg-white shadow-sm",
    card: "bg-white rounded-2xl shadow-sm",
    border: "border-[#E8DCC8]",
    text: "text-[#4A403A]",
    textMuted: "text-[#8B7E74]",
    primary: "bg-[#7FA87F]",
    primaryHover: "hover:bg-[#6D926D]",
    primaryText: "text-[#7FA87F]",
    activeRing: "ring-[#7FA87F]",
    avatarRing: "ring-[#E8DCC8]",
    avatarShadow: "shadow-sm",
    nav: "bg-white border-[#E8DCC8]",
  },
  forest: {
    id: "forest",
    name: "숲",
    description: "맑고 싱그러운 테마",
    appShell: "bg-[#DCE8D0]",
    screen: "bg-[#F6FAF1]",
    surface: "bg-white",
    surfaceMuted: "bg-[#EEF5E7]",
    header: "bg-white/95 shadow-sm",
    card: "bg-white rounded-2xl shadow-sm",
    border: "border-[#CFE0C3]",
    text: "text-[#334236]",
    textMuted: "text-[#667563]",
    primary: "bg-[#5F9B6A]",
    primaryHover: "hover:bg-[#4D8657]",
    primaryText: "text-[#5F9B6A]",
    activeRing: "ring-[#5F9B6A]",
    avatarRing: "ring-[#CFE0C3]",
    avatarShadow: "shadow-sm",
    nav: "bg-white border-[#CFE0C3]",
  },
  hanok: {
    id: "hanok",
    name: "한옥",
    description: "차분한 전통 테마",
    appShell: "bg-[#D8C8AF]",
    screen: "bg-[#FAF5EA]",
    surface: "bg-[#FFFDF8]",
    surfaceMuted: "bg-[#F2E8D7]",
    header: "bg-[#FFFDF8]/95 shadow-sm",
    card: "bg-[#FFFDF8] rounded-2xl shadow-sm",
    border: "border-[#D9C5A4]",
    text: "text-[#493B2E]",
    textMuted: "text-[#7F6E5E]",
    primary: "bg-[#9A7B4F]",
    primaryHover: "hover:bg-[#83663F]",
    primaryText: "text-[#9A7B4F]",
    activeRing: "ring-[#9A7B4F]",
    avatarRing: "ring-[#D9C5A4]",
    avatarShadow: "shadow-sm",
    nav: "bg-[#FFFDF8] border-[#D9C5A4]",
  },
};

export const DEFAULT_DESIGN_ID: DesignId = "cozy";
export const DESIGN_OPTIONS = Object.values(APP_DESIGNS);

export function getDesign(id: DesignId = DEFAULT_DESIGN_ID) {
  return APP_DESIGNS[id] ?? APP_DESIGNS[DEFAULT_DESIGN_ID];
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
