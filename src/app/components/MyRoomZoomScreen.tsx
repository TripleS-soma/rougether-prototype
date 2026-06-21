import { useRef, useState } from "react";
import {
  Edit,
  Gift,
  CheckCircle2,
  Circle,
  Leaf,
  Star,
  Plus,
  Bell,
  Camera,
  MoreVertical,
  Pencil,
  Trash2,
  Download,
} from "lucide-react";
import {
  FURNITURE_ITEMS,
  WALLPAPERS,
  DEFAULT_WALLPAPER_ID,
  getFurniturePlacement,
} from "./furniture";
import { CatAvatar } from "./CatAvatar";
import { CharacterId, DEFAULT_CHARACTER_ID, getCharacterOption } from "./character";

export type RoutineCategory = string;

export type CategoryVisibility = "public" | "neighbor" | "partial";

export const VISIBILITY_LABELS: Record<CategoryVisibility, string> = {
  public: "전체 공개",
  neighbor: "이웃 공개",
  partial: "일부 공개",
};

export interface RoutineCategoryMeta {
  id: RoutineCategory;
  label: string;
  emoji: string;
  color: string;
  visibility: CategoryVisibility;
}

/** Color palette assigned to newly created categories */
export const CATEGORY_COLORS = [
  "#E8A87C",
  "#7FA8D4",
  "#C8869C",
  "#7FA87F",
  "#D4A574",
  "#9B8BC4",
  "#E6A0A0",
  "#6FB7B0",
];

export const ROUTINE_CATEGORIES: RoutineCategoryMeta[] = [
  { id: "일정", label: "일정", emoji: "🗓️", color: "#E8A87C", visibility: "public" },
  { id: "공부", label: "공부", emoji: "📚", color: "#7FA8D4", visibility: "public" },
  { id: "취미", label: "취미", emoji: "🎨", color: "#C8869C", visibility: "neighbor" },
  { id: "건강", label: "건강", emoji: "💪", color: "#7FA87F", visibility: "partial" },
  { id: "기타", label: "기타", emoji: "✨", color: "#B5A89C", visibility: "public" },
];

export interface Routine {
  id: string;
  title: string;
  completed: boolean;
  emoji?: string;
  category?: RoutineCategory;
  days?: number[]; // 0(Sun) ~ 6(Sat)
  startDate?: string; // "YYYY-MM-DD"
  endDate?: string; // "YYYY-MM-DD"
  alarmEnabled?: boolean;
  time?: string; // "HH:MM" 24h
  photoVerify?: boolean;
  kind?: "routine" | "todo";
}

/** "HH:MM" 24h -> "오전 7:00" */
function formatRoutineTime(time: string) {
  const [h, m] = time.split(":").map((v) => parseInt(v, 10));
  const ampm = h >= 12 ? "오후" : "오전";
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  return `${ampm} ${hour12}:${String(m).padStart(2, "0")}`;
}

interface MyRoomZoomScreenProps {
  onEdit?: () => void;
  onAddRoutine?: () => void;
  onOpenGacha?: () => void;
  placedFurniture?: Set<string>;
  wallpaperId?: string;
  routines?: Routine[];
  categories?: RoutineCategoryMeta[];
  onToggleRoutine?: (id: string) => void;
  onQuickAddRoutine?: (category: string, title: string) => void;
  onRenameRoutine?: (id: string, title: string) => void;
  onDeleteRoutine?: (id: string) => void;
  characterId?: CharacterId;
}

