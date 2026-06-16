import { Menu, Upload, Copy, Download } from 'lucide-react';

export default function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* 左侧：导航菜单 */}
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-1.5 text-xs tracking-wider cursor-pointer hover:opacity-70 transition-opacity" style={{ color: 'var(--color-text-secondary)' }}>
          <Menu size={14} />
          <span>HOME</span>
        </button>
        <button className="text-xs tracking-wider cursor-pointer hover:opacity-70 transition-opacity" style={{ color: 'var(--color-text)' }}>
          ABOUT
        </button>
        <button className="text-xs tracking-wider cursor-pointer hover:opacity-70 transition-opacity" style={{ color: 'var(--color-text-secondary)' }}>
          INVESTIGATIVE
        </button>
      </div>

      {/* 中间：标题 */}
      <div className="flex flex-col items-center">
        <h1 className="text-sm font-medium tracking-[0.15em]" style={{ color: 'var(--color-text)' }}>
          PROJECT: FINDING
        </h1>
        <span className="text-[10px] tracking-[0.1em]" style={{ color: 'var(--color-text-muted)' }}>
          PROLOGUE: THE SHADOW VOLUME
        </span>
      </div>

      {/* 右侧：操作按钮 */}
      <div className="flex items-center gap-3">
        <button className="p-1.5 rounded cursor-pointer hover:opacity-70 transition-opacity" style={{ color: 'var(--color-text-secondary)' }}>
          <Upload size={16} />
        </button>
        <button className="p-1.5 rounded cursor-pointer hover:opacity-70 transition-opacity" style={{ color: 'var(--color-text-secondary)' }}>
          <Copy size={16} />
        </button>
        <button className="p-1.5 rounded cursor-pointer hover:opacity-70 transition-opacity" style={{ color: 'var(--color-text-secondary)' }}>
          <Download size={16} />
        </button>
      </div>
    </nav>
  );
}
