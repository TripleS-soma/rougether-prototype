import { useState } from "react";
import { ArrowLeft, Send, Smile, Image as ImageIcon } from "lucide-react";
import { CatAvatar } from "./CatAvatar";

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  time: string;
  mine?: boolean;
  system?: boolean;
}

interface GroupChatScreenProps {
  onBack?: () => void;
}

export function GroupChatScreen({ onBack }: GroupChatScreenProps = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "s1", author: "", text: "오늘도 루틴 화이팅! 🌱", time: "", system: true },
    { id: "1", author: "최준서", text: "다들 좋은 아침!", time: "오전 8:12" },
    { id: "2", author: "장진형", text: "나 방금 기상 인증했어 ☀️", time: "오전 8:15" },
    { id: "3", author: "임채영", text: "독서 30분 완료! 🎉", time: "오전 9:02" },
    { id: "me1", author: "나", text: "오늘 운동 같이 할 사람?", time: "오전 9:30", mine: true },
    { id: "4", author: "최준서", text: "나 콜! 6시 어때", time: "오전 9:34" },
    { id: "5", author: "장진형", text: "좋아 같이 가자 🏃", time: "오전 9:36" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `me-${Date.now()}`,
        author: "나",
        text,
        time: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        mine: true,
      },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#F5F1E8] hover:bg-[#E8DCC8] flex items-center justify-center text-[#4A403A] transition-colors"
          aria-label="뒤로가기"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h2 className="text-base font-bold text-[#4A403A]">우리 그룹톡</h2>
          <p className="text-xs text-[#8B7E74]">멤버 4명 · 최준서, 장진형, 임채영, 나</p>
        </div>
        <div className="flex -space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full bg-[#F5E6D3] border-2 border-white overflow-hidden flex items-center justify-center"
            >
              <CatAvatar size={22} />
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
        {messages.map((m) => {
          if (m.system) {
            return (
              <div key={m.id} className="flex justify-center">
                <span className="text-[11px] text-[#8B7E74] bg-white/70 px-3 py-1 rounded-full">
                  {m.text}
                </span>
              </div>
            );
          }
          if (m.mine) {
            return (
              <div key={m.id} className="flex justify-end items-end gap-1.5">
                <span className="text-[10px] text-[#B8A593]">{m.time}</span>
                <div className="max-w-[70%] bg-[#7FA87F] text-white px-3.5 py-2 rounded-2xl rounded-br-md shadow-sm">
                  <p className="text-sm leading-snug">{m.text}</p>
                </div>
              </div>
            );
          }
          return (
            <div key={m.id} className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F5E6D3] flex items-center justify-center overflow-hidden flex-shrink-0">
                <CatAvatar size={28} />
              </div>
              <div className="max-w-[70%]">
                <p className="text-[11px] text-[#8B7E74] mb-0.5 ml-1">{m.author}</p>
                <div className="flex items-end gap-1.5">
                  <div className="bg-white text-[#4A403A] px-3.5 py-2 rounded-2xl rounded-bl-md shadow-sm">
                    <p className="text-sm leading-snug">{m.text}</p>
                  </div>
                  <span className="text-[10px] text-[#B8A593]">{m.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E8DCC8] px-3 py-2 flex items-center gap-2 z-20">
        <button className="text-[#B8A593] hover:text-[#4A403A] p-2">
          <ImageIcon size={20} />
        </button>
        <div className="flex-1 bg-[#F5F1E8] rounded-full px-4 py-2 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="메시지를 입력하세요"
            className="flex-1 bg-transparent outline-none text-sm text-[#4A403A] placeholder:text-[#B8A593]"
          />
          <button className="text-[#B8A593] hover:text-[#4A403A]">
            <Smile size={18} />
          </button>
        </div>
        <button
          onClick={send}
          disabled={!input.trim()}
          className="w-10 h-10 rounded-full bg-[#7FA87F] hover:bg-[#6D926D] disabled:bg-[#D4C4B0] text-white flex items-center justify-center transition-colors"
          aria-label="보내기"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
