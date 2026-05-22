export default function TopBar({ proposals, activeId, onSwitch }) {
  return (
    <header className="h-12 bg-white border-b border-slate-200/70 flex items-center px-4 gap-0 shrink-0">
      <div className="flex items-center gap-1">
        {proposals.map((p, i) => (
          <div key={p.id} className="flex items-center">
            {i > 0 && <div className="w-px h-4 bg-slate-200 mx-1" />}
            <button
              onClick={() => onSwitch(p.id)}
              className={`
                px-3 py-1.5 text-sm rounded-lg transition-all duration-150 font-medium
                ${activeId === p.id
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }
              `}
            >
              {p.label}
            </button>
          </div>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-[11px] text-slate-400 tabular-nums">v2.0 · 导航重构提案</span>
      </div>
    </header>
  )
}
