import { useGameStore } from '@/store/gameStore';
import prologueData from '@/data/prologue';
import { Phone, PhoneOff, Volume2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function PhoneScene() {
  const {
    activeInteraction,
    interactionPhase,
    dialogueIndex,
    isInteractionComplete,
    setInteractionPhase,
    advanceDialogue,
    completeInteraction,
  } = useGameStore();

  const interaction = activeInteraction ? prologueData.interactions[activeInteraction] : null;
  const dialogues = interaction?.dialogues || [];
  const currentDialogue = dialogues[dialogueIndex];

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [dialogueIndex, interactionPhase]);

  const handleAnswer = () => {
    setInteractionPhase('connected');
    setTimeout(() => {
      setInteractionPhase('chatting');
    }, 300);
  };

  const handleAdvanceChat = () => {
    if (dialogueIndex < dialogues.length - 1) {
      advanceDialogue();
    } else {
      completeInteraction();
    }
  };

  const getBubbleStyle = (speaker: string) => {
    switch (speaker) {
      case 'caller':
        return {
          bg: 'rgba(201, 169, 110, 0.1)',
          border: '1px solid rgba(201, 169, 110, 0.2)',
          color: 'var(--color-paper)',
          align: 'self-start',
        };
      case 'player':
        return {
          bg: 'rgba(201, 169, 110, 0.2)',
          border: '1px solid rgba(201, 169, 110, 0.3)',
          color: 'var(--color-paper)',
          align: 'self-end',
        };
      case 'system':
        return {
          bg: 'transparent',
          border: 'none',
          color: 'var(--color-slate)',
          align: 'self-center',
        };
      default:
        return {
          bg: 'rgba(201, 169, 110, 0.1)',
          border: '1px solid rgba(201, 169, 110, 0.2)',
          color: 'var(--color-paper)',
          align: 'self-start',
        };
    }
  };

  return (
    <div className="h-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-ink)' }}>
      {/* 手机模型 */}
      <div
        className="w-[300px] rounded-[2.5rem] border-2 border-amber-900/20 overflow-hidden"
        style={{
          backgroundColor: 'var(--color-ink-light)',
          boxShadow: '0 0 40px rgba(201, 169, 110, 0.08), 0 0 80px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* 顶部状态栏 */}
        <div className="h-10 flex items-center justify-between px-6 pt-2">
          <span className="text-xs" style={{ color: 'var(--color-slate)' }}>21:47</span>
          <div className="flex items-center gap-1">
            <Volume2 size={12} style={{ color: 'var(--color-slate)' }} />
          </div>
        </div>

        {/* 屏幕内容 */}
        <div className="h-[420px] flex flex-col">
          {/* 来电显示区域 */}
          {interactionPhase === 'ringing' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-6 animate-ring">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(201, 169, 110, 0.1)' }}
              >
                <Phone size={28} style={{ color: 'var(--color-amber)' }} />
              </div>

              <div className="text-center">
                <p className="text-lg font-semibold mb-1" style={{ color: 'var(--color-paper)' }}>
                  {interaction?.callerName}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-slate)' }}>
                  {interaction?.callerNumber}
                </p>
              </div>

              <p className="text-xs animate-breathe" style={{ color: 'var(--color-amber)' }}>
                来电中……
              </p>
            </div>
          )}

          {/* 通话中 - 聊天区域 */}
          {(interactionPhase === 'connected' || interactionPhase === 'chatting') && (
            <div className="flex-1 flex flex-col p-4">
              {/* 通话状态 */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500/60 animate-breathe" />
                <span className="text-xs" style={{ color: 'var(--color-slate)' }}>
                  通话中 00:{String(Math.floor(dialogueIndex * 5)).padStart(2, '0')}
                </span>
              </div>

              {/* 对话气泡 */}
              <div
                ref={chatContainerRef}
                className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1"
                onClick={handleAdvanceChat}
              >
                {dialogues.slice(0, dialogueIndex + 1).map((d, i) => {
                  const style = getBubbleStyle(d.speaker);
                  const isLast = i === dialogueIndex;
                  return (
                    <div
                      key={d.id}
                      className={`${style.align} max-w-[85%]`}
                      style={{
                        opacity: isLast ? 1 : 0.5,
                        transition: 'opacity 0.3s',
                      }}
                    >
                      <div
                        className="rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                        style={{
                          backgroundColor: style.bg,
                          border: style.border,
                          color: style.color,
                          borderBottomLeftRadius: d.speaker === 'caller' ? '4px' : undefined,
                          borderBottomRightRadius: d.speaker === 'player' ? '4px' : undefined,
                        }}
                      >
                        {d.text}
                      </div>
                    </div>
                  );
                })}

                {/* 点击继续提示 */}
                {dialogueIndex < dialogues.length && (
                  <div className="self-center mt-2">
                    <span className="text-xs animate-breathe" style={{ color: 'var(--color-amber-dim)' }}>
                      点击继续
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 通话已结束 */}
          {interactionPhase === 'ended' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(139, 46, 46, 0.15)' }}
              >
                <PhoneOff size={22} style={{ color: 'var(--color-crimson)' }} />
              </div>
              <p className="text-sm" style={{ color: 'var(--color-slate)' }}>
                通话已结束
              </p>
              <p className="text-xs" style={{ color: 'var(--color-amber-dim)' }}>
                查看左侧剧情继续……
              </p>
            </div>
          )}

          {/* 默认状态 */}
          {interactionPhase === 'idle' && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm" style={{ color: 'var(--color-slate)', opacity: 0.5 }}>
                {activeInteraction ? '准备中……' : '暂无来电'}
              </p>
            </div>
          )}
        </div>

        {/* 底部操作区 */}
        <div className="h-16 flex items-center justify-center gap-8 px-8 border-t border-amber-900/10">
          {/* 挂断按钮 */}
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer"
            style={{
              backgroundColor: 'rgba(139, 46, 46, 0.2)',
              opacity: interactionPhase === 'ringing' || interactionPhase === 'chatting' ? 1 : 0.3,
            }}
            onClick={completeInteraction}
            disabled={interactionPhase !== 'ringing' && interactionPhase !== 'chatting'}
          >
            <PhoneOff size={18} style={{ color: 'var(--color-crimson)' }} />
          </button>

          {/* 接听按钮 */}
          {interactionPhase === 'ringing' && (
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center animate-breathe cursor-pointer"
              style={{ backgroundColor: 'rgba(201, 169, 110, 0.2)' }}
              onClick={handleAnswer}
            >
              <Phone size={18} style={{ color: 'var(--color-amber)' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}