import { useState } from "react";
import { BookOpen, BriefcaseBusiness, Dumbbell, Moon, Sparkles, Home, Check } from "lucide-react";
import { CatAvatar } from "./CatAvatar";
import { CHARACTER_OPTIONS, CharacterId, DEFAULT_CHARACTER_ID } from "./character";

interface OnboardingScreenProps {
  onDone?: (goals?: string[], characterId?: CharacterId) => void;
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
    emoji: "\uD83C\uDF31",
    bg: "from-[#F5E6D3] to-[#E8DCC8]",
    ring: "#D4C4B0",
    title: "\uB8E8\uD2F4 \uBE4C\uB9AC\uC9C0\uC5D0 \uC624\uC2E0 \uAC78 \uD658\uC601\uD574\uC694",
    description:
      "\uB9E4\uC77C\uC758 \uC791\uC740 \uB8E8\uD2F4\uC774 \uBAA8\uC5EC \uB098\uB9CC\uC758 \uB9C8\uC744\uC744 \uB9CC\uB4E4\uC5B4\uAC00\uC694.\n\uACE0\uC591\uC774 \uCE5C\uAD6C\uC640 \uD568\uAED8 \uC2DC\uC791\uD574\uBCFC\uAE4C\uC694?",
    showCat: true,
  },
  {
    emoji: "\u2705",
    bg: "from-[#E4F0DC] to-[#D2E5C8]",
    ring: "#A8C89A",
    title: "\uC624\uB298\uC758 \uB8E8\uD2F4\uC744 \uC644\uB8CC\uD574\uC694",
    description:
      "\uAE30\uC0C1, \uB3C5\uC11C, \uC6B4\uB3D9 \uAC19\uC740 \uB8E8\uD2F4\uC744 \uB9CC\uB4E4\uACE0\n\uB9E4\uC77C \uCCB4\uD06C\uD558\uBA70 \uBCF4\uC0C1\uC744 \uBC1B\uC544\uBCF4\uC138\uC694.",
  },
  {
    emoji: "\uD83C\uDFE0",
    bg: "from-[#F5D8C8] to-[#E8C4B0]",
    ring: "#D4A88E",
    title: "\uBC29\uC744 \uAFB8\uBBF8\uACE0 \uCE90\uB9AD\uD130\uB97C \uD0A4\uC6CC\uC694",
    description:
      "\uB8E8\uD2F4\uC744 \uC644\uB8CC\uD560\uC218\uB85D \uACE0\uC591\uC774\uAC00 \uC131\uC7A5\uD558\uACE0\n\uBCF4\uC0C1\uC73C\uB85C \uBC29\uC744 \uB354 \uB530\uB73B\uD558\uAC8C \uCC44\uC6CC\uAC00\uC694.",
  },
  {
    emoji: "\uD83D\uDC6B",
    bg: "from-[#D8E4F0] to-[#C4D5E8]",
    ring: "#A8BFD4",
    title: "\uCE5C\uAD6C\uB4E4\uACFC \uD568\uAED8 \uC9D1\uC744 \uB9CC\uB4E4\uC5B4\uC694",
    description:
      "\uCE5C\uAD6C\uC758 \uBC29\uC744 \uAD6C\uACBD\uD558\uACE0 \uADF8\uB8F9 \uBBF8\uC158\uC744 \uD568\uAED8\n\uC131\uACF5\uD558\uBA70 \uB9C8\uC744\uC744 \uB354 \uC0DD\uAE30\uC788\uAC8C \uB9CC\uB4E4\uC5B4\uBCF4\uC138\uC694.",
  },
];

