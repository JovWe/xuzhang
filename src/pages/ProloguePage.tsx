import { useEffect } from 'react';
import TopNav from '@/components/layout/TopNav';
import GameLayout from '@/components/layout/GameLayout';
import StoryPanel from '@/components/story/StoryPanel';
import PhoneScene from '@/components/interactive/PhoneScene';
import { useGameStore } from '@/store/gameStore';
import prologueData from '@/data/prologue';

export default function ProloguePage() {
  const { currentSegmentIndex, interactionPhase, triggerInteraction } = useGameStore();

  // Watch for segments that trigger interactions
  useEffect(() => {
    const segment = prologueData.storySegments[currentSegmentIndex];
    if (segment?.triggerInteraction && interactionPhase === 'idle') {
      // Small delay to let the typewriter finish
      const timer = setTimeout(() => {
        triggerInteraction(segment.triggerInteraction!);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentSegmentIndex, interactionPhase, triggerInteraction]);

  return (
    <div className="h-full w-full flex flex-col noise-bg ink-wash-bg">
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