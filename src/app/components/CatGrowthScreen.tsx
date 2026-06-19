import { ArrowUp } from "lucide-react";
import { CatAvatar } from "./CatAvatar";

interface GrowthStage {
  name: string;
  level: string;
  age: string;
  color: string;
  scale: number;
}

export function CatGrowthScreen() {
  const stages: GrowthStage[] = [
    {
      name: "새끼냥",
      level: "Lv.1~2",
      age: "0~2개월",
      color: "#F5E6D3",
      scale: 0.6,
    },
    {
      name: "아기냥",
      level: "Lv.3~5",
      age: "2~6개월",
      color: "#E8DCC8",
      scale: 0.75,
    },
    {
      name: "청소년 냥이",
      level: "Lv.10",
      age: "6~12개월",
      color: "#D4E8D4",
      scale: 0.9,
    },
    {
      name: "성숙한 냥이",
      level: "Lv.16",
      age: "12~24개월",
      color: "#D4E8E8",
      scale: 1.0,
    },
    {
      name: "어른냥",
      level: "Lv.20",
      age: "24개월 이상",
      color: "#E8D4E8",
      scale: 1.1,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F3] pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <h2 className="text-xl font-bold text-[#4A403A] mb-1">냥이 성장 기록</h2>
        <p className="text-sm text-[#8B7E74]">
          우리 냥이들의 성장 과정을 확인해보세요!
        </p>
      </div>

      {/* Growth timeline */}
      <div className="px-6 pt-8">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-[#7FA87F] to-[#D4C4B0] -translate-x-1/2"></div>

          {/* Stages */}
          <div className="space-y-12">
            {stages.map((stage, index) => (
              <div key={stage.name} className="relative">
                {/* Stage card */}
                <div
                  className={`bg-white rounded-2xl p-6 shadow-lg relative ${
                    index % 2 === 0 ? "mr-auto ml-0 w-[85%]" : "ml-auto mr-0 w-[85%]"
                  }`}
                  style={{
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Cat avatar circle */}
                  <div
                    className={`absolute ${
                      index % 2 === 0 ? "-right-8" : "-left-8"
                    } top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden z-10 p-1`}
                    style={{ backgroundColor: stage.color }}
                  >
                    <div style={{ transform: `scale(${stage.scale})` }}>
                      <CatAvatar size={48} />
                    </div>
                  </div>

                  <h3 className="font-bold text-[#4A403A] text-lg mb-2">
                    {stage.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-[#F5F1E8] text-[#7FA87F] px-3 py-1 rounded-full text-sm font-medium">
                      {stage.level}
                    </span>
                    <span className="bg-[#F5F1E8] text-[#8B7E74] px-3 py-1 rounded-full text-sm">
                      {stage.age}
                    </span>
                  </div>
                  <p className="text-sm text-[#8B7E74]">
                    루틴을 완료하고 경험치를 쌓으면 냥이가 성장해요
                  </p>
                </div>

                {/* Arrow between stages */}
                {index < stages.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 z-20">
                    <div className="w-10 h-10 bg-[#7FA87F] rounded-full flex items-center justify-center shadow-md">
                      <ArrowUp className="text-white" size={20} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom info card */}
      <div className="px-6 pt-12">
        <div className="bg-gradient-to-br from-[#7FA87F] to-[#6D926D] rounded-2xl p-6 shadow-lg">
          <h3 className="text-white font-bold mb-2">성장 팁</h3>
          <p className="text-white/90 text-sm leading-relaxed">
            매일 루틴을 완료하면 경험치를 얻을 수 있어요. 연속으로 루틴을 완료하면
            보너스 경험치도 받을 수 있답니다! 친구들과 함께 응원하며 더 빠르게
            성장해보세요.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