const GOALS = [
  { id: "exercise", label: "\uC6B4\uB3D9", Icon: Dumbbell, color: "#7FA87F", bg: "#E4F0DC" },
  { id: "study", label: "\uACF5\uBD80", Icon: BookOpen, color: "#7FA8D4", bg: "#E3EEF8" },
  { id: "sleep", label: "\uC218\uBA74", Icon: Moon, color: "#8D86C9", bg: "#ECE8FA" },
  { id: "reading", label: "\uB3C5\uC11C", Icon: BookOpen, color: "#C8869C", bg: "#F7E4EA" },
  { id: "organizing", label: "\uC815\uB9AC", Icon: Home, color: "#D4A574", bg: "#F7ECD8" },
  { id: "career", label: "\uCDE8\uC5C5 \uC900\uBE44", Icon: BriefcaseBusiness, color: "#6FB7B0", bg: "#DDF3F0" },
  { id: "habit", label: "\uC0DD\uD65C \uC2B5\uAD00", Icon: Sparkles, color: "#E89A4A", bg: "#FFF0D8" },
];

export function OnboardingScreen({ onDone }: OnboardingScreenProps = {}) {
  const [index, setIndex] = useState(0);
  const [showGoalSurvey, setShowGoalSurvey] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId>(DEFAULT_CHARACTER_ID);
  const isLast = index === SLIDES.length - 1;
  const slide = SLIDES[index];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId],
    );
  };

  const handleNext = () => {
    if (isLast) setShowGoalSurvey(true);
    else setIndex((i) => i + 1);
  };

  if (showCharacterSelect) {
    return (
      <div className="min-h-screen bg-[#FBF8F3] flex flex-col">
        <div className="px-6 pt-8 pb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF0D8] flex items-center justify-center mb-5">
            <Sparkles size={26} className="text-[#E89A4A]" />
          </div>
          <h1 className="text-2xl font-bold text-[#4A403A] leading-snug mb-2">
            {"\uD568\uAED8\uD560 \uCE90\uB9AD\uD130\uB97C \uACE8\uB77C\uC8FC\uC138\uC694"}
          </h1>
          <p className="text-sm text-[#8B7E74] leading-relaxed">
            {"\uC120\uD0DD\uD55C \uCE5C\uAD6C\uAC00 \uB098\uC758 \uBC29\uC5D0 \uB098\uD0C0\uB098\uACE0, \uD074\uB9AD\uD560 \uB54C\uB9C8\uB2E4 \uC0AC\uC9C4\uC774 \uBC14\uB00C\uC5B4\uC694."}
          </p>
        </div>

        <div className="flex-1 px-6 py-2 space-y-3">
          {CHARACTER_OPTIONS.map((character) => {
            const selected = selectedCharacter === character.id;
            return (
              <button
                key={character.id}
                type="button"
                onClick={() => setSelectedCharacter(character.id)}
                className={`w-full min-h-[112px] rounded-2xl bg-white p-4 text-left shadow-sm transition-all flex items-center gap-4 ${
                  selected ? "ring-2 ring-[#7FA87F] shadow-md" : "hover:shadow-md"
                }`}
              >
                <span
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: character.bg }}
                >
                  <img
                    src={character.images[0]}
                    alt={character.name}
                    className="h-16 w-16 object-contain"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-[#4A403A]">
                    {character.name}
                  </span>
                  <span className="mt-1 block text-xs text-[#8B7E74] leading-relaxed">
                    {character.description}
                  </span>
                </span>
                {selected && (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7FA87F] text-white">
                    <Check size={16} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="px-6 pb-10 space-y-3">
          <button
            onClick={() => onDone?.(selectedGoals, selectedCharacter)}
            className="w-full py-3.5 rounded-full font-semibold bg-[#7FA87F] hover:bg-[#6D926D] text-white shadow-sm transition-colors"
          >
            {"\uCE90\uB9AD\uD130 \uC120\uD0DD\uD558\uAE30"}
          </button>
          <button
            onClick={() => setShowCharacterSelect(false)}
            className="w-full py-2 text-sm text-[#8B7E74] hover:text-[#4A403A] transition-colors"
          >
            {"\uC774\uC804"}
          </button>
        </div>
      </div>
    );
  }

  if (showGoalSurvey) {
    const canStart = selectedGoals.length > 0;
    return (
      <div className="min-h-screen bg-[#FBF8F3] flex flex-col">
        <div className="px-6 pt-8 pb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E4F0DC] flex items-center justify-center mb-5">
            <Sparkles size={26} className="text-[#7FA87F]" />
          </div>
          <h1 className="text-2xl font-bold text-[#4A403A] leading-snug mb-2">
            {"\uAD00\uC2EC \uC788\uB294 \uBAA9\uD45C\uB97C \uACE8\uB77C\uC8FC\uC138\uC694"}
          </h1>
          <p className="text-sm text-[#8B7E74] leading-relaxed">
            {"\uC120\uD0DD\uD55C \uBAA9\uD45C\uB97C \uAE30\uBC18\uC73C\uB85C \uB8E8\uD2F4 \uC81C\uC548\uACFC \uBBF8\uC158\uC744 \uB354 \uC798 \uB9DE\uCD9C \uC218 \uC788\uC5B4\uC694."}
          </p>
        </div>

        <div className="flex-1 px-6 py-2">
          <div className="grid grid-cols-2 gap-3">
            {GOALS.map(({ id, label, Icon, color, bg }) => {
              const selected = selectedGoals.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleGoal(id)}
                  className={`relative min-h-[112px] rounded-2xl bg-white p-4 text-left shadow-sm transition-all ${
                    selected ? "ring-2 ring-[#7FA87F] shadow-md" : "hover:shadow-md"
                  }`}
                >
                  <span
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon size={20} style={{ color }} />
                  </span>
                  <span className="block font-semibold text-[#4A403A]">
                    {label}
                  </span>
                  {selected && (
                    <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#7FA87F] text-white">
                      <Check size={15} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-6 pb-10 space-y-3">
          <button
            onClick={() => canStart && setShowCharacterSelect(true)}
            disabled={!canStart}
            className="w-full py-3.5 rounded-full font-semibold bg-[#7FA87F] hover:bg-[#6D926D] disabled:bg-[#D4C4B0] text-white shadow-sm transition-colors"
          >
            {"\uC2DC\uC791\uD558\uAE30"}
          </button>
          <button
            onClick={() => setShowGoalSurvey(false)}
            className="w-full py-2 text-sm text-[#8B7E74] hover:text-[#4A403A] transition-colors"
          >
            {"\uC774\uC804"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F3] flex flex-col">
      <div className="flex justify-end px-6 pt-5 h-12">
        {!isLast && (
          <button
            onClick={() => setShowGoalSurvey(true)}
            className="text-sm text-[#8B7E74] hover:text-[#4A403A] transition-colors"
          >
            {"\uAC74\uB108\uB6F0\uAE30"}
          </button>
        )}
      </div>

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
          <span className="absolute -top-2 -right-2 text-2xl animate-pulse">
            {"\u2728"}
          </span>
          <span className="absolute -bottom-1 -left-3 text-xl opacity-70">
            {"\uD83C\uDF3F"}
          </span>
        </div>

        <h1 className="text-xl font-bold text-[#4A403A] mb-3 leading-snug">
          {slide.title}
        </h1>
        <p className="text-sm text-[#8B7E74] whitespace-pre-line leading-relaxed">
          {slide.description}
        </p>
      </div>

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
            aria-label={`${i + 1}\uBC88\uC9F8 \uC2AC\uB77C\uC774\uB4DC\uB85C \uC774\uB3D9`}
          />
        ))}
      </div>

      <div className="px-6 pb-10 space-y-3">
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-full font-semibold bg-[#7FA87F] hover:bg-[#6D926D] text-white shadow-sm transition-colors"
        >
          {isLast ? "\uBAA9\uD45C \uC120\uD0DD\uD558\uAE30" : "\uB2E4\uC74C"}
        </button>
        {index > 0 && !isLast && (
          <button
            onClick={() => setIndex((i) => i - 1)}
            className="w-full py-2 text-sm text-[#8B7E74] hover:text-[#4A403A] transition-colors"
          >
            {"\uC774\uC804"}
          </button>
        )}
      </div>
    </div>
  );
}
