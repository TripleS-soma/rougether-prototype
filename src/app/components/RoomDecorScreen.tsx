import { ArrowLeft, Sparkles, Check } from "lucide-react";
import { useState } from "react";
import { FURNITURE_ITEMS, WALLPAPERS, DEFAULT_WALLPAPER_ID, getFurniturePlacement, getFurnitureSlot } from "./furniture";
import { CharacterId, DEFAULT_CHARACTER_ID } from "./character";
import {
  CharacterAvatar,
  DEFAULT_DESIGN_ID,
  DesignId,
  cx,
  getDesign,
} from "../design-system";

interface RoomDecorScreenProps {
  onBack?: () => void;
  initialPlaced?: Set<string>;
  initialWallpaperId?: string;
  /** Furniture ids the user owns (only these appear in the catalog) */
  owned?: Set<string>;
  onApply?: (placed: Set<string>, wallpaperId: string) => void;
  characterId?: CharacterId;
  designId?: DesignId;
}

export function RoomDecorScreen({
  onBack,
  initialPlaced,
  initialWallpaperId,
  owned,
  onApply,
  characterId = DEFAULT_CHARACTER_ID,
  designId = DEFAULT_DESIGN_ID,
}: RoomDecorScreenProps = {}) {
  const design = getDesign(designId);
  const categories = ["전체", "벽지", "가구", "장식", "조명", "러그", "한옥"];

  const ownedItems = owned
    ? FURNITURE_ITEMS.filter((i) => owned.has(i.id))
    : FURNITURE_ITEMS;

  const [placed, setPlaced] = useState<Set<string>>(
    () => new Set(initialPlaced ?? ["hanok-bed", "hanok-shelf", "hanok-window", "hanok-drawer", "hanok-armchair", "hanok-plant", "hanok-rug", "hanok-teatable"])
  );
  const [wallpaperId, setWallpaperId] = useState<string>(
    initialWallpaperId ?? DEFAULT_WALLPAPER_ID
  );
  const [activeCategory, setActiveCategory] = useState("전체");

  const toggle = (id: string) => {
    const selectedItem = FURNITURE_ITEMS.find((item) => item.id === id);
    if (!selectedItem) return;
    const selectedSlot = getFurnitureSlot(selectedItem);

    setPlaced((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        return next;
      }

      FURNITURE_ITEMS.forEach((item) => {
        if (getFurnitureSlot(item) === selectedSlot) next.delete(item.id);
      });
      next.add(id);
      return next;
    });
  };

  const filteredFurniture =
    activeCategory === "전체" || activeCategory === "벽지"
      ? activeCategory === "벽지"
        ? []
        : ownedItems
      : ownedItems.filter((i) => i.category === activeCategory);

  const showWallpapers = activeCategory === "전체" || activeCategory === "벽지";

  const currentWallpaper =
    WALLPAPERS.find((w) => w.id === wallpaperId) ?? WALLPAPERS[0];

  return (
    <div className={cx("min-h-screen pb-32", design.screen)}>
      {/* Header */}
      <div className={cx(design.header, "px-6 py-4 flex items-center gap-3")}>
        <button onClick={onBack} className="text-[#8B7E74] hover:text-[#4A403A] transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h2 className="text-xl font-bold text-[#4A403A]">나의 방 꾸미기</h2>
      </div>

      {/* Room Preview */}
      <div className="px-4 pt-6 pb-4">
        <div
          className="rounded-3xl shadow-xl relative overflow-hidden min-h-[400px]"
          style={
            currentWallpaper.backgroundImage
              ? {
                  backgroundImage: `url(${currentWallpaper.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { background: currentWallpaper.background }
          }
        >

          {FURNITURE_ITEMS.filter((item) => placed.has(item.id)).map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.name}
              className="absolute object-contain pointer-events-none"
              style={getFurniturePlacement(item)}
            />
          ))}

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2" style={{ zIndex: 5 }}>
            <CharacterAvatar
              characterId={characterId}
              designId={designId}
              size={120}
              variant="room"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-6 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? "bg-[#7FA87F] text-white"
                  : "bg-white text-[#8B7E74] hover:bg-[#F5F1E8]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Wallpapers */}
      {showWallpapers && (
        <div className="px-6 mb-4">
          <h3 className="text-sm font-semibold text-[#8B7E74] mb-3">벽지</h3>
          <div className="grid grid-cols-4 gap-2">
            {WALLPAPERS.map((wp) => {
              const isActive = wp.id === wallpaperId;
              return (
                <div
                  key={wp.id}
                  onClick={() => setWallpaperId(wp.id)}
                  className={`bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                    isActive ? "ring-2 ring-[#7FA87F]" : ""
                  }`}
                >
                  <div
                    className={`w-full aspect-square rounded-lg mb-1.5 ${!wp.backgroundImage ? wp.previewClass : ''}`}
                    style={
                      wp.backgroundImage
                        ? {
                            backgroundImage: `url(${wp.backgroundImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : undefined
                    }
                  ></div>
                  <h4 className="text-[11px] leading-tight text-[#4A403A] font-medium mb-1 line-clamp-2 min-h-[28px]">{wp.name}</h4>
                  <div className="flex items-center gap-0.5">
                    <Sparkles size={11} className="text-[#D4A574] flex-shrink-0" />
                    <span className="text-[10px] text-[#8B7E74]">{wp.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Items Grid */}
      {filteredFurniture.length > 0 && (
        <div className="px-6">
          {showWallpapers && (
            <h3 className="text-sm font-semibold text-[#8B7E74] mb-3">가구 · 소품</h3>
          )}
          <div className="grid grid-cols-4 gap-2">
            {filteredFurniture.map((item) => {
              const isPlaced = placed.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className={`bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                    isPlaced ? "ring-2 ring-[#7FA87F]" : ""
                  }`}
                >
                  <div className="w-full aspect-square bg-gradient-to-br from-[#F5F1E8] to-[#E8DCC8] rounded-lg mb-1.5 flex items-center justify-center p-1.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h4 className="text-[11px] leading-tight text-[#4A403A] font-medium mb-1 line-clamp-2 min-h-[28px]">{item.name}</h4>
                  <div className="flex items-center gap-0.5">
                    <Sparkles size={11} className="text-[#D4A574] flex-shrink-0" />
                    <span className="text-[10px] text-[#8B7E74]">{item.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Apply (commit) bar */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md px-6 pb-3 z-20">
        <button
          onClick={() => {
            onApply?.(new Set(placed), wallpaperId);
            onBack?.();
          }}
          className="w-full bg-[#7FA87F] hover:bg-[#6D926D] text-white py-3.5 rounded-full font-semibold shadow-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Check size={18} />
          적용하기
        </button>
      </div>
    </div>
  );
}
