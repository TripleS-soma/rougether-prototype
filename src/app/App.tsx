import { useState } from "react";
import { RoutineScreen } from "./components/RoutineScreen";
import { RoomDecorScreen } from "./components/RoomDecorScreen";
import { GroupHouseScreen } from "./components/GroupHouseScreen";
import {
  MyRoomZoomScreen,
  Routine,
  RoutineCategoryMeta,
  ROUTINE_CATEGORIES,
} from "./components/MyRoomZoomScreen";
import { FriendRoomScreen } from "./components/FriendRoomScreen";
import { CatGrowthScreen } from "./components/CatGrowthScreen";
import { GroupMissionScreen } from "./components/GroupMissionScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { GroupChatScreen } from "./components/GroupChatScreen";
import { AddRoutineScreen } from "./components/AddRoutineScreen";
import { RoutineManageScreen } from "./components/RoutineManageScreen";
import { GachaScreen } from "./components/GachaScreen";
import { AuthScreen } from "./components/AuthScreen";
import { SignupScreen } from "./components/SignupScreen";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { HouseSearchScreen } from "./components/HouseSearchScreen";
import { CreateHouseScreen } from "./components/CreateHouseScreen";
import { BottomNav, BottomNavTab } from "./components/BottomNav";
import { DEFAULT_OWNED_FURNITURE_IDS } from "./components/furniture";

