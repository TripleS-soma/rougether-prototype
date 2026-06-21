import {
  MessageCircle,
  Settings,
  Users,
  Crown,
  Target,
  Sun,
  Code,
  Dumbbell,
  ChevronLeft,
  ChevronRight,
  Search,
  Leaf,
} from "lucide-react";
import { useState } from "react";
import { CatAvatar } from "./CatAvatar";
import {
  FURNITURE_ITEMS,
  WALLPAPERS,
  DEFAULT_WALLPAPER_ID,
  getFurniturePlacement,
} from "./furniture";
import houseImg from "../../imports/집/82dee519f2b51b845193850615ada67cd091e5f7.png";

interface RoomCell {
  name: string;
  color: string;
  accent: string;
  isMine?: boolean;
}

interface GroupHouseScreenProps {
  onVisitFriend?: (name: string) => void;
  onVisitMyRoom?: () => void;
  onOpenChat?: () => void;
  onOpenSearch?: () => void;
  placedFurniture?: Set<string>;
  wallpaperId?: string;
}

export function GroupHouseScreen({
  onVisitFriend,
  onVisitMyRoom,
  onOpenChat,
  onOpenSearch,
  placedFurniture,
  wallpaperId,
}: GroupHouseScreenProps = {}) {
  const placed = placedFurniture ?? new Set<string>();
  const wallpaper =
    WALLPAPERS.find(
      (w) => w.id === (wallpaperId ?? DEFAULT_WALLPAPER_ID),
    ) ?? WALLPAPERS[0];

  const houses: {
    title: string;
    floors: { level: string; rooms: RoomCell[] }[];
  }[] = [
    {
      title: "소마파이팅",
      floors: [
        {
          level: "2층",
          rooms: [
            { name: "최준서", color: "#F5E1D8", accent: "#E8B8A8" },
            { name: "장진형", color: "#D9E8D4", accent: "#A8C898" },
          ],
        },
        {
          level: "1층",
          rooms: [
            { name: "임채영", color: "#F5E8C8", accent: "#D8B878" },
            {
              name: "나의 방",
              color: "#E8E0D0",
              accent: "#C8BCA8",
              isMine: true,
            },
          ],
        },
      ],
    },
    {
      title: "소마 2번째 집",
      floors: [
        {
          level: "2층",
          rooms: [
            { name: "김도현", color: "#E4DCF0", accent: "#B8A8D8" },
            { name: "박서연", color: "#FBE0D8", accent: "#E8B0A0" },
          ],
        },
        {
          level: "1층",
          rooms: [
            { name: "이지우", color: "#D8E8F0", accent: "#A8C4D8" },
            {
              name: "나의 방",
              color: "#E8E0D0",
              accent: "#C8BCA8",
              isMine: true,
            },
          ],
        },
      ],
    },
  ];

  const [houseIndex, setHouseIndex] = useState(0);
  const currentHouse = houses[houseIndex];
  const floors = currentHouse.floors;

  const prevHouse = () =>
    setHouseIndex((i) => (i - 1 + houses.length) % houses.length);
  const nextHouse = () => setHouseIndex((i) => (i + 1) % houses.length);

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden bg-gradient-to-b from-[#A8D4F0] via-[#C8E4F8] to-[#E4F0FB]">
      {/* Clouds */}
      <div className="absolute top-16 left-6 w-16 h-6 bg-white/70 rounded-full blur-sm"></div>
      <div className="absolute top-24 right-10 w-20 h-7 bg-white/70 rounded-full blur-sm"></div>
      <div className="absolute top-40 left-1/3 w-12 h-5 bg-white/60 rounded-full blur-sm"></div>

      {/* Top Status Bar */}
      <div className="relative px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white/90 rounded-full px-3 py-1.5 shadow-sm">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD58A] to-[#F0A858] flex items-center justify-center">
            <Crown size={12} className="text-white" />
          </div>
          <span className="text-xs font-bold text-[#4A403A]">
            Lv.20
          </span>
          <div className="w-16 h-2 bg-[#E8DCC8] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7FA87F] to-[#A8C898] rounded-full"
              style={{ width: "23%" }}
            ></div>
          </div>
          <span className="text-[10px] text-[#8B7E74]">
            32/140
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="bg-white/90 rounded-full p-1.5 shadow-sm hover:bg-white transition-colors"
            aria-label="집 탐색"
          >
            <Search size={16} className="text-[#4A403A]" />
          </button>
          <button className="bg-white/90 rounded-full p-1.5 shadow-sm">
            <Users size={16} className="text-[#4A403A]" />
          </button>
          <button className="bg-white/90 rounded-full p-1.5 shadow-sm">
            <Settings size={16} className="text-[#4A403A]" />
          </button>
        </div>
      </div>

      <div className="relative px-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-1 bg-white/90 rounded-full px-3 py-1 shadow-sm">
          <Leaf size={14} className="text-[#7FA87F]" />
          <span className="text-xs font-bold text-[#4A403A]">
            250
          </span>
        </div>
        <button
          onClick={onOpenChat}
          className="bg-white/90 rounded-2xl px-3 py-1 shadow-sm flex flex-col items-center hover:bg-white transition-colors"
        >
          <MessageCircle size={14} className="text-[#7FA87F]" />
          <span className="text-[10px] text-[#4A403A]">
            그룹톡
          </span>
        </button>
      </div>

      {/* Title Badge with house switcher */}
      <div className="relative flex justify-center items-center gap-3 mt-2 mb-3">
        <button
          onClick={prevHouse}
          className="w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#4A403A] hover:bg-white transition-colors"
          aria-label="이전 집"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="bg-white rounded-full px-6 py-2 shadow-sm border border-[#E8DCC8] flex items-center gap-2">
          <Crown size={16} className="text-[#D4A574]" />
          <h2 className="text-base font-bold text-[#4A403A]">{currentHouse.title}</h2>
        </div>
        <button
          onClick={nextHouse}
          className="w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#4A403A] hover:bg-white transition-colors"
          aria-label="다음 집"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="relative flex justify-center gap-1.5 mb-2">
        {houses.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === houseIndex ? "w-5 bg-[#7FA87F]" : "w-1.5 bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* House */}
      <div className="relative mx-auto mt-2 px-4">
        <div
          className="relative w-full"
          style={{ aspectRatio: "567 / 508" }}
        >
          {/* House background image */}
          <img
            src={houseImg}
            alt="우리 그룹의 집"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          />

          {/* Window positions (percent of container) */}
          {(() => {
            const windowSlots = [
              {
                top: "23%",
                left: "16%",
                width: "33%",
                height: "27%",
              }, // top-left
              {
                top: "23%",
                left: "51%",
                width: "33%",
                height: "27%",
              }, // top-right
              {
                top: "54%",
                left: "16%",
                width: "33%",
                height: "27%",
              }, // bottom-left
              {
                top: "54%",
                left: "51%",
                width: "33%",
                height: "27%",
              }, // bottom-right
            ];
            const allRooms = floors.flatMap((f) => f.rooms);
            return allRooms.map((room, idx) => {
              const pos = windowSlots[idx];
              const topPct = parseFloat(pos.top);
              const heightPct = parseFloat(pos.height);
              const leftPct = parseFloat(pos.left);
              const widthPct = parseFloat(pos.width);
              return (
                <div key={room.name}>
                {/* Name plate (rendered outside the clipped button) */}
                <div
                  className="absolute flex justify-center pointer-events-none"
                  style={{
                    top: `calc(${topPct + heightPct}% + 4px)`,
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    zIndex: 20,
                  }}
                >
                  <span className="text-[11px] font-semibold text-[#4A403A] bg-white/95 px-2.5 py-0.5 rounded-full shadow-sm border border-[#E8DCC8]">
                    {room.isMine ? `${room.name} (나)` : room.name}
                  </span>
                </div>
                <button
                  onClick={() =>
                    room.isMine
                      ? onVisitMyRoom?.()
                      : onVisitFriend?.(room.name)
                  }
                  className="absolute overflow-hidden hover:scale-105 active:scale-95 transition-transform cursor-pointer rounded-xs"
                  style={{
                    ...pos,
                    ...(room.isMine
                      ? wallpaper.backgroundImage
                        ? {
                            backgroundImage: `url(${wallpaper.backgroundImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : { background: wallpaper.background }
                      : { background: room.color }),
                  }}
                >
                  {room.isMine ? (
                    <>
                      {FURNITURE_ITEMS.filter((item) =>
                        placed.has(item.id),
                      ).map((item) => (
                        <img
                          key={item.id}
                          src={item.image}
                          alt=""
                          className="absolute object-contain pointer-events-none"
                          style={getFurniturePlacement(item)}
                        />
                      ))}
                      <div
                        className="absolute bottom-3 left-1/2 -translate-x-1/2"
                        style={{ zIndex: 5 }}
                      >
                        <CatAvatar size={40} />
                      </div>
                      <div className="absolute top-0.5 right-0.5 bg-[#FFE08A] text-[8px] font-bold px-1.5 py-0.5 rounded-full text-[#4A403A] z-10">
                        MY
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="absolute bottom-0 left-0 right-0 h-1/4"
                        style={{
                          backgroundColor: room.accent,
                          opacity: 0.4,
                        }}
                      ></div>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                        <CatAvatar size={40} />
                      </div>
                    </>
                  )}
                </button>
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* Group Routines */}
      <div className="relative px-4 mt-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-[#7FA87F]" />
            <h3 className="text-base font-bold text-[#4A403A]">우리 그룹의 루틴</h3>
          </div>

          <div className="space-y-3">
            {[
              {
                Icon: Sun,
                title: "80% 이상 기상 인증",
                desc: "오전 7시 전 기상",
                current: 3,
                goal: 4,
                color: "#F0A858",
                bg: "#FFEFD8",
              },
              {
                Icon: Code,
                title: "이번 달 코테 문제 풀이 인증",
                desc: "10회 목표",
                current: 6,
                goal: 10,
                color: "#7FA87F",
                bg: "#E0F0E0",
              },
              {
                Icon: Dumbbell,
                title: "주 3회 운동 인증",
                desc: "전체 멤버 평균",
                current: 2,
                goal: 3,
                color: "#E89090",
                bg: "#FBE0E0",
              },
            ].map((r) => {
              const pct = Math.min(100, Math.round((r.current / r.goal) * 100));
              return (
                <div
                  key={r.title}
                  className="flex items-center gap-3 bg-[#FBF8F3] rounded-xl p-3"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: r.bg }}
                  >
                    <r.Icon size={18} style={{ color: r.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-[#4A403A] truncate">
                        {r.title}
                      </p>
                      <span className="text-xs font-semibold text-[#7FA87F] flex-shrink-0">
                        {r.current}/{r.goal}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#E8DCC8] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: r.color }}
                      />
                    </div>
                    <p className="text-[10px] text-[#8B7E74] mt-1">{r.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}