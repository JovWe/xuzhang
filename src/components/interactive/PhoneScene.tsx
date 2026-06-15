import { useGameStore } from '@/store/gameStore';
import prologueData from '@/data/prologue';
import { Phone, PhoneOff, ChevronLeft, MoreHorizontal, Signal, Wifi, Battery } from 'lucide-react';
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

  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="h-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* 手机模型 */}
      <div
        className="w-[320px] rounded-[2.5rem] border-2 overflow-hidden"
        style={{
          backgroundColor: '#1a1a1a',
          borderColor: '#333333',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* 顶部刘海区域 */}
        <div className="h-7 flex items-center justify-center relative" style={{ backgroundColor: '#1a1a1a' }}>
          <div className="w-20 h-5 rounded-full" style={{ backgroundColor: '#1a1a1a' }} />
        </div>

        {/* 状态栏 */}
        <div className="h-6 flex items-center justify-between px-6" style={{ backgroundColor: 'var(--color-wechat-header)' }}>
          <span className="text-[10px] font-medium" style={{ color: 'var(--color-text)' }}>18:30</span>
          <div className="flex items-center gap-1">
            <Signal size={12} style={{ color: 'var(--color-text)' }} />
            <Wifi size={12} style={{ color: 'var(--color-text)' }} />
            <Battery size={12} style={{ color: 'var(--color-text)' }} />
          </div>
        </div>

        {/* 微信聊天头部 */}
        <div className="h-11 flex items-center justify-between px-4" style={{ backgroundColor: 'var(--color-wechat-header)', borderBottom: '1px solid #d5d3cf' }}>
          <div className="flex items-center gap-1">
            <ChevronLeft size={18} style={{ color: 'var(--color-text)' }} />
            <span className="text-sm" style={{ color: 'var(--color-text)' }}>微信</span>
          </div>
          <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
            {interaction?.callerName || '微信'}
          </span>
          <MoreHorizontal size={18} style={{ color: 'var(--color-text)' }} />
        </div>

        {/* 屏幕内容 */}
        <div className="h-[420px] flex flex-col" style={{ backgroundColor: 'var(--color-wechat-bg)' }}>
          {/* 来电显示区域 */}
          {interactionPhase === 'ringing' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-6 animate-ring">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(149, 236, 105, 0.2)' }}
              >
                <Phone size={28} style={{ color: '#07c160' }} />
              </div>

              <div className="text-center">
                <p className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                  {interaction?.callerName}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {interaction?.callerNumber}
                </p>
              </div>

              <p className="text-xs animate-breathe" style={{ color: '#07c160' }}>
                语音来电中……
              </p>
            </div>
          )}

          {/* 微信聊天区域 */}
          {(interactionPhase === 'connected' || interactionPhase === 'chatting') && (
            <div className="flex-1 flex flex-col">
              {/* 聊天内容 */}
              <div
                ref={chatContainerRef}
                className="flex-1 flex flex-col gap-3 overflow-y-auto px-3 py-4"
                onClick={handleAdvanceChat}
              >
                {dialogues.slice(0, dialogueIndex + 1).map((d, i) => {
                  const isLast = i === dialogueIndex;
                  const isPlayer = d.speaker === 'player';
                  const isSystem = d.speaker === 'system';

                  if (isSystem) {
                    return (
                      <div key={d.id} className="self-center">
                        <span className="text-[11px] px-3 py-1 rounded" style={{ color: '#999', backgroundColor: '#dadada' }}>
                          {d.text}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={d.id}
                      className={`flex gap-2 ${isPlayer ? 'flex-row-reverse' : 'flex-row'}`}
                      style={{ opacity: isLast ? 1 : 0.7, transition: 'opacity 0.3s' }}
                    >
                      {/* 头像 */}
                      <div
                        className="w-9 h-9 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor: isPlayer ? '#07c160' : '#e0e0e0',
                          color: isPlayer ? '#fff' : '#666',
                        }}
                      >
                        {isPlayer ? '我' : '妈'}
                      </div>

                      {/* 气泡 */}
                      <div
                        className="max-w-[70%] px-3 py-2 rounded text-sm leading-relaxed relative"
                        style={{
                          backgroundColor: isPlayer ? 'var(--color-green)' : '#fff',
                          color: 'var(--color-green-text)',
                          border: isPlayer ? 'none' : '1px solid #e0e0e0',
                        }}
                      >
                        {d.text}
                        {/* 小三角 */}
                        <div
                          className="absolute top-3 w-2 h-2 rotate-45"
                          style={{
                            backgroundColor: isPlayer ? 'var(--color-green)' : '#fff',
                            [isPlayer ? 'right' : 'left']: '-4px',
                            border: isPlayer ? 'none' : '1px solid #e0e0e0',
                            borderTop: 'none',
                            borderRight: isPlayer ? 'none' : '1px solid #e0e0e0',
                            borderBottom: isPlayer ? '1px solid var(--color-green)' : 'none',
                            borderLeft: isPlayer ? '1px solid var(--color-green)' : 'none',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* 点击继续提示 */}
                {dialogueIndex < dialogues.length && (
                  <div className="self-center mt-2">
                    <span className="text-[11px] animate-breathe" style={{ color: 'var(--color-text-muted)' }}>
                      点击继续
                    </span>
                  </div>
                )}
              </div>

              {/* 底部输入栏 */}
              <div className="h-12 flex items-center gap-2 px-3 border-t" style={{ backgroundColor: '#f7f7f7', borderColor: '#e0e0e0' }}>
                <div className="flex-1 h-8 rounded bg-white border flex items-center px-3" style={{ borderColor: '#e0e0e0' }}>
                  <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>点击继续对话...</span>
                </div>
              </div>
            </div>
          )}

          {/* 通话已结束 */}
          {interactionPhase === 'ended' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
              >
                <PhoneOff size={22} style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                通话已结束
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                查看左侧剧情继续……
              </p>
            </div>
          )}

          {/* 默认状态 */}
          {interactionPhase === 'idle' && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm" style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}>
                {activeInteraction ? '准备中……' : '暂无消息'}
              </p>
            </div>
          )}
        </div>

        {/* 底部 home bar */}
        <div className="h-5 flex items-center justify-center" style={{ backgroundColor: '#1a1a1a' }}>
          <div className="w-28 h-1 rounded-full" style={{ backgroundColor: '#333' }} />
        </div>
      </div>
    </div>
  );
}
