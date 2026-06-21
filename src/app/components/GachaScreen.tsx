import { useState } from "react";
import { ChevronLeft, Gift, Search, Leaf } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { GachaAnimation, type GachaTheme, type GachaItem } from "./GachaAnimation";
import { FURNITURE_ITEMS } from "./furniture";

interface GachaScreenProps {
  onBack?: () => void;
  /** Add obtained furniture ids to the room inventory */
  onObtain?: (furnitureIds: string[]) => void;
  leafBalance?: number;
  onSpendLeaves?: (amount: number) => boolean;
}

// 고즈넉 한옥 테마는 실제 가구 에셋을 보상으로 사용한다
const HANOK_POOL: GachaItem[] = FURNITURE_ITEMS.filter(
  (i) => i.theme === "hanok",
).map((i) => ({
  name: i.name,
  icon: "🏯",
  image: i.image,
  furnitureId: i.id,
  rarity: i.rarity ?? "일반",
}));

type Tab = "box" | "exchange";

interface GachaBox extends GachaTheme {
  obtained: number;
  total: number;
}

const BOXES: GachaBox[] = [
  {
    id: "hanok",
    name: "고즈넉 한옥 테마",
    obtained: 0,
    total: 12,
    accent: "#E8DCC8",
    border: "#C9B89A",
    icon: "🏯",
    bg: "linear-gradient(160deg,#2E2418,#5C4632 55%,#3A2E20)",
    glow: "#E0B872",
    dark: true,
    particles: ["🏮", "🌾", "🍵", "🪷"],
    pool: HANOK_POOL,
  },
  {
    id: "forest",
    name: "숲 속 세이지 테마",
    obtained: 0,
    total: 12,
    accent: "#D6E4D2",
    border: "#A9C4A0",
    icon: "🌿",
    bg: "linear-gradient(160deg,#1F3A2E,#3E6B4F 55%,#264A37)",
    glow: "#9DD6A0",
    dark: true,
    particles: ["🍃", "🌱", "🦋", "🌲"],
    pool: [
      { name: "이끼 화분", icon: "🪴", rarity: "일반" },
      { name: "그루터기 의자", icon: "🪵", rarity: "희귀" },
      { name: "넝쿨 커튼", icon: "🌿", rarity: "일반" },
      { name: "버섯 조명", icon: "🍄", rarity: "희귀" },
      { name: "작은 새 둥지", icon: "🪺", rarity: "전설" },
      { name: "솔방울 모빌", icon: "🌲", rarity: "일반" },
    ],
  },
  {
    id: "bakery",
    name: "작은 베이커리 아침 테마",
    obtained: 0,
    total: 12,
    accent: "#F7E6C8",
    border: "#E8C99A",
    icon: "🥐",
    bg: "linear-gradient(160deg,#F3D9A8,#FBF0D6 55%,#EFC987)",
    glow: "#FFFFFF",
    dark: false,
    particles: ["🥐", "🍞", "☕", "🧈"],
    pool: [
      { name: "빵 진열대", icon: "🥖", rarity: "희귀" },
      { name: "에스프레소 머신", icon: "☕", rarity: "전설" },
      { name: "밀가루 포대", icon: "🌾", rarity: "일반" },
      { name: "구움 오븐", icon: "🔥", rarity: "희귀" },
      { name: "크루아상 바구니", icon: "🥐", rarity: "일반" },
      { name: "창가 티 테이블", icon: "🪑", rarity: "희귀" },
    ],
  },
  {
    id: "space",
    name: "포근한 우주 테마",
    obtained: 0,
    total: 12,
    accent: "#D8D2EC",
    border: "#B6ADD9",
    icon: "🌙",
    bg: "linear-gradient(160deg,#1B1738,#3A2F63 55%,#211C40)",
    glow: "#B6A8E8",
    dark: true,
    particles: ["✨", "🌙", "⭐", "🪐"],
    pool: [
      { name: "달 무드등", icon: "🌙", rarity: "전설" },
      { name: "별자리 러그", icon: "✨", rarity: "희귀" },
      { name: "행성 모빌", icon: "🪐", rarity: "희귀" },
      { name: "구름 쿠션", icon: "☁️", rarity: "일반" },
      { name: "작은 망원경", icon: "🔭", rarity: "희귀" },
      { name: "유성 조명", icon: "💫", rarity: "일반" },
    ],
  },
];

