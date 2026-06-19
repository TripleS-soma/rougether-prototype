import { useState } from "react";
import { X, Check, CalendarDays } from "lucide-react";

interface DateRangeSheetProps {
  initialStartDate: string; // "YYYY-MM-DD"
  initialEndDate?: string; // "YYYY-MM-DD" | undefined(무기한)
  onSave?: (startDate: string, endDate?: string) => void;
  onClose?: () => void;
}

export function DateRangeSheet({
  initialStartDate,
  initialEndDate,
  onSave,
  onClose,
}: DateRangeSheetProps) {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [hasEndDate, setHasEndDate] = useState(Boolean(initialEndDate));
  const [endDate, setEndDate] = useState(initialEndDate ?? "");

  const endDateValid =
    !hasEndDate || (!!endDate && endDate >= startDate);

  const save = () => {
    if (!endDateValid) return;
    onSave?.(startDate, hasEndDate && endDate ? endDate : undefined);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#FBF8F3] rounded-t-3xl shadow-2xl">
        {/* Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-[#EDE3D3]">
          <h3 className="text-lg font-bold text-[#4A403A]">지속 기간</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F5E6D3] hover:bg-[#EBD9C2] flex items-center justify-center transition-colors"
            aria-label="닫기"
          >
            <X size={18} className="text-[#4A403A]" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Start date */}
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F5E6D3] flex items-center justify-center">
              <CalendarDays size={18} className="text-[#7FA87F]" />
            </div>
            <span className="text-sm text-[#8B7E74] w-12 shrink-0">
              시작일
            </span>
            <input
              type="date"
              value={startDate}
              max={hasEndDate && endDate ? endDate : undefined}
              onChange={(e) => setStartDate(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[#4A403A]"
            />
          </div>

          {/* End date toggle + picker */}
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4A403A]">종료일 설정</span>
              <button
                type="button"
                role="switch"
                aria-checked={hasEndDate}
                onClick={() => setHasEndDate((v) => !v)}
                className={`relative inline-flex shrink-0 items-center w-[44px] h-[26px] rounded-full transition-colors ${
                  hasEndDate ? "bg-[#7FA87F]" : "bg-[#D4C4B0]"
                }`}
              >
                <span
                  className="absolute left-[2px] w-[22px] h-[22px] bg-white rounded-full shadow-sm transition-transform"
                  style={{
                    transform: hasEndDate
                      ? "translateX(18px)"
                      : "translateX(0)",
                  }}
                />
              </button>
            </div>

            {hasEndDate ? (
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#F0E9DC]">
                <span className="text-sm text-[#8B7E74] w-12 shrink-0">
                  종료일
                </span>
                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[#4A403A]"
                />
              </div>
            ) : (
              <p className="text-xs text-[#B5A89C] mt-1">
                종료일 없이 계속 진행해요
              </p>
            )}
          </div>

          {hasEndDate && !endDateValid && (
            <p className="text-xs text-[#D08585] px-1">
              종료일은 시작일 이후로 선택해주세요.
            </p>
          )}
        </div>

        {/* Save */}
        <div className="px-6 pb-6 pt-1">
          <button
            onClick={save}
            disabled={!endDateValid}
            className="w-full bg-[#7FA87F] hover:bg-[#6D926D] disabled:bg-[#D4C4B0] text-white py-3.5 rounded-full font-semibold shadow-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Check size={18} />
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
