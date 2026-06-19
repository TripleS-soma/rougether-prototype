import { useState } from "react";
import { X, Plus, Trash2, Globe, Users, Lock, Check } from "lucide-react";
import {
  CATEGORY_COLORS,
  VISIBILITY_LABELS,
  type CategoryVisibility,
  type RoutineCategoryMeta,
} from "./MyRoomZoomScreen";

const EMOJI_CHOICES = [
  "🗓️", "📚", "🎨", "💪", "✨", "☀️", "🌙", "💧",
  "🏃", "💖", "☕", "🎵", "🍳", "🧘", "💼", "🌱",
];

const VISIBILITY_OPTIONS: {
  id: CategoryVisibility;
  Icon: typeof Globe;
  desc: string;
}[] = [
  { id: "public", Icon: Globe, desc: "누구나 볼 수 있어요" },
  { id: "neighbor", Icon: Users, desc: "이웃에게만 보여요" },
  { id: "partial", Icon: Lock, desc: "선택한 사람에게만" },
];

interface CategoryManagerModalProps {
  categories: RoutineCategoryMeta[];
  onCreate?: (cat: RoutineCategoryMeta) => void;
  onDelete?: (id: string) => void;
  onClose?: () => void;
}

export function CategoryManagerModal({
  categories,
  onCreate,
  onDelete,
  onClose,
}: CategoryManagerModalProps) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(EMOJI_CHOICES[0]);
  const [visibility, setVisibility] =
    useState<CategoryVisibility>("public");

  const canSubmit = name.trim().length > 0;

  const submit = () => {
    if (!canSubmit) return;
    const color = CATEGORY_COLORS[categories.length % CATEGORY_COLORS.length];
    onCreate?.({
      id: `cat-${Date.now()}`,
      label: name.trim(),
      emoji,
      color,
      visibility,
    });
    setName("");
    setEmoji(EMOJI_CHOICES[0]);
    setVisibility("public");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-md bg-[#FBF8F3] rounded-t-3xl shadow-2xl max-h-[88vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#FBF8F3] px-6 pt-5 pb-3 flex items-center justify-between border-b border-[#EDE3D3]">
          <h3 className="text-lg font-bold text-[#4A403A]">
            카테고리 관리
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F5E6D3] hover:bg-[#EBD9C2] flex items-center justify-center transition-colors"
            aria-label="닫기"
          >
            <X size={18} className="text-[#4A403A]" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* New category form */}
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
            <p className="text-sm font-semibold text-[#4A403A]">
              새 카테고리 만들기
            </p>

            {/* Name */}
            <div>
              <label className="text-xs text-[#8B7E74] mb-1.5 block">
                이름
              </label>
              <div className="flex items-center gap-2 bg-[#F5F1E8] rounded-xl px-3 py-2.5">
                <span className="text-xl">{emoji}</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예) 자기계발"
                  className="flex-1 bg-transparent outline-none text-[#4A403A] placeholder:text-[#B8A593]"
                />
              </div>
            </div>

            {/* Emoji picker */}
            <div>
              <label className="text-xs text-[#8B7E74] mb-1.5 block">
                이모지
              </label>
              <div className="grid grid-cols-8 gap-1.5">
                {EMOJI_CHOICES.map((e) => (
                  <button
                    key={e}
                    onClick={() => setEmoji(e)}
                    className={`aspect-square rounded-lg flex items-center justify-center text-lg transition-all ${
                      emoji === e
                        ? "bg-[#7FA87F]/15 ring-2 ring-[#7FA87F]"
                        : "bg-[#F5F1E8] hover:bg-[#EDE3D3]"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility */}
            <div>
              <label className="text-xs text-[#8B7E74] mb-1.5 block">
                공개 설정
              </label>
              <div className="space-y-2">
                {VISIBILITY_OPTIONS.map((v) => {
                  const active = visibility === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setVisibility(v.id)}
                      className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors text-left ${
                        active
                          ? "bg-[#7FA87F]/12 ring-2 ring-[#7FA87F]"
                          : "bg-[#F5F1E8] hover:bg-[#EDE3D3]"
                      }`}
                    >
                      <v.Icon
                        size={18}
                        className={active ? "text-[#7FA87F]" : "text-[#8B7E74]"}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-[#4A403A]">
                          {VISIBILITY_LABELS[v.id]}
                        </p>
                        <p className="text-xs text-[#8B7E74]">{v.desc}</p>
                      </div>
                      {active && (
                        <Check size={16} className="text-[#7FA87F]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={submit}
              disabled={!canSubmit}
              className="w-full bg-[#7FA87F] hover:bg-[#6D926D] disabled:bg-[#D4C4B0] text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Plus size={18} />
              카테고리 추가
            </button>
          </div>

          {/* Existing categories */}
          <div>
            <p className="text-sm font-semibold text-[#4A403A] mb-3">
              내 카테고리 ({categories.length})
            </p>
            <div className="space-y-2">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3 border-l-4"
                  style={{ borderLeftColor: c.color }}
                >
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                    style={{ backgroundColor: `${c.color}33` }}
                  >
                    {c.emoji}
                  </span>
                  <div className="flex-1">
                    <p className="text-[#4A403A] font-medium">{c.label}</p>
                    <p className="text-xs text-[#8B7E74]">
                      {VISIBILITY_LABELS[c.visibility]}
                    </p>
                  </div>
                  <button
                    onClick={() => onDelete?.(c.id)}
                    className="w-9 h-9 rounded-full bg-[#FBEAEA] hover:bg-[#F5D5D5] flex items-center justify-center transition-colors"
                    aria-label={`${c.label} 삭제`}
                  >
                    <Trash2 size={16} className="text-[#D08585]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
