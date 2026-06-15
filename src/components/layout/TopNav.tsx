import { Settings } from 'lucide-react';
import prologueData from '@/data/prologue';

export default function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-black/40 backdrop-blur-md border-b border-amber-900/20">
      <div className="h-full max-w-[1440px] mx-auto px-6 flex items-center justify-between">
        {/* 左侧：游戏标题 */}
        <div className="flex items-center gap-3">
          <h1
            className="font-['Noto_Serif_SC'] text-2xl font-bold tracking-[0.3em]"
            style={{ color: 'var(--color-amber)' }}
          >
            {prologueData.title}
          </h1>
          <div className="w-px h-5 bg-amber-900/30" />
        </div>

        {/* 中间：章节名 */}
        <span
          className="text-sm tracking-wider font-['Noto_Serif_SC']"
          style={{ color: 'var(--color-slate)' }}
        >
          {prologueData.chapterTitle}
        </span>

        {/* 右侧：设置按钮（预留） */}
        <button
          className="p-2 rounded-md opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
          style={{ color: 'var(--color-slate)' }}
          title="设置"
        >
          <Settings size={18} />
        </button>
      </div>
    </nav>
  );
}