import {
  Bell,
  User,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
  Volume2,
  Palette,
} from "lucide-react";
import {
  DEFAULT_DESIGN_ID,
  DESIGN_OPTIONS,
  DesignId,
  cx,
  getDesign,
} from "../design-system";

interface SettingsScreenProps {
  onLogout?: () => void;
  designId?: DesignId;
  onChangeDesign?: (designId: DesignId) => void;
}

export function SettingsScreen({
  onLogout,
  designId = DEFAULT_DESIGN_ID,
  onChangeDesign,
}: SettingsScreenProps = {}) {
  const design = getDesign(designId);
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
        { icon: LogOut, label: "로그아웃", action: onLogout },
      ],
    },
  ];

  return (
    <div className={cx("min-h-screen pb-24", design.screen)}>
      <div className={cx(design.header, "px-6 py-5")}> 
        <h2 className={cx("text-xl font-bold", design.text)}>설정</h2>
        <p className={cx("text-sm mt-1", design.textMuted)}>
          앱 환경을 관리해보세요.
        </p>
      </div>

      <div className="px-4 mt-4 space-y-5">
        <div>
          <p className={cx("text-xs font-semibold px-3 mb-2", design.textMuted)}>
            디자인
          </p>
          <div className={cx(design.card, "p-3")}>
            <div className="flex items-center gap-3 mb-3">
              <div className={cx("w-8 h-8 rounded-full flex items-center justify-center", design.surfaceMuted)}>
                <Palette size={16} className={design.primaryText} />
              </div>
              <div>
                <p className={cx("text-sm font-semibold", design.text)}>
                  화면 스타일
                </p>
                <p className={cx("text-xs", design.textMuted)}>
                  원하는 분위기로 전체 화면을 바꿔보세요.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {DESIGN_OPTIONS.map((option) => {
                const selected = option.id === designId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onChangeDesign?.(option.id)}
                    className={cx(
                      "rounded-2xl border px-2 py-3 text-left transition-all",
                      selected
                        ? "ring-2 " + design.activeRing + " border-transparent"
                        : design.border + " hover:bg-[#F5F1E8]",
                    )}
                  >
                    <span className={cx("block text-sm font-semibold", design.text)}>
                      {option.name}
                    </span>
                    <span className={cx("mt-1 block text-[10px] leading-snug", design.textMuted)}>
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.title}>
            <p className={cx("text-xs font-semibold px-3 mb-2", design.textMuted)}>
              {section.title}
            </p>
            <div className={cx(design.card, "overflow-hidden")}>
              {section.items.map(({ icon: Icon, label, action }, idx) => (
                <button
                  key={label}
                  onClick={action}
                  className={cx(
                    "w-full flex items-center justify-between px-4 py-3.5 transition-colors",
                    "hover:bg-[#F5F1E8]",
                    idx !== section.items.length - 1
                      ? "border-b border-[#E8DCC8]/50"
                      : "",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cx("w-8 h-8 rounded-full flex items-center justify-center", design.surfaceMuted)}>
                      <Icon size={16} className={design.primaryText} />
                    </div>
                    <span className={cx("text-sm", design.text)}>{label}</span>
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
