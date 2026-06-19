import { useState } from "react";
import {
  ChevronLeft,
  Crown,
  Hash,
  Users,
  Lock,
  Globe,
  Copy,
  Check,
} from "lucide-react";

interface CreateHouseScreenProps {
  onBack?: () => void;
  onCreate?: (houseName: string) => void;
}

const THEMES = [
  { id: "morning", label: "기상", emoji: "🌅", bg: "#FFEFD8", border: "#F0C88A" },
  { id: "study", label: "공부", emoji: "📚", bg: "#E4DCF0", border: "#B8A8D8" },
  { id: "code", label: "코딩", emoji: "💻", bg: "#E4F0DC", border: "#A8C898" },
  { id: "fitness", label: "운동", emoji: "💪", bg: "#FBE0E0", border: "#E8B0A0" },
  { id: "health", label: "건강", emoji: "💧", bg: "#D8E8F0", border: "#A8C4D8" },
  { id: "hobby", label: "취미", emoji: "🎨", bg: "#F5E1D8", border: "#E8B8A8" },
];

const generateCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "VLG-";
  for (let i = 0; i < 4; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
};

export function CreateHouseScreen({
  onBack,
  onCreate,
}: CreateHouseScreenProps = {}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [themeId, setThemeId] = useState("morning");
  const [capacity, setCapacity] = useState(4);
  const [isPrivate, setIsPrivate] = useState(false);
  const [inviteCode, setInviteCode] = useState(generateCode());
  const [copied, setCopied] = useState(false);

  const theme = THEMES.find((t) => t.id === themeId)!;
  const canSubmit = name.trim().length >= 2;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onCreate?.(name.trim());
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] pb-10">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#F5E6D3] hover:bg-[#EBD9C2] flex items-center justify-center transition-colors"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={22} className="text-[#4A403A]" />
        </button>
        <h2 className="text-base font-bold text-[#4A403A]">새 집 만들기</h2>
        <div className="w-10 h-10" />
      </div>

      {/* Preview */}
      <div className="px-6 pt-6">
        <div className="bg-white rounded-3xl shadow-sm p-5 flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: theme.bg, border: `2px solid ${theme.border}` }}
          >
            <span className="text-3xl">{theme.emoji}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <Crown size={14} className="text-[#D4A574]" />
              <h3 className="font-bold text-[#4A403A] truncate">
                {name.trim() || "집 이름"}
              </h3>
            </div>
            <p className="text-xs text-[#8B7E74] truncate">
              {description.trim() || "한 줄 설명이 여기에 표시돼요"}
            </p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-[#8B7E74]">
              <Users size={12} />
              <span>0 / {capacity}</span>
              <span>·</span>
              {isPrivate ? (
                <span className="flex items-center gap-1">
                  <Lock size={11} /> 비공개
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Globe size={11} /> 공개
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pt-5 space-y-4">
        {/* Basic info */}
        <div className="bg-white rounded-3xl shadow-sm p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#8B7E74] mb-1.5 ml-1">
              집 이름
            </label>
            <div className="flex items-center gap-3 bg-[#FBF8F3] rounded-2xl px-4 py-3 border border-transparent focus-within:border-[#7FA87F] transition-colors">
              <Crown size={18} className="text-[#B5A89C]" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 16))}
                placeholder="우리 집 이름을 정해주세요"
                className="flex-1 bg-transparent outline-none text-sm text-[#4A403A] placeholder:text-[#B5A89C]"
              />
              <span className="text-[10px] text-[#B5A89C]">{name.length}/16</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8B7E74] mb-1.5 ml-1">
              한 줄 설명
            </label>
            <div className="flex items-center gap-3 bg-[#FBF8F3] rounded-2xl px-4 py-3 border border-transparent focus-within:border-[#7FA87F] transition-colors">
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 40))}
                placeholder="어떤 루틴을 함께 할까요?"
                className="flex-1 bg-transparent outline-none text-sm text-[#4A403A] placeholder:text-[#B5A89C]"
              />
              <span className="text-[10px] text-[#B5A89C]">
                {description.length}/40
              </span>
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="bg-white rounded-3xl shadow-sm p-5">
          <label className="block text-xs font-semibold text-[#8B7E74] mb-3 ml-1">
            테마 선택
          </label>
          <div className="grid grid-cols-3 gap-2">
            {THEMES.map((t) => {
              const selected = t.id === themeId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setThemeId(t.id)}
                  className={`rounded-2xl py-3 flex flex-col items-center gap-1 transition-all ${
                    selected
                      ? "ring-2 ring-[#7FA87F] shadow-sm"
                      : "hover:bg-[#FBF6EC]"
                  }`}
                  style={{
                    backgroundColor: selected ? t.bg : "#FBF8F3",
                  }}
                >
                  <span className="text-2xl">{t.emoji}</span>
                  <span className="text-xs font-semibold text-[#4A403A]">
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Capacity */}
        <div className="bg-white rounded-3xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold text-[#8B7E74] ml-1">
              정원
            </label>
            <span className="text-sm font-bold text-[#7FA87F]">
              {capacity}명
            </span>
          </div>
          <div className="flex gap-2">
            {[2, 3, 4, 6, 8].map((n) => {
              const selected = n === capacity;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCapacity(n)}
                  className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    selected
                      ? "bg-[#7FA87F] text-white shadow-sm"
                      : "bg-[#FBF8F3] text-[#8B7E74] hover:bg-[#F0EAE0]"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
          <label className="block text-xs font-semibold text-[#8B7E74] ml-1">
            공개 설정
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIsPrivate(false)}
              className={`rounded-2xl py-3 px-3 flex flex-col items-start gap-1 transition-all ${
                !isPrivate
                  ? "bg-[#E4F0DC] ring-2 ring-[#7FA87F]"
                  : "bg-[#FBF8F3] hover:bg-[#F0EAE0]"
              }`}
            >
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-[#7FA87F]" />
                <span className="text-sm font-semibold text-[#4A403A]">
                  공개
                </span>
              </div>
              <span className="text-[11px] text-[#8B7E74] text-left">
                추천 목록에 노출돼요
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsPrivate(true)}
              className={`rounded-2xl py-3 px-3 flex flex-col items-start gap-1 transition-all ${
                isPrivate
                  ? "bg-[#F5E6D3] ring-2 ring-[#D4A574]"
                  : "bg-[#FBF8F3] hover:bg-[#F0EAE0]"
              }`}
            >
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-[#D4A574]" />
                <span className="text-sm font-semibold text-[#4A403A]">
                  비공개
                </span>
              </div>
              <span className="text-[11px] text-[#8B7E74] text-left">
                초대코드로만 입장 가능
              </span>
            </button>
          </div>
        </div>

        {/* Invite code */}
        <div className="bg-white rounded-3xl shadow-sm p-5">
          <label className="block text-xs font-semibold text-[#8B7E74] mb-2 ml-1">
            초대코드
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 bg-[#FBF8F3] rounded-2xl px-4 py-3">
              <Hash size={18} className="text-[#B5A89C]" />
              <span className="flex-1 text-sm font-bold text-[#4A403A] tracking-widest">
                {inviteCode}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-3 rounded-2xl bg-[#F5E6D3] hover:bg-[#EBD9C2] text-[#4A403A] transition-colors"
              aria-label="초대코드 복사"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setInviteCode(generateCode())}
              className="px-3 py-2 rounded-2xl bg-white border border-[#E5DACB] text-xs text-[#8B7E74] hover:bg-[#FBF8F3] transition-colors whitespace-nowrap"
            >
              재발급
            </button>
          </div>
          <p className="text-[11px] text-[#8B7E74] mt-2 ml-1">
            친구에게 코드를 공유하면 바로 입주할 수 있어요.
          </p>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full py-3.5 rounded-full font-semibold shadow-sm transition-all ${
            canSubmit
              ? "bg-[#7FA87F] hover:bg-[#6D926D] text-white"
              : "bg-[#D9D2C5] text-white cursor-not-allowed"
          }`}
        >
          집 만들기
        </button>
      </form>
    </div>
  );
}
