import { Award, BookOpen, CheckCircle, Dumbbell, Target } from "lucide-react";
import { CatAvatar } from "./CatAvatar";

interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  icon: React.ReactNode;
  participantCount: number;
  rewards: { type: string; amount: number }[];
}

export function GroupMissionScreen() {
  const missions: Mission[] = [
    {
      id: "1",
      title: "이번 주 독서 50시간",
      description: "그룹 전체가 함께 독서한 시간을 합산해요",
      progress: 32,
      total: 50,
      icon: <BookOpen size={24} />,
      participantCount: 3,
      rewards: [
        { type: "집 꾸미기", amount: 1 },
        { type: "코인", amount: 500 },
      ],
    },
    {
      id: "2",
      title: "오늘 멤버 80% 루틴 완료",
      description: "그룹원 중 80%가 오늘의 루틴을 완료해요",
      progress: 4,
      total: 5,
      icon: <CheckCircle size={24} />,
      participantCount: 4,
      rewards: [
        { type: "잎사귀", amount: 200 },
        { type: "코인", amount: 300 },
      ],
    },
    {
      id: "3",
      title: "이번 달 운동 인증 10회",
      description: "그룹 전체가 운동을 인증한 횟수예요",
      progress: 6,
      total: 10,
      icon: <Dumbbell size={24} />,
      participantCount: 2,
      rewards: [
        { type: "잎사귀", amount: 300 },
        { type: "집 꾸미기", amount: 1 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F3] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7FA87F] to-[#A8C9A8] px-6 py-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Target className="text-white" size={28} />
          <h2 className="text-2xl font-bold text-white">그룹 미션</h2>
        </div>
        <p className="text-white/90 text-sm">
          함께 루틴을 완료하면 우리 집이 성장해요
        </p>
      </div>

      {/* Missions */}
      <div className="px-6 pt-6 space-y-4">
        {missions.map((mission) => {
          const progressPercentage = (mission.progress / mission.total) * 100;

          return (
            <div
              key={mission.id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Mission header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7FA87F] to-[#A8C9A8] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  {mission.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#4A403A] mb-1">
                    {mission.title}
                  </h3>
                  <p className="text-sm text-[#8B7E74]">{mission.description}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#8B7E74]">진행률</span>
                  <span className="text-sm font-semibold text-[#7FA87F]">
                    {mission.progress} / {mission.total}
                  </span>
                </div>
                <div className="h-3 bg-[#F5F1E8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7FA87F] to-[#A8C9A8] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Participants */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-[#8B7E74]">참여 중:</span>
                <div className="flex -space-x-2">
                  {Array.from({ length: mission.participantCount }).map((_, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-[#F5E6D3] border-2 border-white flex items-center justify-center overflow-hidden p-0.5"
                    >
                      <CatAvatar size={28} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewards */}
              <div className="bg-[#FFF8E7] rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={16} className="text-[#D4A574]" />
                  <span className="text-sm font-medium text-[#4A403A]">보상</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mission.rewards.map((reward, index) => (
                    <span
                      key={index}
                      className="bg-white px-3 py-1 rounded-full text-xs text-[#8B7E74]"
                    >
                      {reward.type} +{reward.amount}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom action */}
      <div className="px-6 pt-6">
        <div className="bg-gradient-to-br from-[#7FA87F] to-[#6D926D] rounded-2xl p-6 shadow-lg">
          <h3 className="text-white font-bold mb-2">함께 성장해요!</h3>
          <p className="text-white/90 text-sm mb-4 leading-relaxed">
            그룹 미션을 완료하면 특별한 보상을 받을 수 있어요. 친구들과 함께
            응원하며 목표를 달성해보세요.
          </p>
          <button className="w-full bg-white text-[#7FA87F] py-3 rounded-full font-semibold hover:bg-[#F5F1E8] transition-colors">
            미션 확인하기
          </button>
        </div>
      </div>
    </div>
  );
}
