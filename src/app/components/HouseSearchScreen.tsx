import { useState } from "react";
import { ChevronLeft, Search, Users, Crown, Hash, Sparkles } from "lucide-react";

interface HouseSearchScreenProps {
  onBack?: () => void;
  onJoin?: (houseName: string) => void;
  onCreate?: () => void;
}

interface RecommendedHouse {
  id: string;
  name: string;
  members: number;
  capacity: number;
  tag: string;
  emoji: string;
  bg: string;
  border: string;
  description: string;
}

const RECOMMENDED: RecommendedHouse[] = [
  {
    id: "h1",
    name: "아침형 인간 모임",
    members: 3,
    capacity: 4,
    tag: "기상",
    emoji: "🌅",
    bg: "#FFEFD8",
    border: "#F0C88A",
    description: "오전 7시 전 기상 인증을 함께 해요",
  },
  {
    id: "h2",
    name: "개발자 루틴",
    members: 4,
    capacity: 4,
    tag: "코딩",
    emoji: "💻",
    bg: "#E4F0DC",
    border: "#A8C898",
    description: "매일 코테 한 문제씩, 함께 성장하기",
  },
  {
    id: "h3",
    name: "독서 1시간",
    members: 2,
    capacity: 4,
    tag: "독서",
    emoji: "📖",
    bg: "#E4DCF0",
    border: "#B8A8D8",
    description: "하루 1시간 독서하고 한줄평 남기기",
  },
  {
    id: "h4",
    name: "홈트 챌린지",
    members: 3,
    capacity: 4,
    tag: "운동",
    emoji: "💪",
    bg: "#FBE0E0",
    border: "#E8B0A0",
    description: "주 3회 홈트 인증 그룹",
  },
  {
    id: "h5",
    name: "물 2L 클럽",
    members: 4,
    capacity: 4,
    tag: "건강",
    emoji: "💧",
    bg: "#D8E8F0",
    border: "#A8C4D8",
    description: "하루 물 2L 마시기 인증",
  },
];

export function HouseSearchScreen({
  onBack,
  onJoin,
  onCreate,
}: HouseSearchScreenProps = {}) {
  const [code, setCode] = useState("");
  const [query, setQuery] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);

  const filtered = RECOMMENDED.filter(
    (h) =>
      query.length === 0 ||
      h.name.toLowerCase().includes(query.toLowerCase()) ||
      h.tag.toLowerCase().includes(query.toLowerCase()),
  );

  const handleJoinByCode = () => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length < 6) {
      setCodeError("초대코드는 6자리 이상이에요");
      return;
    }
    setCodeError(null);
    onJoin?.(`초대코드 ${trimmed}`);
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
        <h2 className="text-base font-bold text-[#4A403A]">집 탐색</h2>
        <div className="w-10 h-10" />
      </div>

      {/* Invite code */}
      <div className="px-6 pt-6">
        <h3 className="text-sm font-bold text-[#4A403A] mb-2 flex items-center gap-2">
          <Hash size={16} className="text-[#7FA87F]" />
          초대코드로 들어가기
        </h3>
        <p className="text-xs text-[#8B7E74] mb-3">
          친구에게 받은 초대코드를 입력하면 바로 그 집에 입주할 수 있어요.
        </p>
        <div className="bg-white rounded-3xl shadow-sm p-4">
          <div className="flex gap-2">
            <div
              className={`flex-1 flex items-center gap-3 bg-[#FBF8F3] rounded-2xl px-4 py-3 border transition-colors ${
                codeError
                  ? "border-[#E89A9A]"
                  : "border-transparent focus-within:border-[#7FA87F]"
              }`}
            >
              <Hash size={18} className="text-[#B5A89C]" />
              <input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase().slice(0, 8));
                  setCodeError(null);
                }}
                placeholder="예: VLG-7K2X"
                className="flex-1 bg-transparent outline-none text-sm text-[#4A403A] placeholder:text-[#B5A89C] tracking-widest"
              />
            </div>
            <button
              onClick={handleJoinByCode}
              disabled={code.trim().length === 0}
              className={`px-5 rounded-2xl font-semibold text-sm whitespace-nowrap transition-colors ${
                code.trim().length === 0
                  ? "bg-[#E5DACB] text-white cursor-not-allowed"
                  : "bg-[#7FA87F] hover:bg-[#6D926D] text-white"
              }`}
            >
              입주
            </button>
          </div>
          {codeError && (
            <p className="text-xs text-[#D67878] mt-2 ml-2">{codeError}</p>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="px-6 pt-6">
        <h3 className="text-sm font-bold text-[#4A403A] mb-2 flex items-center gap-2">
          <Sparkles size={16} className="text-[#E89A4A]" />
          추천 집 둘러보기
        </h3>
        <div className="flex items-center gap-3 bg-white rounded-2xl shadow-sm px-4 py-3 border border-transparent focus-within:border-[#7FA87F] transition-colors">
          <Search size={18} className="text-[#B5A89C]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="집 이름, 태그로 검색"
            className="flex-1 bg-transparent outline-none text-sm text-[#4A403A] placeholder:text-[#B5A89C]"
          />
        </div>
      </div>

      {/* Recommended list */}
      <div className="px-4 pt-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-sm text-[#8B7E74]">
            검색 결과가 없어요
          </div>
        ) : (
          filtered.map((h) => {
            const full = h.members >= h.capacity;
            return (
              <div
                key={h.id}
                className="bg-white rounded-3xl shadow-sm p-4 flex items-center gap-3"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: h.bg,
                    border: `2px solid ${h.border}`,
                  }}
                >
                  <span className="text-2xl">{h.emoji}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-bold text-[#4A403A] truncate">
                      {h.name}
                    </h4>
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: h.bg, color: "#4A403A" }}
                    >
                      #{h.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#8B7E74] truncate mb-1">
                    {h.description}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-[#8B7E74]">
                    <Users size={12} />
                    <span>
                      {h.members} / {h.capacity}
                    </span>
                    {full && (
                      <span className="ml-1 text-[10px] text-[#D67878] font-semibold">
                        만석
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => !full && onJoin?.(h.name)}
                  disabled={full}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors flex-shrink-0 ${
                    full
                      ? "bg-[#F0EAE0] text-[#B5A89C] cursor-not-allowed"
                      : "bg-[#7FA87F] hover:bg-[#6D926D] text-white"
                  }`}
                >
                  {full ? "대기" : "입주 신청"}
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Create your own */}
      <div className="px-6 pt-6">
        <button
          onClick={onCreate}
          className="w-full bg-white border-2 border-dashed border-[#D4C4B0] rounded-3xl py-4 flex items-center justify-center gap-2 text-[#8B7E74] hover:bg-[#FBF6EC] transition-colors"
        >
          <Crown size={18} className="text-[#D4A574]" />
          <span className="text-sm font-semibold">새 집 만들기</span>
        </button>
      </div>
    </div>
  );
}
