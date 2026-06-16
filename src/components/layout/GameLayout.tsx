"use client";

import type { ReactNode } from "react";

interface GameLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

export default function GameLayout({ leftPanel, rightPanel }: GameLayoutProps) {
  return (
    <div className="flex h-full w-full gap-0">
      {/* 左侧：剧情引导区 */}
      <div className="w-[48%] min-w-0 flex-shrink-0 flex flex-col">
        {leftPanel}
      </div>

      {/* 右侧：互动场景区 */}
      <div className="flex-1 min-w-0 flex flex-col">
        {rightPanel}
      </div>
    </div>
  );
}
