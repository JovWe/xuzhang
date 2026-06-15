import type { ReactNode } from 'react';

interface GameLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

export default function GameLayout({ leftPanel, rightPanel }: GameLayoutProps) {
  return (
    <div className="flex h-full w-full">
      {/* 左侧：剧情引导区 */}
      <div className="w-[45%] min-w-0 flex-shrink-0 border-r border-amber-900/10">
        {leftPanel}
      </div>

      {/* 右侧：互动场景区 */}
      <div className="flex-1 min-w-0">
        {rightPanel}
      </div>
    </div>
  );
}