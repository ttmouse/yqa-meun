import { useState, useEffect } from 'react'
import Icon from './Icon'

function matchItem(item, q) {
  if (!q) return true
  if (item.label.toLowerCase().includes(q)) return true
  if (item.children) return item.children.some((c) => c.label.toLowerCase().includes(q))
  return false
}

function getMatchedChildren(item, q) {
  if (!q || !item.children) return item.children
  return item.children.filter((c) => c.label.toLowerCase().includes(q))
}

function highlightText(text, query) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-emerald-100 dark:bg-emerald-800/60 text-emerald-800 dark:text-emerald-200 rounded px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

function NavItem({ item, depth, activeId, onSelect, expanded, onToggle, search }) {
  const isActive = activeId === item.id
  const hasChildren = item.children && item.children.length > 0
  const padLeft = depth === 0 ? 12 : 38

  const q = (search || '').toLowerCase()
  const selfMatch = q && item.label.toLowerCase().includes(q)
  const childMatch = q && hasChildren && item.children.some((c) => c.label.toLowerCase().includes(q))
  const visible = !q || selfMatch || childMatch
  const isExpanded = !q ? expanded : (expanded || childMatch)

  if (!visible) return null

  const children = q && !selfMatch && childMatch
    ? getMatchedChildren(item, q)
    : item.children

  const handleClick = () => {
    if (hasChildren) onToggle(item.id)
    onSelect(item.id)
  }

  // Level 0 = first-level menu
  if (depth === 0) {
    return (
      <>
        <button
          onClick={handleClick}
          className={`
            group relative flex w-full items-center gap-2.5 py-2.5 pr-3 text-left text-sm
            transition-all duration-150 ease-out font-medium rounded-lg mb-0.5
            ${isActive
              ? 'text-emerald-600 dark:text-white bg-emerald-50 dark:bg-[#2563eb]'
              : 'text-slate-600 dark:text-[#cbd5e1] hover:bg-slate-50 dark:hover:bg-[#1e293b] dark:hover:text-white'
            }
          `}
          style={{ paddingLeft: padLeft }}
        >
          {item.icon && (
            <span className={`shrink-0 transition-colors duration-150 ${
              isActive ? 'text-emerald-500 dark:text-white' : 'text-slate-400 dark:text-[#94a3b8]'
            }`}>
              <Icon name={item.icon} size={16} />
            </span>
          )}
          <span className="truncate flex-1">{highlightText(item.label, search)}</span>
          {item.deprecated && (
            <span className="shrink-0 text-[10px] text-slate-400 dark:text-slate-500 ml-1 whitespace-nowrap">老页面，下线</span>
          )}
          {item.badge && !item.deprecated && (
            <span className="shrink-0 rounded-full bg-red-50 dark:bg-red-900/50 px-1.5 py-0.5 text-[11px] font-medium leading-tight text-red-500 dark:text-red-400 ring-1 ring-red-200/50 dark:ring-red-800/50">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <svg
              width="12" height="12" viewBox="0 0 12 12" fill="none"
              className={`shrink-0 text-slate-300 dark:text-slate-500 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
            >
              <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
        {hasChildren && (
          <div className={`overflow-hidden transition-all duration-200 ${
            isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="rounded-lg dark:bg-[rgba(2,6,23,0.7)]">
              {children.map((child) => (
                <NavItem
                  key={child.id}
                  item={child}
                  depth={1}
                  activeId={activeId}
                  onSelect={onSelect}
                  search={search}
                />
              ))}
            </div>
          </div>
        )}
      </>
    )
  }

  // depth === 1 = second-level menu
  return (
    <>
      <button
        onClick={() => onSelect(item.id)}
        className={`
          group relative flex w-full items-center gap-2.5 py-2.5 pr-3 text-left text-sm font-medium
          transition-all duration-150 ease-out rounded-md mb-0.5
          ${isActive
            ? 'dark:bg-[#2563eb] dark:text-white bg-emerald-50 text-emerald-600'
            : 'text-slate-600 dark:text-[#94a3b8] hover:bg-slate-50 dark:hover:bg-[#0f172a] dark:hover:text-white'
          }
        `}
        style={{ paddingLeft: padLeft }}
      >
        <span className="truncate flex-1">{highlightText(item.label, search)}</span>
        {item.deprecated && (
          <span className="shrink-0 text-[10px] text-slate-400 dark:text-slate-500 ml-1 whitespace-nowrap">老页面，下线</span>
        )}
        {item.badge && !item.deprecated && (
          <span className="shrink-0 rounded-full bg-red-50 dark:bg-red-900/50 px-1.5 py-0.5 text-[11px] font-medium leading-tight text-red-500 dark:text-red-400 ring-1 ring-red-200/50 dark:ring-red-800/50">
            {item.badge}
          </span>
        )}
      </button>
    </>
  )
}

function NavSection({ section, activeId, onSelect, expandedId, onToggle, search }) {
  const visible = section.items.some((item) => matchItem(item, search || ''))
  if (!visible) return null

  return (
    <div>
      {section.title && (
        <div className="px-3 pt-5 pb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-400 dark:text-slate-500">
            {section.title}
          </span>
        </div>
      )}
      {section.items.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          depth={0}
          activeId={activeId}
          onSelect={onSelect}
          expanded={expandedId === item.id}
          onToggle={(id) => onToggle(id)}
          search={search}
        />
      ))}
    </div>
  )
}

