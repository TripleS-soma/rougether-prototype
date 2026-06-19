import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { CatAvatar } from "./CatAvatar";

interface AuthScreenProps {
  onAuthSuccess?: () => void;
  onGoSignup?: () => void;
}

export function AuthScreen({ onAuthSuccess, onGoSignup }: AuthScreenProps = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const canSubmit = email.length > 0 && password.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onAuthSuccess?.();
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] flex flex-col pb-10">
      {/* Hero */}
      <div className="px-6 pt-16 pb-8 flex flex-col items-center text-center">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#F5E6D3] to-[#E8DCC8] flex items-center justify-center shadow-md mb-4">
          <CatAvatar size={88} variant="happy" />
        </div>
        <h1 className="text-2xl font-bold text-[#4A403A] mb-1">
          루틴 빌리지
        </h1>
        <p className="text-sm text-[#8B7E74]">
          매일의 루틴으로 나만의 마을을 키워보세요
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 flex-1">
        <div className="bg-white rounded-3xl shadow-sm p-6 space-y-4">
          <Field
            icon={<Mail size={18} />}
            type="email"
            placeholder="이메일"
            value={email}
            onChange={setEmail}
          />

          <Field
            icon={<Lock size={18} />}
            type={showPw ? "text" : "password"}
            placeholder="비밀번호"
            value={password}
            onChange={setPassword}
            trailing={
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="text-[#8B7E74] hover:text-[#4A403A]"
                aria-label="비밀번호 보기"
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-[#8B7E74] cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#7FA87F] w-4 h-4 rounded"
              />
              로그인 유지
            </label>
            <button
              type="button"
              className="text-[#7FA87F] hover:underline"
            >
              비밀번호 찾기
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full mt-5 py-3.5 rounded-full font-semibold shadow-sm transition-all ${
            canSubmit
              ? "bg-[#7FA87F] hover:bg-[#6D926D] text-white"
              : "bg-[#D9D2C5] text-white cursor-not-allowed"
          }`}
        >
          로그인
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#EDE3D3]" />
          <span className="text-xs text-[#B5A89C]">간편 로그인</span>
          <div className="flex-1 h-px bg-[#EDE3D3]" />
        </div>

        {/* Social */}
        <div className="grid grid-cols-3 gap-3">
          <SocialButton bg="#FEE500" label="카카오" textColor="#3C1E1E">
            <span className="text-xl font-bold">K</span>
          </SocialButton>
          <SocialButton bg="#03C75A" label="네이버" textColor="#FFFFFF">
            <span className="text-xl font-bold">N</span>
          </SocialButton>
          <SocialButton bg="#FFFFFF" label="구글" textColor="#4A403A" border>
            <span className="text-xl font-bold">G</span>
          </SocialButton>
        </div>

        <p className="text-center text-xs text-[#8B7E74] mt-6">
          아직 회원이 아니신가요?{" "}
          <button
            type="button"
            onClick={onGoSignup}
            className="text-[#7FA87F] font-semibold hover:underline"
          >
            회원가입
          </button>
        </p>
      </form>
    </div>
  );
}

interface FieldProps {
  icon: React.ReactNode;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  trailing?: React.ReactNode;
  error?: string;
}

function Field({
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  trailing,
  error,
}: FieldProps) {
  return (
    <div>
      <div
        className={`flex items-center gap-3 bg-[#FBF8F3] rounded-2xl px-4 py-3 border transition-colors ${
          error
            ? "border-[#E89A9A]"
            : "border-transparent focus-within:border-[#7FA87F]"
        }`}
      >
        <span className="text-[#B5A89C]">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm text-[#4A403A] placeholder:text-[#B5A89C]"
        />
        {trailing}
      </div>
      {error && (
        <p className="text-xs text-[#D67878] mt-1.5 ml-2">{error}</p>
      )}
    </div>
  );
}

interface SocialButtonProps {
  bg: string;
  textColor: string;
  label: string;
  border?: boolean;
  children: React.ReactNode;
}

function SocialButton({
  bg,
  textColor,
  label,
  border,
  children,
}: SocialButtonProps) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1.5 group"
      aria-label={`${label}로 시작`}
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow ${
          border ? "border border-[#E5DACB]" : ""
        }`}
        style={{ backgroundColor: bg, color: textColor }}
      >
        {children}
      </div>
      <span className="text-xs text-[#8B7E74]">{label}</span>
    </button>
  );
}
