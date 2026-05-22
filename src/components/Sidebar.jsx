import { useState } from 'react'
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

  return (
    <>
      <button
        onClick={handleClick}
        className={`
          group relative flex w-full items-center gap-2.5 py-2 pr-3 text-left text-sm
          transition-all duration-150 ease-out font-medium
          ${isActive
            ? 'text-emerald-600'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }
        `}
        style={{ paddingLeft: padLeft }}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-emerald-500 rounded-r-full" />
        )}
        {depth === 0 && item.icon && (
          <span className={`shrink-0 transition-colors duration-150 ${
            isActive ? 'text-emerald-500' : 'text-slate-400'
          }`}>
            <Icon name={item.icon} size={16} />
          </span>
        )}
        <span className="truncate flex-1">{item.label}</span>
        {item.deprecated && (
          <span className="shrink-0 text-[10px] text-slate-400 ml-1 whitespace-nowrap">老页面，下线</span>
        )}
        {item.badge && !item.deprecated && (
          <span className="shrink-0 rounded-full bg-red-50 px-1.5 py-0.5 text-[11px] font-medium leading-tight text-red-500 ring-1 ring-red-200/50">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            className={`shrink-0 text-slate-300 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
          >
            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      {hasChildren && (
        <div className={`overflow-hidden transition-all duration-200 ${
          isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
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
      )}
    </>
  )
}

function NavSection({ section, activeId, onSelect, expandedId, onToggle, search }) {
  const visible = section.items.some((item) => matchItem(item, search || ''))
  if (!visible) return null

  return (
    <div>
      {section.title && (
        <div className="px-3 pt-4 pb-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-400">
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

export default function Sidebar({ schemes, scheme, activeKey, activeId, onSelect, onSwitch }) {
  const [expandedId, setExpandedId] = useState(null)
  const [search, setSearch] = useState('')
  const [modeOpen, setModeOpen] = useState(false)

  if (!scheme) return null

  const currentLabel = schemes.find((s) => s.key === activeKey)?.label || ''
  const hasAnyMatch = search
    ? scheme.nav.some((s) => s.items.some((item) => matchItem(item, search)))
    : true

  return (
    <aside className="w-[238px] min-w-[238px] h-full bg-white border-r border-slate-200/70 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-slate-100 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shadow-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 10L7 13L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-sm font-semibold text-slate-800 tracking-tight">一起安管理后台</span>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="relative">
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          >
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索菜单..."
            className="w-full h-8 pl-8 pr-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-400/30 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll px-2 pb-4">
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
          <div className="px-4 pt-6 text-center text-sm text-slate-400">
            没有匹配的菜单
          </div>
        )}
      </nav>

      {/* Mode switcher — expandable */}
      <div className="border-t border-slate-100">
        <button
          onClick={() => setModeOpen(!modeOpen)}
          className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
        >
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            className={`shrink-0 transition-transform duration-200 ${modeOpen ? 'rotate-90' : ''}`}
          >
            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="flex-1">导航模式</span>
          <span className="text-[10px] text-slate-400 truncate max-w-[100px]">{currentLabel}</span>
        </button>
        {modeOpen && (
          <div className="px-3 pb-2 space-y-0.5">
            {schemes.map((s) => (
              <button
                key={s.key}
                onClick={() => { onSwitch(s.key); setModeOpen(false) }}
                className={`
                  flex w-full items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-all duration-150 text-left
                  ${activeKey === s.key
                    ? 'bg-emerald-50 text-emerald-700 font-medium'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }
                `}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  activeKey === s.key ? 'bg-emerald-500' : 'bg-slate-300'
                }`} />
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
