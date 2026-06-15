import { useGameStore } from '@/store/gameStore';
import prologueData from '@/data/prologue';
import { Phone, PhoneOff, ChevronLeft, MoreHorizontal, Signal, Wifi, Battery } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function PhoneScene() {
  const {
    activeInteraction,
    interactionPhase,
    dialogueIndex,
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
      {/* 手机外壳 */}
      <div
        className="relative overflow-hidden"
        style={{
          width: '380px',
          borderRadius: '48px',
          backgroundColor: '#1c1c1e',
          padding: '14px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.08)',
        }}
      >
        {/* 侧边按钮 */}
        <div className="absolute -left-[2px] top-28 w-[3px] h-8 rounded-l" style={{ backgroundColor: '#2c2c2e' }} />
        <div className="absolute -left-[2px] top-40 w-[3px] h-14 rounded-l" style={{ backgroundColor: '#2c2c2e' }} />
        <div className="absolute -left-[2px] top-56 w-[3px] h-14 rounded-l" style={{ backgroundColor: '#2c2c2e' }} />
        <div className="absolute -right-[2px] top-44 w-[3px] h-20 rounded-r" style={{ backgroundColor: '#2c2c2e' }} />

        {/* 手机屏幕 */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: '38px',
            backgroundColor: '#000',
          }}
        >
          {/* 刘海 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-end justify-center" style={{ width: '160px', height: '30px', backgroundColor: '#1c1c1e', borderBottomLeftRadius: '18px', borderBottomRightRadius: '18px' }}>
            <div className="w-16 h-1.5 rounded-full mb-2" style={{ backgroundColor: '#2c2c2e' }} />
          </div>

          {/* 状态栏 */}
          <div className="h-11 flex items-end justify-between px-8 pb-1 relative z-10" style={{ backgroundColor: 'var(--color-wechat-header)' }}>
            <span className="text-[13px] font-semibold" style={{ color: 'var(--color-text)' }}>18:30</span>
            <div className="flex items-center gap-1.5">
              <Signal size={16} style={{ color: 'var(--color-text)' }} />
              <Wifi size={16} style={{ color: 'var(--color-text)' }} />
              <Battery size={20} style={{ color: 'var(--color-text)' }} />
            </div>
          </div>

          {/* 微信聊天头部 */}
          <div className="h-12 flex items-center justify-between px-4" style={{ backgroundColor: 'var(--color-wechat-header)', borderBottom: '1px solid #d5d3cf' }}>
            <div className="flex items-center gap-0.5">
              <ChevronLeft size={22} style={{ color: 'var(--color-text)' }} />
              <span className="text-[15px]" style={{ color: 'var(--color-text)' }}>微信</span>
            </div>
            <span className="text-[16px] font-medium" style={{ color: 'var(--color-text)' }}>
              {interaction?.callerName || '微信'}
            </span>
            <MoreHorizontal size={22} style={{ color: 'var(--color-text)' }} />
          </div>

          {/* 屏幕内容 */}
          <div className="flex flex-col" style={{ height: '560px', backgroundColor: 'var(--color-wechat-bg)' }}>
            {/* 来电显示区域 */}
            {interactionPhase === 'ringing' && (
              <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-ring">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(149, 236, 105, 0.2)' }}
                >
                  <Phone size={36} style={{ color: '#07c160' }} />
                </div>

                <div className="text-center">
                  <p className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                    {interaction?.callerName}
                  </p>
                  <p className="text-[15px]" style={{ color: 'var(--color-text-muted)' }}>
                    {interaction?.callerNumber}
                  </p>
                </div>

                <p className="text-[13px] animate-breathe" style={{ color: '#07c160' }}>
                  语音来电中……
                </p>

                {/* 接听按钮 */}
                <button
                  onClick={handleAnswer}
                  className="mt-4 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ backgroundColor: '#07c160' }}
                >
                  <Phone size={28} style={{ color: '#fff' }} />
                </button>
              </div>
            )}

            {/* 微信聊天区域 */}
            {(interactionPhase === 'connected' || interactionPhase === 'chatting') && (
              <div className="flex-1 flex flex-col">
                {/* 聊天内容 */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 flex flex-col gap-4 overflow-y-auto px-4 py-5"
                  onClick={handleAdvanceChat}
                >
                  {dialogues.slice(0, dialogueIndex + 1).map((d, i) => {
                    const isLast = i === dialogueIndex;
                    const isPlayer = d.speaker === 'player';
                    const isSystem = d.speaker === 'system';

                    if (isSystem) {
                      return (
                        <div key={d.id} className="self-center">
                          <span className="text-[13px] px-4 py-1.5 rounded" style={{ color: '#999', backgroundColor: '#dadada' }}>
                            {d.text}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={d.id}
                        className={`flex gap-3 ${isPlayer ? 'flex-row-reverse' : 'flex-row'}`}
                        style={{ opacity: isLast ? 1 : 0.7, transition: 'opacity 0.3s' }}
                      >
                        {/* 头像 */}
                        <div
                          className="w-11 h-11 rounded-lg flex-shrink-0 flex items-center justify-center text-[14px] font-bold"
                          style={{
                            backgroundColor: isPlayer ? '#07c160' : '#e0e0e0',
                            color: isPlayer ? '#fff' : '#666',
                          }}
                        >
                          {isPlayer ? '我' : '妈'}
                        </div>

                        {/* 气泡 */}
                        <div
                          className="max-w-[68%] px-4 py-2.5 rounded-lg text-[15px] leading-relaxed relative"
                          style={{
                            backgroundColor: isPlayer ? 'var(--color-green)' : '#fff',
                            color: 'var(--color-green-text)',
                            border: isPlayer ? 'none' : '1px solid #e0e0e0',
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
                      <span className="text-[13px] animate-breathe" style={{ color: 'var(--color-text-muted)' }}>
                        点击继续
                      </span>
                    </div>
                  )}
                </div>

                {/* 底部输入栏 */}
                <div className="h-14 flex items-center gap-3 px-4 border-t" style={{ backgroundColor: '#f7f7f7', borderColor: '#e0e0e0' }}>
                  <div className="flex-1 h-10 rounded bg-white border flex items-center px-4" style={{ borderColor: '#e0e0e0' }}>
                    <span className="text-[15px]" style={{ color: 'var(--color-text-muted)' }}>点击继续对话...</span>
                  </div>
                </div>
              </div>
            )}

            {/* 通话已结束 */}
            {interactionPhase === 'ended' && (
              <div className="flex-1 flex flex-col items-center justify-center gap-5">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                >
                  <PhoneOff size={26} style={{ color: 'var(--color-text-muted)' }} />
                </div>
                <p className="text-[15px]" style={{ color: 'var(--color-text-muted)' }}>
                  通话已结束
                </p>
                <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
                  查看左侧剧情继续……
                </p>
              </div>
            )}

            {/* 默认状态 */}
            {interactionPhase === 'idle' && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-[15px]" style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}>
                  {activeInteraction ? '准备中……' : '暂无消息'}
                </p>
              </div>
            )}
          </div>

          {/* 底部 home bar */}
          <div className="h-7 flex items-center justify-center" style={{ backgroundColor: '#1c1c1e' }}>
            <div className="w-32 h-1.5 rounded-full" style={{ backgroundColor: '#3a3a3c' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