export function GachaScreen({ onBack, onObtain, leafBalance = 0, onSpendLeaves }: GachaScreenProps = {}) {
  const [tab, setTab] = useState<Tab>("box");
  const [selectedId, setSelectedId] = useState<string>("hanok");
  const [pulling, setPulling] = useState<{
    theme: GachaBox;
    count: number;
  } | null>(null);
  const [spendError, setSpendError] = useState("");
  const startPull = (box: GachaBox, count: number) => {
    const cost = count === 1 ? 250 : 1250;
    if (leafBalance < cost || onSpendLeaves?.(cost) === false) {
      setSpendError("\uC789\uC0AC\uADC0\uAC00 \uBD80\uC871\uD574\uC694.");
      return;
    }
    setSpendError("");
    setSelectedId(box.id);
    setPulling({ theme: box, count });
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#F5E6D3] hover:bg-[#EBD9C2] flex items-center justify-center transition-colors"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={22} className="text-[#4A403A]" />
        </button>
        <div className="bg-[#F5E6D3] border border-[#D4C4B0] rounded-full px-6 py-2 shadow-sm">
          <h2 className="text-base font-bold text-[#4A403A]">루게더</h2>
        </div>
        <div className="w-10 h-10" />
      </div>

      {/* Currency */}
      <div className="px-6 pt-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#9DC59D] to-[#7FA87F] flex items-center justify-center shadow-inner">
              <Leaf size={14} className="text-white" />
            </div>
            <span className="text-sm text-[#8B7E74]">잎사귀</span>
            <span className="ml-auto text-base font-bold text-[#4A403A]">{leafBalance.toLocaleString()}</span>
          </div>
          <div className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#A8C8E8] to-[#7FA8D4] flex items-center justify-center shadow-inner">
              <span className="text-white text-xs">💎</span>
            </div>
            <span className="text-sm text-[#8B7E74]">다이아</span>
            <span className="ml-auto text-base font-bold text-[#4A403A]">0</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-5">
        <div className="flex border-b border-[#EDE3D3]">
          <button
            onClick={() => setTab("box")}
            className={`flex-1 pb-3 flex items-center justify-center gap-2 transition-colors relative ${
              tab === "box" ? "text-[#E89A4A]" : "text-[#B5A89C]"
            }`}
          >
            <Gift size={18} />
            <span className="font-semibold">뽑기 상자</span>
            {tab === "box" && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E89A4A] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setTab("exchange")}
            className={`flex-1 pb-3 flex items-center justify-center gap-2 transition-colors relative ${
              tab === "exchange" ? "text-[#E89A4A]" : "text-[#B5A89C]"
            }`}
          >
            <span>💎</span>
            <span className="font-semibold">조각 교환소</span>
            {tab === "exchange" && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E89A4A] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Probability link */}
      <div className="px-6 pt-3 flex justify-end">
        <button className="text-xs text-[#8B7E74] underline underline-offset-2 hover:text-[#4A403A]">
          ⓘ 뽑기 확률
        </button>
      </div>

      {spendError && (
        <div className="px-6 pt-3">
          <div className="rounded-xl bg-[#FBEAEA] px-4 py-2 text-center text-xs font-semibold text-[#D08585]">
            {spendError}
          </div>
        </div>
      )}

      {/* Content */}
      {tab === "box" ? (
        <div className="px-4 pt-3 space-y-4">
          {BOXES.map((box) => {
            const isSelected = selectedId === box.id;
            return (
              <div
                key={box.id}
                onClick={() => setSelectedId(box.id)}
                className={`w-full bg-white rounded-3xl p-4 shadow-sm text-left transition-all cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-[#F5C2C2] shadow-md"
                    : "hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  {/* Box icon */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: box.accent,
                      border: `2px solid ${box.border}`,
                    }}
                  >
                    <span className="text-4xl">{box.icon}</span>
                  </div>

                  <div className="flex-1 pt-1">
                    <h3 className="font-bold text-[#4A403A] mb-1">
                      {box.name}
                    </h3>
                    <div className="text-xs text-[#8B7E74] mb-2">
                      아이템 획득{" "}
                      <span className="text-[#E89A4A] font-semibold">
                        {box.obtained}
                      </span>
                      <span className="text-[#8B7E74]">/{box.total}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#E5DACB] text-xs text-[#8B7E74]">
                      <Search size={11} />
                      아이템 보기
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startPull(box, 1);
                    }}
                    disabled={leafBalance < 250}
                    className="bg-[#9DC59D] hover:bg-[#8FBA8F] disabled:bg-[#D4C4B0] rounded-xl py-2.5 px-3 text-center shadow-sm transition-colors"
                  >
                    <div className="text-white font-semibold text-sm">
                      1회 뽑기
                    </div>
                    <div className="flex items-center justify-center gap-1 text-white/95 text-xs mt-0.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-white/30 inline-flex items-center justify-center">
                        <Leaf size={9} className="text-white" />
                      </span>
                      250
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startPull(box, 5);
                    }}
                    disabled={leafBalance < 1250}
                    className="bg-[#F2B14A] hover:bg-[#E5A23B] disabled:bg-[#D4C4B0] rounded-xl py-2.5 px-3 text-center shadow-sm transition-colors"
                  >
                    <div className="text-white font-semibold text-sm">
                      연속 5회 뽑기
                    </div>
                    <div className="flex items-center justify-center gap-1 text-white/95 text-xs mt-0.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-white/30 inline-flex items-center justify-center">
                        <Leaf size={9} className="text-white" />
                      </span>
                      1,250
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="px-6 pt-10 text-center text-[#8B7E74]">
          <div className="text-5xl mb-3">💎</div>
          <p className="text-sm">조각을 모아 특별한 아이템으로 교환해보세요.</p>
        </div>
      )}

      {/* Gacha pull animation */}
      <AnimatePresence>
        {pulling && (
          <GachaAnimation
            theme={pulling.theme}
            count={pulling.count}
            onObtain={onObtain}
            onClose={() => setPulling(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
