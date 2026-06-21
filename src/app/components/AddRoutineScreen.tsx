import { useState } from "react";
import { ArrowLeft, Check, Plus, Sun, BookOpen, Droplet, Dumbbell, Heart, Sparkles, Moon, Coffee, Camera, Bell, ChevronRight, CalendarDays, Trash2 } from "lucide-react";
import {
  ROUTINE_CATEGORIES,
  type RoutineCategory,
  type RoutineCategoryMeta,
  type Routine,
} from "./MyRoomZoomScreen";
import { CategoryManagerModal } from "./CategoryManagerModal";
import { TimePickerSheet } from "./TimePickerSheet";
import { DateRangeSheet } from "./DateRangeSheet";

export interface NewRoutine {
  title: string;
  emoji: string;
  category: RoutineCategory;
  days: number[]; // 0(Sun) ~ 6(Sat)
  startDate: string; // "YYYY-MM-DD"
  endDate?: string; // "YYYY-MM-DD", 없으면 무기한
  alarmEnabled: boolean;
  time: string;
  photoVerify: boolean;
}

const TODAY = new Date().toISOString().slice(0, 10);

/** "2026-06-19" -> "2026.06.19" */
function formatDate(d: string) {
  return d.replaceAll("-", ".");
}

/** "HH:MM" 24h -> "오전 7:00" */
function formatTime(time: string) {
  const [h, m] = time.split(":").map((v) => parseInt(v, 10));
  const ampm = h >= 12 ? "오후" : "오전";
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  return `${ampm} ${hour12}:${String(m).padStart(2, "0")}`;
}

interface AddRoutineScreenProps {
  onBack?: () => void;
  onAdd?: (routine: NewRoutine) => void;
  categories?: RoutineCategoryMeta[];
  onCreateCategory?: (cat: RoutineCategoryMeta) => void;
  onDeleteCategory?: (id: string) => void;
  /** When provided, the screen works in edit mode */
  editRoutine?: Routine | null;
  onUpdate?: (id: string, routine: NewRoutine) => void;
  onDelete?: (id: string) => void;
}

const PRESETS: {
  emoji: string;
  title: string;
  Icon: typeof Sun;
  category: RoutineCategory;
}[] = [
  { emoji: "☀️", title: "아침 기상", Icon: Sun, category: "일정" },
  { emoji: "📖", title: "독서 30분", Icon: BookOpen, category: "취미" },
  { emoji: "💧", title: "물 2L 마시기", Icon: Droplet, category: "건강" },
  { emoji: "🏃", title: "운동 인증", Icon: Dumbbell, category: "건강" },
  { emoji: "💖", title: "감사 일기", Icon: Heart, category: "취미" },
  { emoji: "✨", title: "영어 공부", Icon: Sparkles, category: "공부" },
  { emoji: "🌙", title: "하루 회고", Icon: Moon, category: "일정" },
  { emoji: "☕", title: "모닝 커피", Icon: Coffee, category: "일정" },
];

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const EMOJI_CHOICES = [
  "☀️", "📖", "💧", "🏃", "💖", "✨", "🌙", "☕",
  "🧘", "🎵", "🍳", "💼", "🌱", "🐱", "📝", "🎨",
  "💪", "🥗", "🛏️", "🧹", "🐶", "🚿", "🎯", "🌸",
];