export function MyRoomZoomScreen({
  onEdit,
  onAddRoutine,
  onOpenGacha,
  placedFurniture,
  wallpaperId,
  routines = [],
  categories = ROUTINE_CATEGORIES,
  onToggleRoutine,
  onQuickAddRoutine,
  onRenameRoutine,
  onDeleteRoutine,
  characterId = DEFAULT_CHARACTER_ID,
}: MyRoomZoomScreenProps = {}) {
  const placed = placedFurniture ?? new Set<string>();
  const wallpaper =
    WALLPAPERS.find(
      (w) => w.id === (wallpaperId ?? DEFAULT_WALLPAPER_ID),
    ) ?? WALLPAPERS[0];

  const character = getCharacterOption(characterId);
  const [characterFrame, setCharacterFrame] = useState(0);
  const [addingCategory, setAddingCategory] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const roomRef = useRef<HTMLDivElement>(null);

  const toggleRoutine = (id: string) => onToggleRoutine?.(id);

  const startEdit = (routine: Routine) => {
    setEditingId(routine.id);
    setEditTitle(routine.title);
    setMenuOpenId(null);
  };

  const saveEdit = (id: string) => {
    const title = editTitle.trim();
    if (title) onRenameRoutine?.(id, title);
    setEditingId(null);
  };

  const commitTodo = (categoryId: string) => {
    const title = newTodo.trim();
    if (!title) return;
    onQuickAddRoutine?.(categoryId, title);
    setNewTodo("");
  };

  const completedCount = routines.filter(
    (r) => r.completed,
  ).length;
  const saveRoomPhoto = async () => {
    const room = roomRef.current;
    if (!room) return;

    const width = room.offsetWidth;
    const height = room.offsetHeight;
    const clone = room.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('[data-capture-hidden="true"]').forEach((node) => {
      node.remove();
    });
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;

    const serialized = new XMLSerializer().serializeToString(clone);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <foreignObject width="100%" height="100%">${serialized}</foreignObject>
      </svg>
    `;
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const image = new Image();

    try {
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Failed to render room image"));
        image.src = url;
      });

      const canvas = document.createElement("canvas");
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
      context.drawImage(image, 0, 0, width, height);

      const link = document.createElement("a");
      link.download = `my-room-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center overflow-hidden p-1">
            <img
              src={character.images[0]}
              alt={character.name}
              className="h-9 w-9 object-contain"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#4A403A]">
              준서의 방
            </h2>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#E89A4A]">
                <span aria-hidden="true">{"\uD83D\uDD25"}</span>
                <span>{"7\uC77C"}</span>
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="text-[#8B7E74] hover:text-[#4A403A] transition-colors"
        >
          <Edit size={20} />
        </button>
      </div>

      {/* Room View */}
      <div className="relative px-4 pt-6">
        {/* Main room display */}
        <div
          ref={roomRef}
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
          {/* Placed furniture from decor screen */}
          {FURNITURE_ITEMS.filter((item) =>
            placed.has(item.id),
          ).map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.name}
              className="absolute object-contain pointer-events-none"
              style={getFurniturePlacement(item)}
            />
          ))}

          {/* Cat character (click to change pose) */}
          <button
            onClick={() =>
              setCharacterFrame((i) => (i + 1) % character.images.length)
            }
            className="absolute bottom-12 left-1/2 -translate-x-1/2 hover:scale-110 active:scale-95 transition-transform"
            style={{ zIndex: 5 }}
            aria-label="\uCE90\uB9AD\uD130 \uC0AC\uC9C4 \uBC14\uAFB8\uAE30"
          >
            <img
              src={character.images[characterFrame]}
              alt={character.name}
              className="w-[120px] h-[120px] object-contain"
            />
          </button>

          <button
            type="button"
            data-capture-hidden="true"
            onClick={onOpenGacha}
            className="absolute bottom-[68px] right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#4A403A] shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="\uBF51\uAE30 \uC0C1\uC810"
            title="\uBF51\uAE30 \uC0C1\uC810"
          >
            <Gift size={19} />
          </button>

          <button
            type="button"
            data-capture-hidden="true"
            onClick={saveRoomPhoto}
            className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#4A403A] shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="\uB0B4 \uBC29 \uC0AC\uC9C4 \uC800\uC7A5"
            title="\uB0B4 \uBC29 \uC0AC\uC9C4 \uC800\uC7A5"
          >
            <Download size={19} />
          </button>
        </div>
      </div>

      {/* Routine Management Section */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#4A403A]">
            오늘의 루틴
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-[#7FA87F]">
              {completedCount} / {routines.length}
            </span>
            <button
              onClick={onAddRoutine}
              className="w-8 h-8 rounded-full bg-[#7FA87F] hover:bg-[#6D926D] text-white flex items-center justify-center shadow-sm transition-colors"
              aria-label="루틴 추가"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-2.5 bg-[#F5F1E8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7FA87F] rounded-full transition-all duration-500"
              style={{
                width: `${(completedCount / routines.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Routine List grouped by category */}
        <div className="space-y-5 mb-6">
          {categories.map((cat, idx) => {
            const isFallback = idx === categories.length - 1;
            const knownIds = categories.map((c) => c.id);
            const items = routines.filter((r) => {
              const c = r.category;
              if (c === cat.id) return true;
              // Orphaned routines (deleted category) fall into the last category
              return isFallback && (!c || !knownIds.includes(c));
            });
            const isAdding = addingCategory === cat.id;
            if (items.length === 0 && !isAdding) return null;
            const doneInCat = items.filter((r) => r.completed).length;
            return (
              <div key={cat.id}>
                {/* Category header */}
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                    style={{ backgroundColor: `${cat.color}33` }}
                  >
                    {cat.emoji}
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </span>
                  <span className="text-xs text-[#B5A89C]">
                    {doneInCat}/{items.length}
                  </span>
                  <button
                    onClick={() => {
                      setNewTodo("");
                      setAddingCategory(isAdding ? null : cat.id);
                    }}
                    className="ml-auto w-6 h-6 rounded-full flex items-center justify-center text-white shadow-sm transition-transform hover:scale-105"
                    style={{ backgroundColor: cat.color }}
                    aria-label={`${cat.label}에 할 일 추가`}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Routines in category */}
                <div className="space-y-2.5">
                  {items.map((routine) => {
                    const isEditing = editingId === routine.id;
                    const menuOpen = menuOpenId === routine.id;
                    return (
                      <div key={routine.id} className="relative">
                        <div
                          className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 border-l-4"
                          style={{ borderLeftColor: cat.color }}
                        >
                          {isEditing ? (
                            <>
                              <Circle
                                size={24}
                                className="text-[#D4C4B0] flex-shrink-0"
                              />
                              <input
                                autoFocus
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") saveEdit(routine.id);
                                  if (e.key === "Escape") setEditingId(null);
                                }}
                                onBlur={() => saveEdit(routine.id)}
                                className="flex-1 bg-transparent outline-none text-[#4A403A]"
                              />
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => toggleRoutine(routine.id)}
                                className="flex items-center gap-3 flex-1 min-w-0 text-left hover:opacity-80 transition-opacity"
                              >
                                {routine.completed ? (
                                  <CheckCircle2
                                    size={24}
                                    className="text-[#7FA87F] flex-shrink-0"
                                  />
                                ) : (
                                  <Circle
                                    size={24}
                                    className="text-[#D4C4B0] flex-shrink-0"
                                  />
                                )}
                                {routine.emoji && (
                                  <span className="text-lg flex-shrink-0">
                                    {routine.emoji}
                                  </span>
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
                                  {routine.kind === "todo" && (
                                    <span className="mt-0.5 inline-flex w-fit rounded-full bg-[#F5E6D3] px-2 py-0.5 text-[10px] font-semibold text-[#8B7E74]">
                                      {"\uD22C\uB450"}
                                    </span>
                                  )}
                                  {(routine.alarmEnabled && routine.time) ||
                                  routine.photoVerify ? (
                                    <div className="flex items-center gap-2 mt-0.5">
                                      {routine.alarmEnabled && routine.time && (
                                        <span className="inline-flex items-center gap-1 text-[11px] text-[#8B7E74]">
                                          <Bell
                                            size={11}
                                            className="text-[#E8A87C]"
                                          />
                                          {formatRoutineTime(routine.time)}
                                        </span>
                                      )}
                                      {routine.photoVerify && (
                                        <span className="inline-flex items-center gap-1 text-[11px] text-[#8B7E74]">
                                          <Camera
                                            size={11}
                                            className="text-[#7FA8D4]"
                                          />
                                          사진 인증
                                        </span>
                                      )}
                                    </div>
                                  ) : null}
                                </div>
                              </button>
                              <button
                                onClick={() =>
                                  setMenuOpenId(menuOpen ? null : routine.id)
                                }
                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F5F1E8] transition-colors flex-shrink-0"
                                aria-label="루틴 메뉴"
                              >
                                <MoreVertical
                                  size={18}
                                  className="text-[#B5A89C]"
                                />
                              </button>
                            </>
                          )}
                        </div>

                        {/* Kebab dropdown */}
                        {menuOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setMenuOpenId(null)}
                            />
                            <div className="absolute right-2 top-[52px] z-20 w-32 bg-white rounded-xl shadow-lg border border-[#EDE3D3] overflow-hidden">
                              <button
                                onClick={() => startEdit(routine)}
                                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-[#4A403A] hover:bg-[#F5F1E8] transition-colors"
                              >
                                <Pencil size={15} className="text-[#8B7E74]" />
                                수정하기
                              </button>
                              <button
                                onClick={() => {
                                  onDeleteRoutine?.(routine.id);
                                  setMenuOpenId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-[#D08585] hover:bg-[#FBEAEA] transition-colors border-t border-[#F0E9DC]"
                              >
                                <Trash2 size={15} />
                                삭제하기
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}

                  {/* Quick add input */}
                  {isAdding && (
                    <div
                      className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 border-l-4"
                      style={{ borderLeftColor: cat.color }}
                    >
                      <Circle
                        size={24}
                        className="text-[#D4C4B0] flex-shrink-0"
                      />
                      <input
                        autoFocus
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") commitTodo(cat.id);
                          if (e.key === "Escape") setAddingCategory(null);
                        }}
                        onBlur={() => {
                          if (!newTodo.trim()) setAddingCategory(null);
                        }}
                        placeholder="할 일 입력 후 Enter"
                        className="flex-1 bg-transparent outline-none text-[#4A403A] placeholder:text-[#B8A593]"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reward Card */}
        <div className="bg-gradient-to-br from-[#7FA87F] to-[#6D926D] rounded-2xl p-6 shadow-lg mb-6 relative overflow-hidden">
          {/* Happy cat decoration */}
          <div className="absolute -top-4 -right-4 opacity-20">
            <CatAvatar size={100} variant="happy" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-white font-semibold mb-1">
                  오늘의 보상
                </h4>
                <p className="text-white/80 text-sm">
                  루틴을 완료하고 보상을 받아보세요!
                </p>
              </div>
              <Star
                className="text-[#FFF8E7] fill-[#FFF8E7]"
                size={32}
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="text-white" size={20} />
              <span className="text-white font-bold text-xl">
                +120 잎사귀
              </span>
            </div>
            <button className="w-full bg-white text-[#7FA87F] py-3 rounded-full font-semibold hover:bg-[#F5F1E8] transition-colors">
              보상 받기
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="flex-1 bg-white border border-[#D4C4B0] text-[#4A403A] py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#F5F1E8] transition-colors"
          >
            <Edit size={20} />방 편집
          </button>
        </div>
      </div>
    </div>
  );
}