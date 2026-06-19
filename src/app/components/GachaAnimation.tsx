import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, Sparkles } from "lucide-react";

export type Rarity = "일반" | "희귀" | "전설";

export interface GachaItem {
  name: string;
  icon: string;
  rarity: Rarity;
  /** Real image asset (used instead of emoji icon when present) */
  image?: string;
  /** Links the reward to a furniture inventory id */
  furnitureId?: string;
}

export interface GachaTheme {
  id: string;
  name: string;
  icon: string;
  accent: string;
  border: string;
  /** Full-screen background for the pull animation */
  bg: string;
  /** Glow color of the box / lights */
  glow: string;
  /** Whether the animation background is dark (controls text color) */
  dark: boolean;
  particles: string[];
  pool: GachaItem[];
}

const RARITY_COLOR: Record<Rarity, string> = {
  일반: "#B5A89C",
  희귀: "#7FA8D4",
  전설: "#F2B843",
};

function pickItems(theme: GachaTheme, count: number): GachaItem[] {
  const res: GachaItem[] = [];
  for (let i = 0; i < count; i++) {
    res.push(theme.pool[Math.floor(Math.random() * theme.pool.length)]);
  }
  return res;
}

interface GachaAnimationProps {
  theme: GachaTheme;
  count: number;
  onClose: () => void;
  /** Called once the reward items are revealed, with their furniture ids */
  onObtain?: (furnitureIds: string[]) => void;
}

export function GachaAnimation({
  theme,
  count,
  onClose,
  onObtain,
}: GachaAnimationProps) {
  const [phase, setPhase] = useState<"charge" | "reveal">("charge");
  const items = useMemo(() => pickItems(theme, count), [theme, count]);
  const textColor = theme.dark ? "#FFFFFF" : "#4A403A";
  const subColor = theme.dark
    ? "rgba(255,255,255,0.75)"
    : "rgba(74,64,58,0.7)";

  // Floating ambient particles
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        emoji: theme.particles[i % theme.particles.length],
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 14 + Math.random() * 22,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 4,
      })),
    [theme],
  );

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("reveal");
      const ids = items
        .map((it) => it.furnitureId)
        .filter((id): id is string => Boolean(id));
      if (ids.length > 0) onObtain?.(ids);
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: theme.bg }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Ambient particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: p.size,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.9, 0],
            y: [-10, -60],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.emoji}
        </motion.span>
      ))}

      <AnimatePresence mode="wait">
        {phase === "charge" ? (
          <motion.div
            key="charge"
            className="flex flex-col items-center"
            exit={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Glow ring */}
            <motion.div
              className="relative flex items-center justify-center"
              animate={{
                rotate: [0, -4, 4, -4, 4, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="absolute rounded-full blur-2xl"
                style={{
                  width: 220,
                  height: 220,
                  background: theme.glow,
                }}
                animate={{ opacity: [0.35, 0.8, 0.35], scale: [0.9, 1.15, 0.9] }}
                transition={{ duration: 1.1, repeat: Infinity }}
              />
              {/* The box */}
              <motion.div
                className="relative w-36 h-36 rounded-[28px] flex items-center justify-center shadow-2xl"
                style={{
                  backgroundColor: theme.accent,
                  border: `3px solid ${theme.border}`,
                }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <span className="text-6xl drop-shadow">{theme.icon}</span>
              </motion.div>
            </motion.div>

            <motion.p
              className="mt-10 font-bold"
              style={{ color: textColor }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              {theme.name}
            </motion.p>
            <p className="mt-1 text-sm" style={{ color: subColor }}>
              상자를 여는 중...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            className="flex flex-col items-center w-full px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Sparkles size={20} style={{ color: theme.glow }} />
              <h3 className="font-bold text-lg" style={{ color: textColor }}>
                새 아이템 획득!
              </h3>
              <Sparkles size={20} style={{ color: theme.glow }} />
            </motion.div>

            <div
              className={`grid gap-3 w-full max-w-sm ${
                items.length > 1 ? "grid-cols-3" : "grid-cols-1 place-items-center"
              }`}
            >
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  className={`bg-white rounded-2xl p-3 flex flex-col items-center shadow-lg ${
                    items.length === 1 ? "w-40" : "w-full"
                  }`}
                  style={{
                    border: `2px solid ${RARITY_COLOR[item.rarity]}`,
                  }}
                  initial={{ scale: 0, rotate: -12, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{
                    delay: 0.15 + idx * 0.12,
                    type: "spring",
                    stiffness: 260,
                    damping: 16,
                  }}
                >
                  <div
                    className="w-full aspect-square rounded-xl flex items-center justify-center mb-2 p-1.5"
                    style={{ backgroundColor: theme.accent }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <span className={items.length === 1 ? "text-5xl" : "text-3xl"}>
                        {item.icon}
                      </span>
                    )}
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full mb-1"
                    style={{
                      color: "#fff",
                      backgroundColor: RARITY_COLOR[item.rarity],
                    }}
                  >
                    {item.rarity}
                  </span>
                  <span className="text-xs text-[#4A403A] text-center leading-tight">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={onClose}
              className="mt-8 px-10 py-3 rounded-full bg-white font-bold text-[#4A403A] shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + items.length * 0.1 }}
            >
              확인
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cost hint */}
      <div
        className="absolute bottom-8 flex items-center gap-1.5 text-sm"
        style={{ color: subColor }}
      >
        <Leaf size={14} style={{ color: theme.glow }} />
        잎사귀 {count === 1 ? "250" : "1,250"} 사용
      </div>
    </motion.div>
  );
}
