import { ArrowLeft, Plus, ChevronRight, Bell, Camera } from "lucide-react";
import {
  ROUTINE_CATEGORIES,
  type Routine,
  type RoutineCategoryMeta,
} from "./MyRoomZoomScreen";

interface RoutineManageScreenProps {
  routines?: Routine[];
  categories?: RoutineCategoryMeta[];
  onBack?: () => void;
  onAdd?: () => void;
  onEdit?: (routine: Routine) => void;
}

/** "HH:MM" 24h -> "오전 7:00" */
function formatTime(time: string) {
  const [h, m] = time.split(":").map((v) => parseInt(v, 10));
  const ampm = h >= 12 ? "오후" : "오전";
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  return `${ampm} ${hour12}:${String(m).padStart(2, "0")}`;
}

export function RoutineManageScreen({
  routines = [],
  categories = ROUTINE_CATEGORIES,
  onBack,
  onAdd,
  onEdit,
}: RoutineManageScreenProps = {}) {
  return (
    <div className="min-h-screen bg-[#FBF8F3] pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#F5F1E8] hover:bg-[#E8DCC8] flex items-center justify-center text-[#4A403A] transition-colors"
            aria-label="뒤로가기"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold text-[#4A403A]">루틴 관리</h2>
        </div>
        <button
          onClick={onAdd}
          className="w-10 h-10 rounded-full bg-[#7FA87F] hover:bg-[#6D926D] text-white flex items-center justify-center shadow-sm transition-colors"
          aria-label="루틴 추가"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {routines.length === 0 && (
          <div className="text-center text-[#8B7E74] pt-16">
            <p className="text-sm">아직 만든 루틴이 없어요.</p>
            <p className="text-sm">+ 버튼으로 루틴을 추가해보세요.</p>
          </div>
        )}

        {categories.map((cat, idx) => {
          const isFallback = idx === categories.length - 1;
          const knownIds = categories.map((c) => c.id);
          const items = routines.filter((r) => {
            const c = r.category;
            if (c === cat.id) return true;
            return isFallback && (!c || !knownIds.includes(c));
          });
          if (items.length === 0) return null;
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
                <span className="font-semibold" style={{ color: cat.color }}>
                  {cat.label}
                </span>
                <span className="text-xs text-[#B5A89C]">{items.length}</span>
              </div>

              {/* Routine rows */}
              <div className="space-y-2.5">
                {items.map((routine) => (
                  <button
                    key={routine.id}
                    onClick={() => onEdit?.(routine)}
                    className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow text-left border-l-4"
                    style={{ borderLeftColor: cat.color }}
                  >
                    {routine.emoji && (
                      <span className="text-lg flex-shrink-0">
                        {routine.emoji}
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="block text-[#4A403A]">
                        {routine.title}
                      </span>
                      {(routine.alarmEnabled && routine.time) ||
                      routine.photoVerify ? (
                        <div className="flex items-center gap-2 mt-0.5">
                          {routine.alarmEnabled && routine.time && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-[#8B7E74]">
                              <Bell size={11} className="text-[#E8A87C]" />
                              {formatTime(routine.time)}
                            </span>
                          )}
                          {routine.photoVerify && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-[#8B7E74]">
                              <Camera size={11} className="text-[#7FA8D4]" />
                              사진 인증
                            </span>
                          )}
                        </div>
                      ) : null}
                    </div>
                    <ChevronRight
                      size={18}
                      className="text-[#B5A89C] flex-shrink-0"
                    />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