export default function Sidebar({ schemes, scheme, activeKey, activeId, onSelect, onSwitch, dark }) {
  const [expandedId, setExpandedId] = useState(null)
  const [search, setSearch] = useState('')
  const [modeOpen, setModeOpen] = useState(false)

  // 切换方案时折叠所有展开的分组
  useEffect(() => {
    setExpandedId(null)
    setSearch('')
  }, [activeKey])

  if (!scheme) return null

  const currentLabel = schemes.find((s) => s.key === activeKey)?.label || ''
  const hasAnyMatch = search
    ? scheme.nav.some((s) => s.items.some((item) => matchItem(item, search)))
    : true

  return (
    <aside className="w-[238px] min-w-[238px] h-full bg-white dark:bg-[#0f172a] border-r border-slate-200/70 dark:border-[rgba(255,255,255,0.1)] flex flex-col transition-colors duration-200">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-slate-100 dark:border-[rgba(255,255,255,0.1)] shrink-0">
        <div className="w-7 h-7 rounded-lg bg-emerald-500 dark:bg-[#2563eb] flex items-center justify-center shadow-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 10L7 13L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-sm font-semibold text-slate-800 dark:text-white tracking-tight">一起安管理后台</span>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="relative">
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#94a3b8] pointer-events-none"
          >
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索菜单..."
            className="w-full h-8 pl-8 pr-3 text-sm rounded-lg border border-slate-200 dark:border-transparent dark:bg-[rgba(30,41,59,0.9)] dark:text-[#e2e8f0] placeholder:text-slate-400 dark:placeholder:text-[#64748b] bg-slate-50 text-slate-700 focus:outline-none focus:border-emerald-400 dark:focus:border-transparent focus:bg-white dark:focus:bg-[rgba(30,41,59,0.9)] focus:ring-1 focus:ring-emerald-400/30 dark:focus:ring-[rgba(59,130,246,0.4)] transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll px-2 pb-6">
        {scheme.nav.map((section, i) => (
          <NavSection
            key={section.title || `s-${i}`}
            section={section}
            activeId={activeId}
            onSelect={onSelect}
            expandedId={expandedId}
            onToggle={(id) => setExpandedId(expandedId === id ? null : id)}
            search={search}
          />
        ))}
        {search && !hasAnyMatch && (
          <div className="px-4 pt-6 text-center text-sm text-slate-400 dark:text-slate-500">
            没有匹配的菜单
          </div>
        )}
      </nav>

      {/* Mode switcher — dropdown */}
      <div className="relative border-t dark:border-[rgba(255,255,255,0.1)] border-slate-100">
        <button
          onClick={() => setModeOpen(!modeOpen)}
          className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium text-slate-600 dark:text-[#cbd5e1] hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            className="shrink-0 text-slate-400 dark:text-[#94a3b8]"
          >
            <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M4 6H8M6 4V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span className="flex-1 truncate">{currentLabel}</span>
          <svg
            width="10" height="10" viewBox="0 0 10 10" fill="none"
            className={`shrink-0 text-slate-400 dark:text-[#94a3b8] transition-transform duration-200 ${modeOpen ? 'rotate-180' : ''}`}
          >
            <path d="M2.5 3.5L5 6.5L7.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {modeOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setModeOpen(false)} />
            <div className="absolute bottom-full left-2 right-2 mb-1 z-20 bg-white dark:bg-[#0f172a] rounded-lg border border-slate-200 dark:border-[rgba(255,255,255,0.1)] shadow-lg dark:shadow-slate-900/50 py-1">
              {schemes.map((s) => (
                <button
                  key={s.key}
                  onClick={() => { onSwitch(s.key); setModeOpen(false) }}
                  className={`
                    flex w-full items-center gap-2 px-3 py-2 text-xs transition-all duration-150 text-left
                    ${activeKey === s.key
                      ? 'bg-emerald-50 dark:bg-[rgba(59,130,246,0.2)] text-emerald-700 dark:text-white font-medium'
                      : 'text-slate-600 dark:text-[#cbd5e1] hover:bg-slate-50 dark:hover:bg-[#1e293b] hover:text-slate-800 dark:hover:text-white'
                    }
                  `}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    activeKey === s.key ? 'bg-emerald-500 dark:bg-[#2563eb]' : 'bg-slate-300 dark:bg-slate-600'
                  }`} />
                  <span>{s.label}</span>
                  {activeKey === s.key && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-auto text-emerald-500 dark:text-white">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
