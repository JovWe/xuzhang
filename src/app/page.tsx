"use client";

import { useEffect } from "react";
import TopNav from "@/components/layout/TopNav";
import GameLayout from "@/components/layout/GameLayout";
import StoryPanel from "@/components/story/StoryPanel";
import PhoneScene from "@/components/interactive/PhoneScene";
import { useGameStore } from "@/store/gameStore";
import prologueData from "@/data/prologue";

export default function Home() {
  const {
    currentSegmentIndex,
    interactionPhase,
    triggerInteraction,
    setPhoneView,
    setInteractionPhase,
    activeInteraction,
  } = useGameStore();

  useEffect(() => {
    const segment = prologueData.storySegments[currentSegmentIndex];
    const triggerId = segment?.triggerInteraction;
    if (triggerId && interactionPhase === "idle" && !activeInteraction) {
      const timer = setTimeout(() => {
        triggerInteraction(triggerId);
        const interaction = prologueData.interactions[triggerId];
        if (interaction?.type === "wechat_chat") {
          setPhoneView("wechat_chat");
          setInteractionPhase("chatting");
        } else if (interaction?.type === "phone_call") {
          setPhoneView("call_screen");
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentSegmentIndex, interactionPhase, activeInteraction, triggerInteraction, setPhoneView, setInteractionPhase]);

  return (
    <div className="h-full w-full flex flex-col" style={{ backgroundColor: "var(--color-bg)" }}>
      <TopNav />
      <div className="flex-1 pt-14">
        <GameLayout
          leftPanel={<StoryPanel />}
          rightPanel={<PhoneScene />}
        />
      </div>
    </div>
  );
}
