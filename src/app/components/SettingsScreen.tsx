import { Bell, User, Lock, HelpCircle, LogOut, ChevronRight, Volume2 } from "lucide-react";

interface SettingsScreenProps {
  onLogout?: () => void;
}

export function SettingsScreen({ onLogout }: SettingsScreenProps = {}) {
  const sections = [
    {
      title: "계정",
      items: [
        { icon: User, label: "프로필 편집" },
        { icon: Lock, label: "비밀번호 변경" },
      ],
    },
    {
      title: "알림",
      items: [
        { icon: Bell, label: "푸시 알림" },
        { icon: Volume2, label: "효과음" },
      ],
    },
    {
      title: "기타",
      items: [
        { icon: HelpCircle, label: "도움말" },
        { icon: LogOut, label: "\uB85C\uADF8\uC544\uC6C3", action: onLogout },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F3] pb-24">
      <div className="bg-white/90 backdrop-blur-sm shadow-sm px-6 py-5">
        <h2 className="text-xl font-bold text-[#4A403A]">설정</h2>
        <p className="text-sm text-[#8B7E74] mt-1">앱 환경을 관리해보세요</p>
      </div>

      <div className="px-4 mt-4 space-y-5">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-xs font-semibold text-[#8B7E74] px-3 mb-2">
              {section.title}
            </p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {section.items.map(({ icon: Icon, label, action }, idx) => (
                <button
                  key={label}
                  onClick={action}
                  className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-[#F5F1E8] transition-colors ${
                    idx !== section.items.length - 1
                      ? "border-b border-[#E8DCC8]/50"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E8DCC8]/60 flex items-center justify-center">
                      <Icon size={16} className="text-[#7FA87F]" />
                    </div>
                    <span className="text-sm text-[#4A403A]">{label}</span>
                  </div>
                  <ChevronRight size={16} className="text-[#B8A593]" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
