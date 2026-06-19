import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Heart,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import { CatAvatar } from "./CatAvatar";

interface FriendRoomScreenProps {
  onBack?: () => void;
  friendName?: string;
}

export function FriendRoomScreen({ onBack, friendName = "친구" }: FriendRoomScreenProps = {}) {
  const routines = [
    { id: "1", title: "아침 기상", completed: true },
    { id: "2", title: "독서 30분", completed: true },
    { id: "3", title: "운동 인증", completed: true },
    { id: "4", title: "영어 공부", completed: true },
    { id: "5", title: "하루 회고", completed: false },
  ];

  const completedCount = routines.filter((r) => r.completed).length;

  return (
    <div className="min-h-screen bg-[#FBF8F3] pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#F5F1E8] hover:bg-[#E8DCC8] flex items-center justify-center text-[#4A403A] transition-colors"
          aria-label="뒤로가기"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-lg font-bold text-[#4A403A]">{friendName}의 방</h2>
          <p className="text-sm text-[#8B7E74]">Lv.18</p>
        </div>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-2 gap-0">
        {/* Left: Friend's Room */}
        <div className="bg-gradient-to-b from-[#D4E8D4] to-[#E8F4E8] p-4 min-h-[400px] relative">
          {/* Room decorations */}
          <div className="absolute top-6 right-4 w-12 h-14 bg-[#B8D8E8] rounded-lg border-2 border-white/80"></div>
          <div className="absolute top-8 left-4 text-2xl">🪴</div>
          <div className="absolute bottom-16 left-6 w-12 h-10 bg-[#B8A593] rounded-md shadow-sm"></div>
          <div className="absolute bottom-20 right-6 text-xl">📚</div>

          {/* Cat character */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <CatAvatar size={120} />
          </div>

          {/* Rug */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-20 bg-[#A8C9A8] rounded-[40%] opacity-30"></div>
        </div>

        {/* Right: Friend's Routines */}
        <div className="bg-white p-4 min-h-[400px]">
          <h3 className="font-bold text-[#4A403A] mb-2">{friendName}의 루틴</h3>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#8B7E74]">오늘의 루틴</span>
              <span className="text-sm font-semibold text-[#7FA87F]">
                {completedCount} / {routines.length}
              </span>
            </div>
            <div className="h-2 bg-[#F5F1E8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7FA87F] rounded-full"
                style={{ width: `${(completedCount / routines.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Routine list */}
          <div className="space-y-2 mb-4">
            {routines.map((routine) => (
              <div key={routine.id} className="flex items-center gap-2">
                {routine.completed ? (
                  <CheckCircle2 size={18} className="text-[#7FA87F] flex-shrink-0" />
                ) : (
                  <Circle size={18} className="text-[#D4C4B0] flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${
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

          {/* Today's proof */}
          <div className="bg-[#F5F1E8] rounded-xl p-3 mb-4">
            <p className="text-xs text-[#8B7E74] mb-2">오늘의 인증</p>
            <div className="aspect-video bg-gradient-to-br from-[#D4E8D4] to-[#A8C9A8] rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={32} />
            </div>
          </div>

          {/* Cheer buttons */}
          <div className="space-y-2">
            <button className="w-full bg-[#7FA87F] text-white py-2 rounded-full text-sm flex items-center justify-center gap-2 hover:bg-[#6D926D] transition-colors">
              <ThumbsUp size={16} />
              수고했어!
            </button>
            <button className="w-full bg-[#F5E6D3] text-[#4A403A] py-2 rounded-full text-sm flex items-center justify-center gap-2 hover:bg-[#E8DCC8] transition-colors">
              <Heart size={16} />
              응원하기
            </button>
            <button className="w-full bg-[#FFF8E7] text-[#4A403A] py-2 rounded-full text-sm flex items-center justify-center gap-2 hover:bg-[#F5E6D3] transition-colors">
              <Sparkles size={16} />
              오늘도 최고야
            </button>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8DCC8] px-6 py-4">
        <div className="flex gap-3 max-w-md mx-auto">
          <button onClick={onBack} className="flex-1 bg-white border border-[#D4C4B0] text-[#4A403A] py-3 rounded-full hover:bg-[#F5F1E8] transition-colors">
            내 방으로
          </button>
          <button className="flex-1 bg-[#7FA87F] text-white py-3 rounded-full hover:bg-[#6D926D] transition-colors">
            다음 방
          </button>
        </div>
      </div>
    </div>
  );
}
