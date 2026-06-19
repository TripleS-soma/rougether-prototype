import { useEffect, useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ChevronLeft,
  Check,
  ShieldCheck,
} from "lucide-react";

interface SignupScreenProps {
  onBack?: () => void;
  onSignupSuccess?: () => void;
}

export function SignupScreen({ onBack, onSignupSuccess }: SignupScreenProps = {}) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);

  // Email verification state
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [codeError, setCodeError] = useState<string | null>(null);

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordValid = password.length >= 8;
  const passwordMatch =
    passwordConfirm.length > 0 && password === passwordConfirm;

  const toggleAll = (next: boolean) => {
    setAgreeAll(next);
    setAgreeTerms(next);
    setAgreePrivacy(next);
    setAgreeMarketing(next);
  };

  const updateAgreeAll = (
    terms: boolean,
    privacy: boolean,
    marketing: boolean,
  ) => {
    setAgreeAll(terms && privacy && marketing);
  };

  // Countdown timer for verification code
  useEffect(() => {
    if (!codeSent || emailVerified || secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [codeSent, emailVerified, secondsLeft]);

  // Reset verification when email changes
  useEffect(() => {
    setCodeSent(false);
    setEmailVerified(false);
    setVerificationCode("");
    setSecondsLeft(0);
    setCodeError(null);
  }, [email]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSendCode = () => {
    if (!emailValid) return;
    setCodeSent(true);
    setSecondsLeft(180);
    setVerificationCode("");
    setCodeError(null);
  };

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      setCodeError("6자리 인증번호를 입력해주세요");
      return;
    }
    if (secondsLeft <= 0) {
      setCodeError("인증 시간이 만료되었어요. 다시 발송해주세요");
      return;
    }
    // Demo: any 6-digit code passes
    setEmailVerified(true);
    setCodeError(null);
  };

  const canSubmit =
    nickname.length > 0 &&
    emailValid &&
    emailVerified &&
    passwordValid &&
    passwordMatch &&
    agreeTerms &&
    agreePrivacy;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSignupSuccess?.();
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] pb-10">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#F5E6D3] hover:bg-[#EBD9C2] flex items-center justify-center transition-colors"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={22} className="text-[#4A403A]" />
        </button>
        <h2 className="text-base font-bold text-[#4A403A]">회원가입</h2>
        <div className="w-10 h-10" />
      </div>

      <div className="px-6 pt-6">
        <h1 className="text-xl font-bold text-[#4A403A] mb-1">
          마을의 새 친구를 환영해요 🐾
        </h1>
        <p className="text-sm text-[#8B7E74]">
          정보를 입력하고 나만의 루틴 빌리지를 시작하세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pt-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 space-y-4">
          <Field
            label="닉네임"
            icon={<User size={18} />}
            placeholder="2~10자 닉네임"
            value={nickname}
            onChange={setNickname}
            error={
              nickname.length > 0 && (nickname.length < 2 || nickname.length > 10)
                ? "2~10자로 입력해주세요"
                : undefined
            }
          />

          <div>
            <label className="block text-xs font-semibold text-[#8B7E74] mb-1.5 ml-1">
              이메일
            </label>
            <div className="flex gap-2">
              <div
                className={`flex-1 flex items-center gap-3 bg-[#FBF8F3] rounded-2xl px-4 py-3 border transition-colors ${
                  email.length > 0 && !emailValid
                    ? "border-[#E89A9A]"
                    : emailVerified
                      ? "border-[#7FA87F]"
                      : "border-transparent focus-within:border-[#7FA87F]"
                }`}
              >
                <Mail size={18} className="text-[#B5A89C]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  disabled={emailVerified}
                  className="flex-1 bg-transparent outline-none text-sm text-[#4A403A] placeholder:text-[#B5A89C] disabled:text-[#8B7E74]"
                />
                {emailVerified && (
                  <ShieldCheck size={18} className="text-[#7FA87F]" />
                )}
              </div>
              <button
                type="button"
                onClick={handleSendCode}
                disabled={!emailValid || emailVerified || secondsLeft > 150}
                className={`px-4 rounded-2xl font-semibold text-sm whitespace-nowrap transition-colors ${
                  !emailValid || emailVerified || secondsLeft > 150
                    ? "bg-[#E5DACB] text-white cursor-not-allowed"
                    : "bg-[#7FA87F] hover:bg-[#6D926D] text-white"
                }`}
              >
                {emailVerified ? "인증완료" : codeSent ? "재발송" : "인증요청"}
              </button>
            </div>
            {email.length > 0 && !emailValid && (
              <p className="text-xs text-[#D67878] mt-1.5 ml-2">
                이메일 형식이 올바르지 않아요
              </p>
            )}
            {emailVerified && (
              <p className="text-xs text-[#7FA87F] mt-1.5 ml-2">
                이메일 인증이 완료되었어요
              </p>
            )}
          </div>

          {codeSent && !emailVerified && (
            <div>
              <label className="block text-xs font-semibold text-[#8B7E74] mb-1.5 ml-1">
                인증번호
              </label>
              <div className="flex gap-2">
                <div
                  className={`flex-1 flex items-center gap-3 bg-[#FBF8F3] rounded-2xl px-4 py-3 border transition-colors ${
                    codeError
                      ? "border-[#E89A9A]"
                      : "border-transparent focus-within:border-[#7FA87F]"
                  }`}
                >
                  <ShieldCheck size={18} className="text-[#B5A89C]" />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) =>
                      setVerificationCode(
                        e.target.value.replace(/\D/g, "").slice(0, 6),
                      )
                    }
                    placeholder="6자리 인증번호"
                    className="flex-1 bg-transparent outline-none text-sm text-[#4A403A] placeholder:text-[#B5A89C] tracking-widest"
                  />
                  {secondsLeft > 0 && (
                    <span className="text-xs font-semibold text-[#E89A4A]">
                      {formatTime(secondsLeft)}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={verificationCode.length !== 6}
                  className={`px-4 rounded-2xl font-semibold text-sm whitespace-nowrap transition-colors ${
                    verificationCode.length !== 6
                      ? "bg-[#E5DACB] text-white cursor-not-allowed"
                      : "bg-[#4A403A] hover:bg-[#2F2823] text-white"
                  }`}
                >
                  확인
                </button>
              </div>
              {codeError ? (
                <p className="text-xs text-[#D67878] mt-1.5 ml-2">{codeError}</p>
              ) : (
                <p className="text-xs text-[#8B7E74] mt-1.5 ml-2">
                  메일함을 확인하고 6자리 인증번호를 입력해주세요
                </p>
              )}
            </div>
          )}

          <Field
            label="비밀번호"
            icon={<Lock size={18} />}
            type={showPw ? "text" : "password"}
            placeholder="8자 이상"
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
            error={
              password.length > 0 && !passwordValid
                ? "비밀번호는 8자 이상이에요"
                : undefined
            }
          />

          <Field
            label="비밀번호 확인"
            icon={<Lock size={18} />}
            type={showPw ? "text" : "password"}
            placeholder="비밀번호를 다시 입력하세요"
            value={passwordConfirm}
            onChange={setPasswordConfirm}
            error={
              passwordConfirm.length > 0 && !passwordMatch
                ? "비밀번호가 일치하지 않아요"
                : undefined
            }
            success={passwordMatch ? "비밀번호가 일치해요" : undefined}
          />
        </div>

        {/* Agreements */}
        <div className="bg-white rounded-3xl shadow-sm p-5 mt-4 space-y-3">
          <button
            type="button"
            onClick={() => toggleAll(!agreeAll)}
            className="w-full flex items-center gap-3 pb-3 border-b border-[#EDE3D3]"
          >
            <CheckBox checked={agreeAll} />
            <span className="font-semibold text-[#4A403A]">전체 동의</span>
          </button>

          <AgreementItem
            checked={agreeTerms}
            required
            label="이용약관 동의"
            onChange={(v) => {
              setAgreeTerms(v);
              updateAgreeAll(v, agreePrivacy, agreeMarketing);
            }}
          />
          <AgreementItem
            checked={agreePrivacy}
            required
            label="개인정보 처리방침 동의"
            onChange={(v) => {
              setAgreePrivacy(v);
              updateAgreeAll(agreeTerms, v, agreeMarketing);
            }}
          />
          <AgreementItem
            checked={agreeMarketing}
            label="마케팅 정보 수신 동의"
            onChange={(v) => {
              setAgreeMarketing(v);
              updateAgreeAll(agreeTerms, agreePrivacy, v);
            }}
          />
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
          가입하고 마을 시작하기
        </button>

        <p className="text-center text-xs text-[#8B7E74] mt-5">
          이미 계정이 있으신가요?{" "}
          <button
            type="button"
            onClick={onBack}
            className="text-[#7FA87F] font-semibold hover:underline"
          >
            로그인
          </button>
        </p>
      </form>
    </div>
  );
}

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  trailing?: React.ReactNode;
  error?: string;
  success?: string;
}

