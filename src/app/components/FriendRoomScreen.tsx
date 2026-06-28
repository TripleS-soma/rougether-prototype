import {
  ArrowLeft,
  Bell,
  Camera,
  CheckCircle2,
  Circle,
  Heart,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import { CharacterId, DEFAULT_CHARACTER_ID } from "./character";
import {
  CharacterAvatar,
  DEFAULT_DESIGN_ID,
  DesignId,
  cx,
  getDesign,
} from "../design-system";
import {
  FURNITURE_ITEMS,
  WALLPAPERS,
  DEFAULT_WALLPAPER_ID,
  getFurniturePlacement,
} from "./furniture";
import type { Routine } from "./MyRoomZoomScreen";

interface FriendRoomScreenProps {
  onBack?: () => void;
  friendName?: string;
  placedFurniture?: Set<string>;
  wallpaperId?: string;
  routines?: Routine[];
  characterId?: CharacterId;
  designId?: DesignId;
}

const defaultRoutines: Routine[] = [
  { id: "friend-1", title: "\uC544\uCE68 \uAE30\uC0C1", completed: true, alarmEnabled: true, time: "07:00" },
  { id: "friend-2", title: "\uB3C5\uC11C 30\uBD84", completed: true, photoVerify: true },
  { id: "friend-3", title: "\uC6B4\uB3D9 \uC778\uC99D", completed: true, photoVerify: true },
  { id: "friend-4", title: "\uC601\uC5B4 \uACF5\uBD80", completed: true, alarmEnabled: true, time: "20:00" },
  { id: "friend-5", title: "\uD558\uB8E8 \uD68C\uACE0", completed: false, alarmEnabled: true, time: "23:00" },
];

function formatRoutineTime(time: string) {
  const [h, m] = time.split(":").map((v) => parseInt(v, 10));
  const ampm = h >= 12 ? "\uC624\uD6C4" : "\uC624\uC804";
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  return `${ampm} ${hour12}:${String(m).padStart(2, "0")}`;
}

export function FriendRoomScreen({
  onBack,
  friendName = "\uCE5C\uAD6C",
  placedFurniture,
  wallpaperId,
  routines = defaultRoutines,
  characterId = DEFAULT_CHARACTER_ID,
  designId = DEFAULT_DESIGN_ID,
}: FriendRoomScreenProps = {}) {
  const placed = placedFurniture ?? new Set<string>();
  const wallpaper =
    WALLPAPERS.find((w) => w.id === (wallpaperId ?? DEFAULT_WALLPAPER_ID)) ??
    WALLPAPERS[0];
  const design = getDesign(designId);
  const visibleRoutines = routines.length > 0 ? routines : defaultRoutines;
  const completedCount = visibleRoutines.filter((r) => r.completed).length;
  const progress = visibleRoutines.length
    ? (completedCount / visibleRoutines.length) * 100
    : 0;

  return (
    <div className={cx("min-h-screen pb-24", design.screen)}>
      <div className={cx(design.header, "px-6 py-4 flex items-center justify-between")}>
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#F5F1E8] hover:bg-[#E8DCC8] flex items-center justify-center text-[#4A403A] transition-colors flex-shrink-0"
            aria-label="\uB4A4\uB85C\uAC00\uAE30"
          >
            <ArrowLeft size={20} />
          </button>
          <CharacterAvatar
            characterId={characterId}
            designId={designId}
            size={40}
            className="flex-shrink-0"
          />
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-[#4A403A] truncate">
              {friendName}{"\uC758 \uBC29"}
            </h2>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#E89A4A]">
                <span aria-hidden="true">{"\uD83D\uDD25"}</span>
                <span>{"7\uC77C"}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6">
        <div
          className="rounded-3xl relative overflow-hidden min-h-[400px]"
          style={
            wallpaper.backgroundImage
              ? {
                  backgroundImage: `url(${wallpaper.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { background: wallpaper.background }
          }
        >
          {FURNITURE_ITEMS.filter((item) => placed.has(item.id)).map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt=""
              className="absolute object-contain pointer-events-none"
              style={getFurniturePlacement(item)}
            />
          ))}

          <div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            style={{ zIndex: 5 }}
          >
            <CharacterAvatar
              characterId={characterId}
              designId={designId}
              size={120}
              variant="room"
            />
          </div>
        </div>
      </div>

      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-[#4A403A]">
            {friendName}{"\uC758 \uB8E8\uD2F4"}
          </h3>
          <span className="text-sm font-semibold text-[#7FA87F]">
            {completedCount} / {visibleRoutines.length}
          </span>
        </div>

        <div className="mb-4 h-2.5 bg-[#F5F1E8] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#7FA87F] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-2.5 mb-6">
          {visibleRoutines.map((routine) => (
            <div
              key={routine.id}
              className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 border-l-4 border-[#7FA87F]"
            >
              {routine.completed ? (
                <CheckCircle2 size={24} className="text-[#7FA87F] flex-shrink-0" />
              ) : (
                <Circle size={24} className="text-[#D4C4B0] flex-shrink-0" />
              )}
              {routine.emoji && (
                <span className="text-lg flex-shrink-0">{routine.emoji}</span>
              )}
              <div className="flex-1 min-w-0">
                <span
                  className={`block ${
                    routine.completed
                      ? "text-[#8B7E74] line-through"
                      : "text-[#4A403A]"
                  }`}
                >
                  {routine.title}
                </span>
                {(routine.alarmEnabled && routine.time) || routine.photoVerify ? (
                  <div className="flex items-center gap-2 mt-0.5">
                    {routine.alarmEnabled && routine.time && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#8B7E74]">
                        <Bell size={11} className="text-[#E8A87C]" />
                        {formatRoutineTime(routine.time)}
                      </span>
                    )}
                    {routine.photoVerify && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#8B7E74]">
                        <Camera size={11} className="text-[#7FA8D4]" />
                        {"\uC0AC\uC9C4 \uC778\uC99D"}
                      </span>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <button className="w-full bg-[#7FA87F] text-white py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#6D926D] transition-colors">
            <ThumbsUp size={16} />
            {"\uC798\uD558\uACE0 \uC788\uC5B4!"}
          </button>
          <button className="w-full bg-[#F5E6D3] text-[#4A403A] py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#E8DCC8] transition-colors">
            <Heart size={16} />
            {"\uC751\uC6D0\uD558\uAE30"}
          </button>
          <button className="w-full bg-[#FFF8E7] text-[#4A403A] py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#F5E6D3] transition-colors">
            <Sparkles size={16} />
            {"\uC624\uB298\uB3C4 \uCD5C\uACE0!"}
          </button>
        </div>
      </div>
    </div>
  );
}
