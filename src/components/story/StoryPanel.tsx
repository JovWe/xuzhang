import { useGameStore } from '@/store/gameStore';
import prologueData from '@/data/prologue';
import Typewriter from '@/components/ui/Typewriter';
import FadeIn from '@/components/ui/FadeIn';

export default function StoryPanel() {
  const {
    displayedSegments,
    currentSegmentIndex,
    isTyping,
    setTyping,
    advanceSegment,
    interactionPhase,
    isInteractionComplete,
  } = useGameStore();

  const segments = prologueData.storySegments;
  const currentSegment = segments[currentSegmentIndex];

  const handleAdvance = () => {
    if (isTyping) return;
    if (currentSegmentIndex >= segments.length - 1) return;

    // Check if current segment requires interaction to be completed
    if (currentSegment?.waitForInteraction && !isInteractionComplete) {
      return;
    }

    advanceSegment();
  };

  const handleTypingComplete = () => {
    setTyping(false);
  };

  // Check if we need to show the "click to continue" prompt
  const canAdvance =
    !isTyping &&
    currentSegmentIndex < segments.length - 1 &&
    (!currentSegment?.waitForInteraction || isInteractionComplete);

  const isLastSegment = currentSegmentIndex >= segments.length - 1;

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: 'var(--color-ink)' }}>
      {/* 剧情文本区域 */}
      <div className="flex-1 overflow-y-auto px-10 py-8">
        <div className="max-w-lg mx-auto">
          {/* 已显示的段落 */}
          {segments.slice(0, displayedSegments).map((seg) => (
            <FadeIn key={seg.id} delay={0.1} duration={0.4}>
              <p
                className="text-base leading-[2] mb-4"
                style={{ color: 'var(--color-paper)', opacity: 0.85 }}
              >
                {seg.text}
              </p>
            </FadeIn>
          ))}

          {/* 当前正在打的段落 */}
          {currentSegment && currentSegmentIndex === displayedSegments && (
            <FadeIn delay={0.2}>
              <p
                className="text-base leading-[2]"
                style={{ color: 'var(--color-paper)' }}
              >
                <Typewriter
                  text={currentSegment.text}
                  speed={35}
                  onComplete={handleTypingComplete}
                />
              </p>
            </FadeIn>
          )}

          {/* 互动触发提示 */}
          {currentSegment?.waitForInteraction && !isInteractionComplete && interactionPhase === 'idle' && (
            <FadeIn delay={0.5}>
              <p className="text-sm mt-6 italic" style={{ color: 'var(--color-amber-dim)' }}>
                等待接听来电……
              </p>
            </FadeIn>
          )}

          {currentSegment?.waitForInteraction && isInteractionComplete && (
            <FadeIn delay={0.3}>
              <p className="text-sm mt-6 italic" style={{ color: 'var(--color-amber)' }}>
                通话已结束，点击继续……
              </p>
            </FadeIn>
          )}
        </div>
      </div>

      {/* 底部继续提示 */}
      <div className="h-20 flex items-center justify-center border-t border-amber-900/10">
        {isLastSegment && !isTyping ? (
          <p className="text-sm tracking-widest" style={{ color: 'var(--color-amber)', opacity: 0.7 }}>
            —— 序章完 ——
          </p>
        ) : canAdvance ? (
          <button
            onClick={handleAdvance}
            className="text-sm tracking-widest animate-breathe cursor-pointer transition-colors hover:opacity-100"
            style={{ color: 'var(--color-amber)', opacity: 0.7 }}
          >
            点击继续
          </button>
        ) : (
          <span className="text-sm tracking-widest" style={{ color: 'var(--color-amber)', opacity: 0.3 }}>
            {isTyping ? '...' : ''}
          </span>
        )}
      </div>
    </div>
  );
}