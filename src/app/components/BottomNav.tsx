import { Home, Building2, Settings } from "lucide-react";

export type BottomNavTab = "myRoom" | "house" | "settings";

interface BottomNavProps {
  active: BottomNavTab;
  onChange: (tab: BottomNavTab) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  const items: { key: BottomNavTab; label: string; Icon: typeof Home }[] = [
    { key: "myRoom", label: "나의 방", Icon: Home },
    { key: "house", label: "집", Icon: Building2 },
    { key: "settings", label: "설정", Icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8DCC8] px-4 py-3 shadow-lg z-30">
      <div className="flex justify-around items-center">
        {items.map(({ key, label, Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-[#7FA87F]" : "text-[#B8A593]"
              }`}
            >
              <Icon size={22} />
              <span className="text-xs">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
