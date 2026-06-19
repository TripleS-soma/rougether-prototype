import { useState } from "react";
import { X, Check, Bell, BellOff } from "lucide-react";

interface TimePickerSheetProps {
  initialEnabled: boolean;
  initialTime: string; // "HH:MM" 24h
  onSave?: (enabled: boolean, time: string) => void;
  onClose?: () => void;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1); // 1~12
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

function parse(time: string) {
  const [h, m] = time.split(":").map((v) => parseInt(v, 10));
  const ampm: "AM" | "PM" = h >= 12 ? "PM" : "AM";
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  // snap minute to nearest 5
  const minute = MINUTES.reduce((p, c) =>
    Math.abs(c - m) < Math.abs(p - m) ? c : p,
  );
  return { ampm, hour12, minute };
}

function to24(ampm: "AM" | "PM", hour12: number, minute: number) {
  let h = hour12 % 12;
  if (ampm === "PM") h += 12;
  return `${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function TimePickerSheet({
  initialEnabled,
  initialTime,
  onSave,
  onClose,
}: TimePickerSheetProps) {
  const parsed = parse(initialTime || "07:00");
  const [enabled, setEnabled] = useState(initialEnabled);
  const [ampm, setAmpm] = useState<"AM" | "PM">(parsed.ampm);
  const [hour12, setHour12] = useState(parsed.hour12);
  const [minute, setMinute] = useState(parsed.minute);

  const save = () => {
    onSave?.(enabled, to24(ampm, hour12, minute));
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#FBF8F3] rounded-t-3xl shadow-2xl">
        {/* Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-[#EDE3D3]">
          <h3 className="text-lg font-bold text-[#4A403A]">알림 시간</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F5E6D3] hover:bg-[#EBD9C2] flex items-center justify-center transition-colors"
            aria-label="닫기"
          >
            <X size={18} className="text-[#4A403A]" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Enable toggle */}
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F5E6D3] flex items-center justify-center">
              {enabled ? (
                <Bell size={18} className="text-[#7FA87F]" />
              ) : (
                <BellOff size={18} className="text-[#B5A89C]" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#4A403A]">알림 받기</p>
              <p className="text-xs text-[#8B7E74]">
                {enabled
                  ? "설정한 시간에 알려드려요"
                  : "알림 없이 진행해요"}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={enabled}
              onClick={() => setEnabled((v) => !v)}
              className={`relative inline-flex shrink-0 items-center w-[44px] h-[26px] rounded-full transition-colors ${
                enabled ? "bg-[#7FA87F]" : "bg-[#D4C4B0]"
              }`}
            >
              <span
                className="absolute left-[2px] w-[22px] h-[22px] bg-white rounded-full shadow-sm transition-transform"
                style={{
                  transform: enabled
                    ? "translateX(18px)"
                    : "translateX(0)",
                }}
              />
            </button>
          </div>

          {/* Time picker (only when enabled) */}
          <div
            className={`transition-opacity ${
              enabled ? "opacity-100" : "opacity-40 pointer-events-none"
            }`}
          >
            {/* AM/PM */}
            <div className="flex gap-2 mb-3">
              {(["AM", "PM"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setAmpm(p)}
                  className={`flex-1 py-2.5 rounded-xl font-medium transition-colors ${
                    ampm === p
                      ? "bg-[#7FA87F] text-white"
                      : "bg-white text-[#8B7E74] shadow-sm"
                  }`}
                >
                  {p === "AM" ? "오전" : "오후"}
                </button>
              ))}
            </div>

            {/* Hour */}
            <p className="text-xs text-[#8B7E74] mb-1.5">시</p>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
              {HOURS.map((h) => (
                <button
                  key={h}
                  onClick={() => setHour12(h)}
                  className={`w-11 h-11 shrink-0 rounded-xl font-medium transition-colors ${
                    hour12 === h
                      ? "bg-[#7FA87F] text-white"
                      : "bg-white text-[#4A403A] shadow-sm"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>

            {/* Minute */}
            <p className="text-xs text-[#8B7E74] mb-1.5">분</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {MINUTES.map((m) => (
                <button
                  key={m}
                  onClick={() => setMinute(m)}
                  className={`w-11 h-11 shrink-0 rounded-xl font-medium transition-colors ${
                    minute === m
                      ? "bg-[#7FA87F] text-white"
                      : "bg-white text-[#4A403A] shadow-sm"
                  }`}
                >
                  {String(m).padStart(2, "0")}
                </button>
              ))}
            </div>

            {/* Preview */}
            <div className="mt-4 text-center">
              <span className="text-2xl font-bold text-[#4A403A]">
                {ampm === "AM" ? "오전" : "오후"} {hour12}:
                {String(minute).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="px-6 pb-6 pt-1">
          <button
            onClick={save}
            className="w-full bg-[#7FA87F] hover:bg-[#6D926D] text-white py-3.5 rounded-full font-semibold shadow-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Check size={18} />
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