function Field({
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  trailing,
  error,
  success,
}: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#8B7E74] mb-1.5 ml-1">
        {label}
      </label>
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
      {error && <p className="text-xs text-[#D67878] mt-1.5 ml-2">{error}</p>}
      {!error && success && (
        <p className="text-xs text-[#7FA87F] mt-1.5 ml-2">{success}</p>
      )}
    </div>
  );
}

function CheckBox({ checked }: { checked: boolean }) {
  return (
    <div
      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
        checked ? "bg-[#7FA87F]" : "bg-[#F5F1E8] border border-[#D9D2C5]"
      }`}
    >
      {checked && <Check size={14} className="text-white" strokeWidth={3} />}
    </div>
  );
}

interface AgreementItemProps {
  checked: boolean;
  label: string;
  required?: boolean;
  onChange: (v: boolean) => void;
}

function AgreementItem({
  checked,
  label,
  required,
  onChange,
}: AgreementItemProps) {
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="flex items-center gap-3 flex-1"
      >
        <CheckBox checked={checked} />
        <span className="text-sm text-[#4A403A]">
          {label}{" "}
          <span
            className={
              required ? "text-[#D67878]" : "text-[#B5A89C]"
            }
          >
            ({required ? "필수" : "선택"})
          </span>
        </span>
      </button>
      <button
        type="button"
        className="text-xs text-[#B5A89C] underline underline-offset-2"
      >
        보기
      </button>
    </div>
  );
}
