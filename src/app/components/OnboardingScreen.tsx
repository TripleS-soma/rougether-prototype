import { useState } from "react";
import { CatAvatar } from "./CatAvatar";

interface OnboardingScreenProps {
  onDone?: () => void;
}

interface Slide {
  emoji: string;
  bg: string;
  ring: string;
  title: string;
  description: string;
  showCat?: boolean;
}

const SLIDES: Slide[] = [
  {
    emoji: "🐾",
    bg: "from-[#F5E6D3] to-[#E8DCC8]",
    ring: "#D4C4B0",
    title: "루틴 빌리지에 오신 걸 환영해요",
    description:
      "매일의 작은 루틴이 모여 나만의 마을이 되어가요.\n고양이 친구와 함께 시작해볼까요?",
    showCat: true,
  },
  {
    emoji: "✅",
    bg: "from-[#E4F0DC] to-[#D2E5C8]",
    ring: "#A8C89A",
    title: "오늘의 루틴을 완료해요",
    description:
      "기상, 독서, 운동 등 나만의 루틴을 만들고\n매일 체크하며 잎사귀 보상을 받아보세요.",
  },
  {
    emoji: "🏡",
    bg: "from-[#F5D8C8] to-[#E8C4B0]",
    ring: "#D4A88E",
    title: "고양이가 자라고 방이 꾸며져요",
    description:
      "꾸준한 루틴으로 고양이가 성장하고\n받은 보상으로 가구와 벽지를 채워보세요.",
  },
  {
    emoji: "💬",
    bg: "from-[#D8E4F0] to-[#C4D5E8]",
    ring: "#A8BFD4",
    title: "친구들과 함께 그룹의 집을",
    description:
      "친구들의 방을 구경하고 그룹 미션을 함께\n달성하며 마을을 더 풍성하게 만들어보세요.",
  },
];

export function OnboardingScreen({ onDone }: OnboardingScreenProps = {}) {
  const [index, setIndex] = useState(0);
  const isLast = index === SLIDES.length - 1;
  const slide = SLIDES[index];

  const handleNext = () => {
    if (isLast) onDone?.();
    else setIndex((i) => i + 1);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] flex flex-col">
      {/* Skip */}
      <div className="flex justify-end px-6 pt-5 h-12">
        {!isLast && (
          <button
            onClick={onDone}
            className="text-sm text-[#8B7E74] hover:text-[#4A403A] transition-colors"
          >
            건너뛰기
          </button>
        )}
      </div>

      {/* Illustration */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div
          className={`w-56 h-56 rounded-full bg-gradient-to-br ${slide.bg} flex items-center justify-center shadow-md mb-10 relative`}
          style={{ border: `3px solid ${slide.ring}` }}
        >
          {slide.showCat ? (
            <CatAvatar size={140} variant="happy" />
          ) : (
            <span className="text-7xl">{slide.emoji}</span>
          )}
          {/* Floating accents */}
          <span className="absolute -top-2 -right-2 text-2xl animate-pulse">
            ✨
          </span>
          <span className="absolute -bottom-1 -left-3 text-xl opacity-70">
            🌿
          </span>
        </div>

        <h1 className="text-xl font-bold text-[#4A403A] mb-3 leading-snug">
          {slide.title}
        </h1>
        <p className="text-sm text-[#8B7E74] whitespace-pre-line leading-relaxed">
          {slide.description}
        </p>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pb-8">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`rounded-full transition-all ${
              i === index
                ? "w-6 h-2 bg-[#7FA87F]"
                : "w-2 h-2 bg-[#E5DACB] hover:bg-[#D4C4B0]"
            }`}
            aria-label={`${i + 1}번째 슬라이드로 이동`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 pb-10 space-y-3">
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-full font-semibold bg-[#7FA87F] hover:bg-[#6D926D] text-white shadow-sm transition-colors"
        >
          {isLast ? "시작하기" : "다음"}
        </button>
        {index > 0 && !isLast && (
          <button
            onClick={() => setIndex((i) => i - 1)}
            className="w-full py-2 text-sm text-[#8B7E74] hover:text-[#4A403A] transition-colors"
          >
            이전
          </button>
        )}
      </div>
    </div>
  );
}
