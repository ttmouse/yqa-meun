import Icon from './Icon'

export default function ContentArea({ scheme }) {
  if (!scheme) return null

  return (
    <main className="flex-1 flex flex-col bg-[#f8fafb] min-w-0">
      {/* Top bar */}
      <div className="flex items-center justify-between h-14 px-6 border-b border-slate-200/70 bg-white shrink-0">
        {/* Current organization — left side */}
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-slate-400">当前组织</span>
          <span className="text-slate-800 font-medium">良渚应急消防管理站</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-slate-400 ml-0.5">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Right side: entrance items + login */}
        <div className="flex items-center gap-5">
        {/* Entrance items — right aligned */}
        {[
          { id: 'messages', label: '消息中心', icon: 'BellIcon' },
          { id: 'guide', label: '操作指引', icon: 'ReaderIcon' },
          { id: 'service', label: '在线客服', icon: 'ChatBubbleIcon' },
          { id: 'download', label: '下载中心', icon: 'DownloadIcon' },
          { id: 'ai', label: 'AI助手', icon: 'RocketIcon' },
        ].map((item) => (
          <button
            key={item.id}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors py-1"
          >
            <Icon name={item.icon} size={15} />
            <span>{item.label}</span>
          </button>
        ))}
        {/* Login account */}
        <div className="flex items-center gap-2 pl-5 border-l border-slate-200">
          <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-[11px] font-semibold text-emerald-600">张</span>
          </div>
          <span className="text-sm text-slate-700 font-medium">张明</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-slate-300">
            <path d="M2.5 3.5L5 6.5L7.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* ===== 方案逻辑说明 ===== */}
          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-3">{scheme.logicTitle}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{scheme.logic}</p>
          </section>

          {/* ===== 说明点 ===== */}
          <section>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">说明</h3>
            <ul className="space-y-2.5">
              {scheme.points.map((point, i) => {
                const [num, ...rest] = point.split(' ')
                const text = rest.join(' ')
                return (
                  <li key={i} className="flex gap-2.5 text-sm text-slate-600 leading-relaxed">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>{text}</span>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* ===== 调整方向 ===== */}
          <section>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">调整方向</h3>
            <div className="flex flex-wrap gap-2">
              {scheme.direction.split('｜').map((d, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-600">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {d.trim()}
                </span>
              ))}
            </div>
          </section>

          {/* ===== 结构总览 ===== */}
          <section>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">结构总览</h3>
            <div className="bg-white rounded-xl border border-slate-200/70 overflow-hidden shadow-[0_1px_3px_-2px_rgba(0,0,0,0.05)]">
              {scheme.nav.map((group, gi) => (
                group.title ? (
                  <div key={gi}>
                    <div className="px-5 py-2.5 bg-slate-50/80 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {group.title}
                    </div>
                    <div className="px-5 py-2 border-b border-slate-50 last:border-0">
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {group.items.map((item) => (
                          <span key={item.id} className="text-sm text-slate-700 py-0.5">
                            {item.label}
                            {item.badge && (
                              <span className="ml-1 text-[10px] text-red-500 font-medium">({item.badge})</span>
                            )}
                            {item.deprecated && (
                              <span className="ml-1 text-[10px] text-slate-400">(老页面，下线)</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={gi} className="px-5 py-2 border-b border-slate-50 last:border-0">
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {group.items.map((item) => (
                        <span key={item.id} className="text-sm text-slate-700 py-0.5">
                          {item.label}
                          {item.children && (
                            <span className="ml-1 text-[11px] text-slate-400">
                              → {item.children.map(c => c.label).join('、')}
                            </span>
                          )}
                          {item.badge && (
                            <span className="ml-1 text-[10px] text-red-500 font-medium">({item.badge})</span>
                          )}
                          {item.deprecated && (
                            <span className="ml-1 text-[10px] text-slate-400">(老页面，下线)</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