export function AddRoutineScreen({
  onBack,
  onAdd,
  categories = ROUTINE_CATEGORIES,
  onCreateCategory,
  onDeleteCategory,
  editRoutine,
  onUpdate,
  onDelete,
}: AddRoutineScreenProps = {}) {
  const isEdit = Boolean(editRoutine);
  const [title, setTitle] = useState(editRoutine?.title ?? "");
  const [emoji, setEmoji] = useState(editRoutine?.emoji ?? "☀️");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [category, setCategory] = useState<RoutineCategory>(
    editRoutine?.category ?? categories[0]?.id ?? "일정",
  );
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [days, setDays] = useState<number[]>(
    editRoutine?.days ?? [1, 2, 3, 4, 5],
  );
  const [startDate, setStartDate] = useState(editRoutine?.startDate ?? TODAY);
  const [hasEndDate, setHasEndDate] = useState(
    Boolean(editRoutine?.endDate),
  );
  const [endDate, setEndDate] = useState(editRoutine?.endDate ?? "");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [alarmEnabled, setAlarmEnabled] = useState(
    editRoutine?.alarmEnabled ?? true,
  );
  const [time, setTime] = useState(editRoutine?.time ?? "07:00");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [photoVerify, setPhotoVerify] = useState(
    editRoutine?.photoVerify ?? false,
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleDay = (d: number) =>
    setDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d].sort()
    );

  const endDateValid = !hasEndDate || (!!endDate && endDate >= startDate);
  const canSubmit =
    title.trim().length > 0 && days.length > 0 && endDateValid;

  const submit = () => {
    if (!canSubmit) return;
    const payload: NewRoutine = {
      title: title.trim(),
      emoji,
      category,
      days,
      startDate,
      endDate: hasEndDate && endDate ? endDate : undefined,
      alarmEnabled,
      time,
      photoVerify,
    };
    if (isEdit && editRoutine) {
      onUpdate?.(editRoutine.id, payload);
    } else {
      onAdd?.(payload);
    }
    onBack?.();
  };

  const remove = () => {
    if (editRoutine) onDelete?.(editRoutine.id);
    setShowDeleteConfirm(false);
    onBack?.();
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] pb-32">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#F5F1E8] hover:bg-[#E8DCC8] flex items-center justify-center text-[#4A403A] transition-colors"
          aria-label="뒤로가기"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-[#4A403A]">
          {isEdit ? "루틴 수정" : "루틴 추가"}
        </h2>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {/* Title input */}
        <div>
          <label className="text-sm font-semibold text-[#4A403A] mb-2 block">
            루틴 이름
          </label>
          <div className="relative">
            <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-3 shadow-sm">
              <button
                type="button"
                onClick={() => setShowEmojiPicker((v) => !v)}
                className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-2xl transition-colors ${
                  showEmojiPicker
                    ? "bg-[#7FA87F]/15 ring-2 ring-[#7FA87F]"
                    : "bg-[#F5F1E8] hover:bg-[#EDE3D3]"
                }`}
                aria-label="이모지 선택"
              >
                {emoji}
              </button>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예) 매일 30분 산책"
                className="flex-1 bg-transparent outline-none text-[#4A403A] placeholder:text-[#B8A593]"
              />
            </div>

            {showEmojiPicker && (
              <div className="absolute left-0 right-0 top-full mt-2 z-20 bg-white rounded-2xl shadow-lg p-3">
                <div className="grid grid-cols-8 gap-1.5 mb-3">
                  {EMOJI_CHOICES.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => {
                        setEmoji(e);
                        setShowEmojiPicker(false);
                      }}
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
                <div className="flex items-center gap-2 bg-[#F5F1E8] rounded-xl px-3 py-2">
                  <span className="text-xs text-[#8B7E74] shrink-0">
                    직접 입력
                  </span>
                  <input
                    value={emoji}
                    onChange={(e) => {
                      const chars = Array.from(e.target.value);
                      setEmoji(chars[chars.length - 1] ?? "");
                    }}
                    placeholder="🙂"
                    className="flex-1 bg-transparent outline-none text-lg text-center"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-[#4A403A]">
              카테고리
            </label>
            <button
              onClick={() => setShowCategoryManager(true)}
              className="w-7 h-7 rounded-full bg-[#7FA87F] hover:bg-[#6D926D] text-white flex items-center justify-center shadow-sm transition-colors"
              aria-label="카테고리 만들기"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full whitespace-nowrap transition-colors shadow-sm"
                  style={
                    active
                      ? { backgroundColor: c.color, color: "#fff" }
                      : { backgroundColor: "#fff", color: "#8B7E74" }
                  }
                >
                  <span>{c.emoji}</span>
                  <span className="text-sm font-medium">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preset chips */}
        {!isEdit && (
        <div>
          <label className="text-sm font-semibold text-[#4A403A] mb-2 block">
            추천 루틴
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.title}
                onClick={() => {
                  setTitle(p.title);
                  setEmoji(p.emoji);
                  setCategory(p.category);
                }}
                className={`flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 shadow-sm hover:shadow-md transition-all text-left ${
                  title === p.title ? "ring-2 ring-[#7FA87F]" : ""
                }`}
              >
                <span className="text-xl">{p.emoji}</span>
                <span className="text-sm text-[#4A403A] flex-1 truncate">
                  {p.title}
                </span>
              </button>
            ))}
          </div>
        </div>
        )}

        {/* Days */}
        <div>
          <label className="text-sm font-semibold text-[#4A403A] mb-2 block">
            반복 요일
          </label>
          <div className="flex gap-1.5">
            {DAYS.map((d, i) => {
              const active = days.includes(i);
              return (
                <button
                  key={d}
                  onClick={() => toggleDay(i)}
                  className={`flex-1 h-10 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#7FA87F] text-white"
                      : "bg-white text-[#8B7E74] hover:bg-[#F5F1E8]"
                  } ${
                    (i === 0 && active) ? "bg-[#E89090] text-white" : ""
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm font-semibold text-[#4A403A] mb-2 block">
            지속 기간
          </label>
          <button
            type="button"
            onClick={() => setShowDatePicker(true)}
            className="w-full bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow text-left"
          >
            <div className="w-9 h-9 rounded-full bg-[#F5E6D3] flex items-center justify-center">
              <CalendarDays size={18} className="text-[#7FA87F]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#4A403A]">
                {formatDate(startDate)} ~{" "}
                {hasEndDate && endDate ? formatDate(endDate) : "계속"}
              </p>
              <p className="text-xs text-[#8B7E74]">탭하여 기간 변경</p>
            </div>
            <ChevronRight size={18} className="text-[#B5A89C]" />
          </button>
        </div>

        {/* Time */}
        <div>
          <label className="text-sm font-semibold text-[#4A403A] mb-2 block">
            알림 시간
          </label>
          <button
            type="button"
            onClick={() => setShowTimePicker(true)}
            className="w-full bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow text-left"
          >
            <div className="w-9 h-9 rounded-full bg-[#F5E6D3] flex items-center justify-center">
              <Bell size={18} className="text-[#7FA87F]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#4A403A]">
                {alarmEnabled ? formatTime(time) : "알림 없음"}
              </p>
              <p className="text-xs text-[#8B7E74]">
                {alarmEnabled ? "탭하여 시간 변경" : "탭하여 알림 설정"}
              </p>
            </div>
            <ChevronRight size={18} className="text-[#B5A89C]" />
          </button>
        </div>

        {/* Photo verification toggle */}
        <div>
          <label className="text-sm font-semibold text-[#4A403A] mb-2 block">
            인증 방식
          </label>
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F5E6D3] flex items-center justify-center">
              <Camera size={18} className="text-[#7FA87F]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#4A403A]">인증사진형</p>
              <p className="text-xs text-[#8B7E74]">
                완료할 때 사진을 찍어 인증해요
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={photoVerify}
              onClick={() => setPhotoVerify((v) => !v)}
              className={`relative inline-flex shrink-0 items-center w-[44px] h-[26px] rounded-full transition-colors ${
                photoVerify ? "bg-[#7FA87F]" : "bg-[#D4C4B0]"
              }`}
            >
              <span
                className="absolute left-[2px] w-[22px] h-[22px] bg-white rounded-full shadow-sm transition-transform"
                style={{
                  transform: photoVerify ? "translateX(18px)" : "translateX(0)",
                }}
              />
            </button>
          </div>
        </div>

        {/* Delete (edit mode only) */}
        {isEdit && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full bg-white border border-[#F0D5D5] text-[#D08585] py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#FBEAEA] transition-colors"
          >
            <Trash2 size={18} />
            {"\uB8E8\uD2F4 \uC0AD\uC81C\uD558\uAE30"}
          </button>
        )}
      </div>

      {/* Submit */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md px-6 pb-3 z-20">
        <button
          onClick={submit}
          disabled={!canSubmit}
          className="w-full bg-[#7FA87F] hover:bg-[#6D926D] disabled:bg-[#D4C4B0] text-white py-3.5 rounded-full font-semibold shadow-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Check size={18} />
          {isEdit ? "수정 완료" : "루틴 추가하기"}
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-6">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-routine-title"
            aria-describedby="delete-routine-description"
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBEAEA] text-[#D08585]">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 id="delete-routine-title" className="font-bold text-[#4A403A]">
                  {"\uB8E8\uD2F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?"}
                </h3>
                <p id="delete-routine-description" className="mt-1 text-sm text-[#8B7E74]">
                  {"\uC815\uB9D0 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-full bg-[#F5F1E8] px-4 py-3 font-semibold text-[#4A403A] transition-colors hover:bg-[#E8DCC8]"
              >
                {"\uCDE8\uC18C"}
              </button>
              <button
                type="button"
                onClick={remove}
                className="flex-1 rounded-full bg-[#D08585] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#BE6F6F]"
              >
                {"\uC0AD\uC81C\uD558\uAE30"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category manager */}
      {showCategoryManager && (
        <CategoryManagerModal
          categories={categories}
          onCreate={(cat) => {
            onCreateCategory?.(cat);
            setCategory(cat.id);
          }}
          onDelete={(id) => {
            onDeleteCategory?.(id);
            if (category === id) {
              setCategory(categories[0]?.id ?? "기타");
            }
          }}
          onClose={() => setShowCategoryManager(false)}
        />
      )}

      {/* Alarm time picker */}
      {showTimePicker && (
        <TimePickerSheet
          initialEnabled={alarmEnabled}
          initialTime={time}
          onSave={(enabled, t) => {
            setAlarmEnabled(enabled);
            setTime(t);
          }}
          onClose={() => setShowTimePicker(false)}
        />
      )}

      {/* Duration picker */}
      {showDatePicker && (
        <DateRangeSheet
          initialStartDate={startDate}
          initialEndDate={hasEndDate && endDate ? endDate : undefined}
          onSave={(s, e) => {
            setStartDate(s);
            setHasEndDate(Boolean(e));
            setEndDate(e ?? "");
          }}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
}
