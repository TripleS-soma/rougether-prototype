import { CheckCircle2, Circle, Leaf, Star } from "lucide-react";
import { CatAvatar } from "./CatAvatar";

interface Routine {
  id: string;
  title: string;
  completed: boolean;
}

export function RoutineScreen() {
  const routines: Routine[] = [
    { id: "1", title: "아침 7시 기상", completed: true },
    { id: "2", title: "독서 30분", completed: true },
    { id: "3", title: "물 2L 마시기", completed: true },
    { id: "4", title: "영어 공부", completed: false },
    { id: "5", title: "하루 회고", completed: false },
  ];

  const completedCount = routines.filter((r) => r.completed).length;

  return (
    <div className="min-h-screen bg-[#FBF8F3] pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#F5E6D3] flex items-center justify-center overflow-hidden p-1">
              <CatAvatar size={44} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#8B7E74]">Lv.20</span>
                <div className="w-24 h-2 bg-[#F5F1E8] rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-[#7FA87F] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1 bg-[#F0F8F0] px-3 py-1 rounded-full">
              <Leaf size={16} className="text-[#7FA87F]" />
              <span className="text-sm text-[#4A403A]">잎사귀 1,240</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6">
        <h2 className="text-2xl font-bold text-[#4A403A] mb-2">오늘의 루틴</h2>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#7FA87F] font-semibold">
            {completedCount} / {routines.length} 완료
          </span>
          <div className="flex-1 h-2 bg-[#F5F1E8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7FA87F] rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / routines.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Routine List */}
        <div className="space-y-3 mb-6">
          {routines.map((routine) => (
            <div
              key={routine.id}
              className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow"
            >
              {routine.completed ? (
                <CheckCircle2 size={24} className="text-[#7FA87F] flex-shrink-0" />
              ) : (
                <Circle size={24} className="text-[#D4C4B0] flex-shrink-0" />
              )}
              <span
                className={`flex-1 ${
                  routine.completed
                    ? "text-[#8B7E74] line-through"
                    : "text-[#4A403A]"
                }`}
              >
                {routine.title}
              </span>
            </div>
          ))}
        </div>

        {/* Reward Card */}
        <div className="bg-gradient-to-br from-[#7FA87F] to-[#6D926D] rounded-2xl p-6 shadow-lg relative overflow-hidden">
          {/* Happy cat decoration */}
          <div className="absolute -top-4 -right-4 opacity-20">
            <CatAvatar size={100} variant="happy" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold mb-1">오늘의 보상</h3>
                <p className="text-white/80 text-sm">
                  루틴을 완료하고 보상을 받아보세요!
                </p>
              </div>
              <Star className="text-[#FFF8E7] fill-[#FFF8E7]" size={32} />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="text-white" size={20} />
              <span className="text-white font-bold text-xl">+120 잎사귀</span>
            </div>
            <button className="w-full bg-white text-[#7FA87F] py-3 rounded-full font-semibold hover:bg-[#F5F1E8] transition-colors">
              보상 받기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
