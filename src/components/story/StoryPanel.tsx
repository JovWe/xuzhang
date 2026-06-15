import { useGameStore } from '@/store/gameStore';
import prologueData from '@/data/prologue';
import Typewriter from '@/components/ui/Typewriter';
import FadeIn from '@/components/ui/FadeIn';
import { Compass, Settings } from 'lucide-react';

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

    if (currentSegment?.waitForInteraction && !isInteractionComplete) {
      return;
    }

    advanceSegment();
  };

  const handleTypingComplete = () => {
    setTyping(false);
  };

  const canAdvance =
    !isTyping &&
    currentSegmentIndex < segments.length - 1 &&
    (!currentSegment?.waitForInteraction || isInteractionComplete);

  const isLastSegment = currentSegmentIndex >= segments.length - 1;

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* 左侧装饰竖线 */}
      <div className="absolute left-6 top-14 bottom-0 w-px" style={{ backgroundColor: 'var(--color-line)' }} />

      {/* 装饰图标 */}
      <div className="absolute left-3 top-20 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <Compass size={16} style={{ color: 'var(--color-text-muted)' }} />
      </div>
      <div className="absolute left-3 bottom-20 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <Settings size={16} style={{ color: 'var(--color-text-muted)' }} />
      </div>

      {/* 剧情文本区域 */}
      <div className="flex-1 overflow-y-auto pl-16 pr-10 py-8">
        <div className="max-w-lg">
          {/* 已显示的段落 */}
          {segments.slice(0, displayedSegments).map((seg) => (
            <FadeIn key={seg.id} delay={0.1} duration={0.4}>
              <p
                className="text-base leading-[2.2] mb-5"
                style={{ color: 'var(--color-text)' }}
              >
                {seg.text}
              </p>
            </FadeIn>
          ))}

          {/* 当前正在打的段落 */}
          {currentSegment && currentSegmentIndex === displayedSegments && (
            <FadeIn delay={0.2}>
              <p
                className="text-base leading-[2.2]"
                style={{ color: 'var(--color-text)' }}
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
              <p className="text-sm mt-6 italic" style={{ color: 'var(--color-text-muted)' }}>
                等待接听来电……
              </p>
            </FadeIn>
          )}

          {currentSegment?.waitForInteraction && isInteractionComplete && (
            <FadeIn delay={0.3}>
              <p className="text-sm mt-6 italic" style={{ color: 'var(--color-text-secondary)' }}>
                通话已结束，点击继续……
              </p>
            </FadeIn>
          )}
        </div>
      </div>

      {/* 底部继续提示 */}
      <div className="h-16 flex items-center justify-center pl-16">
        {isLastSegment && !isTyping ? (
          <p className="text-sm tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
            —— 序章完 ——
          </p>
        ) : canAdvance ? (
          <button
            onClick={handleAdvance}
            className="text-sm tracking-widest animate-breathe cursor-pointer transition-colors hover:opacity-100"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            点击继续
          </button>
        ) : (
          <span className="text-sm tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
            {isTyping ? '...' : ''}
          </span>
        )}
      </div>
    </div>
  );
}