type Screen =
  | "routine"
  | "decor"
  | "groupHouse"
  | "myRoom"
  | "friendRoom"
  | "growth"
  | "mission"
  | "settings"
  | "groupChat"
  | "addRoutine"
  | "routineManage"
  | "gacha"
  | "auth"
  | "signup"
  | "onboarding"
  | "houseSearch"
  | "createHouse";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("auth");
  const [placedFurniture, setPlacedFurniture] = useState<Set<string>>(
    new Set(["hanok-bed", "hanok-shelf", "hanok-window", "hanok-drawer", "hanok-armchair", "hanok-plant", "hanok-rug", "hanok-teatable"])
  );
  const [wallpaperId, setWallpaperId] = useState<string>("beige");
  const [ownedFurniture, setOwnedFurniture] = useState<Set<string>>(
    () => new Set(DEFAULT_OWNED_FURNITURE_IDS)
  );
  const [visitingFriend, setVisitingFriend] = useState<string>("");
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
  const [routines, setRoutines] = useState<Routine[]>([
    { id: "1", title: "\uC544\uCE68 7\uC2DC \uAE30\uC0C1", completed: true, emoji: "\u23F0", category: "\uC77C\uC815", alarmEnabled: true, time: "07:00" },
    { id: "2", title: "\uB3C5\uC11C 30\uBD84", completed: true, emoji: "\uD83D\uDCDA", category: "\uCDE8\uBBF8", alarmEnabled: true, time: "21:30", photoVerify: true },
    { id: "3", title: "\uBB3C 2L \uB9C8\uC2DC\uAE30", completed: true, emoji: "\uD83D\uDCA7", category: "\uAC74\uAC15", alarmEnabled: false, time: "12:00" },
    { id: "4", title: "\uC601\uC5B4 \uACF5\uBD80", completed: false, emoji: "\u270F\uFE0F", category: "\uACF5\uBD80", alarmEnabled: true, time: "20:00", photoVerify: true },
    { id: "5", title: "\uD558\uB8E8 \uD68C\uACE0", completed: false, emoji: "\uD83D\uDCDD", category: "\uC77C\uC815", alarmEnabled: true, time: "23:00" },
  ]);

  const [categories, setCategories] = useState<RoutineCategoryMeta[]>(
    () => [...ROUTINE_CATEGORIES]
  );

  const toggleRoutine = (id: string) =>
    setRoutines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );

  const createCategory = (cat: RoutineCategoryMeta) =>
    setCategories((prev) => [...prev, cat]);

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    // Orphaned routines fall back to "疫꿸퀬?"
    setRoutines((prev) =>
      prev.map((r) => (r.category === id ? { ...r, category: "疫꿸퀬?" } : r))
    );
  };

  const tabForScreen: Record<Screen, BottomNavTab | null> = {
    routine: "myRoom",
    decor: "myRoom",
    myRoom: "myRoom",
    friendRoom: "house",
    groupHouse: "house",
    growth: "myRoom",
    mission: "house",
    settings: "settings",
    groupChat: "house",
    addRoutine: "myRoom",
    routineManage: "myRoom",
    gacha: "myRoom",
    auth: null,
    signup: null,
    onboarding: null,
    houseSearch: "house",
    createHouse: "house",
  };

  const screenForTab: Record<BottomNavTab, Screen> = {
    myRoom: "myRoom",
    house: "groupHouse",
    settings: "settings",
  };

  return (
    <div className="size-full flex items-center justify-center bg-[#E8DCC8]">
      <div className="w-full max-w-md h-full bg-[#FBF8F3] relative shadow-2xl overflow-hidden">
        <div className="h-full overflow-y-auto" key={currentScreen}>
          {currentScreen === "routine" && <RoutineScreen />}
          {currentScreen === "decor" && (
            <RoomDecorScreen
              onBack={() => setCurrentScreen("myRoom")}
              initialPlaced={placedFurniture}
              initialWallpaperId={wallpaperId}
              owned={ownedFurniture}
              onApply={(next, wp) => {
                setPlacedFurniture(next);
                setWallpaperId(wp);
              }}
            />
          )}
          {currentScreen === "groupHouse" && (
            <GroupHouseScreen
              onVisitFriend={(name) => {
                setVisitingFriend(name);
                setCurrentScreen("friendRoom");
              }}
              onVisitMyRoom={() => setCurrentScreen("myRoom")}
              onOpenChat={() => setCurrentScreen("groupChat")}
              onOpenSearch={() => setCurrentScreen("houseSearch")}
              placedFurniture={placedFurniture}
              wallpaperId={wallpaperId}
            />
          )}
          {currentScreen === "groupChat" && (
            <GroupChatScreen onBack={() => setCurrentScreen("groupHouse")} />
          )}
          {currentScreen === "myRoom" && (
            <MyRoomZoomScreen
              onEdit={() => setCurrentScreen("decor")}
              onAddRoutine={() => setCurrentScreen("routineManage")}
              onOpenGacha={() => setCurrentScreen("gacha")}
              placedFurniture={placedFurniture}
              wallpaperId={wallpaperId}
              routines={routines}
              categories={categories}
              onToggleRoutine={toggleRoutine}
              onQuickAddRoutine={(category, title) =>
                setRoutines((prev) => [
                  ...prev,
                  {
                    id: `r-${Date.now()}`,
                    title,
                    completed: false,
                    category,
                    kind: "todo",
                  },
                ])
              }
              onRenameRoutine={(id, title) =>
                setRoutines((prev) =>
                  prev.map((r) => (r.id === id ? { ...r, title } : r))
                )
              }
              onDeleteRoutine={(id) =>
                setRoutines((prev) => prev.filter((r) => r.id !== id))
              }
            />
          )}
          {currentScreen === "routineManage" && (
            <RoutineManageScreen
              routines={routines.filter((routine) => routine.kind !== "todo")}
              categories={categories}
              onBack={() => setCurrentScreen("myRoom")}
              onAdd={() => {
                setEditingRoutine(null);
                setCurrentScreen("addRoutine");
              }}
              onEdit={(r) => {
                setEditingRoutine(r);
                setCurrentScreen("addRoutine");
              }}
            />
          )}
          {currentScreen === "addRoutine" && (
            <AddRoutineScreen
              onBack={() => setCurrentScreen("routineManage")}
              categories={categories}
              onCreateCategory={createCategory}
              onDeleteCategory={deleteCategory}
              editRoutine={editingRoutine}
              onAdd={(r) =>
                setRoutines((prev) => [
                  ...prev,
                  {
                    id: `r-${Date.now()}`,
                    title: r.title,
                    completed: false,
                    emoji: r.emoji,
                    category: r.category,
                    days: r.days,
                    startDate: r.startDate,
                    endDate: r.endDate,
                    alarmEnabled: r.alarmEnabled,
                    time: r.time,
                    photoVerify: r.photoVerify,
                    kind: "routine",
                  },
                ])
              }
              onUpdate={(id, r) =>
                setRoutines((prev) =>
                  prev.map((item) =>
                    item.id === id
                      ? {
                          ...item,
                          title: r.title,
                          emoji: r.emoji,
                          category: r.category,
                          days: r.days,
                          startDate: r.startDate,
                          endDate: r.endDate,
                          alarmEnabled: r.alarmEnabled,
                          time: r.time,
                          photoVerify: r.photoVerify,
                        }
                      : item
                  )
                )
              }
              onDelete={(id) =>
                setRoutines((prev) => prev.filter((r) => r.id !== id))
              }
            />
          )}
          {currentScreen === "friendRoom" && (
            <FriendRoomScreen
              onBack={() => setCurrentScreen("groupHouse")}
              friendName={visitingFriend}
            />
          )}
          {currentScreen === "auth" && (
            <AuthScreen
              onAuthSuccess={() => setCurrentScreen("onboarding")}
              onGoSignup={() => setCurrentScreen("signup")}
            />
          )}
          {currentScreen === "signup" && (
            <SignupScreen
              onBack={() => setCurrentScreen("auth")}
              onSignupSuccess={() => setCurrentScreen("onboarding")}
            />
          )}
          {currentScreen === "onboarding" && (
            <OnboardingScreen onDone={() => setCurrentScreen("myRoom")} />
          )}
          {currentScreen === "houseSearch" && (
            <HouseSearchScreen
              onBack={() => setCurrentScreen("groupHouse")}
              onJoin={() => setCurrentScreen("groupHouse")}
              onCreate={() => setCurrentScreen("createHouse")}
            />
          )}
          {currentScreen === "createHouse" && (
            <CreateHouseScreen
              onBack={() => setCurrentScreen("houseSearch")}
              onCreate={() => setCurrentScreen("groupHouse")}
            />
          )}
          {currentScreen === "gacha" && (
            <GachaScreen
              onBack={() => setCurrentScreen("myRoom")}
              onObtain={(ids) =>
                setOwnedFurniture((prev) => new Set([...prev, ...ids]))
              }
            />
          )}
          {currentScreen === "growth" && <CatGrowthScreen />}
          {currentScreen === "mission" && <GroupMissionScreen />}
          {currentScreen === "settings" && <SettingsScreen />}
        </div>

        {tabForScreen[currentScreen] && (
          <BottomNav
            active={tabForScreen[currentScreen]!}
            onChange={(tab) => setCurrentScreen(screenForTab[tab])}
          />
        )}
      </div>
    </div>
  );
}
