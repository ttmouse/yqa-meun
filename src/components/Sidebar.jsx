import { useState } from 'react'
import Icon from './Icon'

function NavItem({ item, depth, activeId, onSelect, expanded, onToggle }) {
  const isActive = activeId === item.id
  const hasChildren = item.children && item.children.length > 0
  const isLeaf = depth === 0 && !hasChildren
  const padLeft = depth === 0 ? 12 : 28

  const handleClick = () => {
    if (hasChildren) {
      onToggle(item.id)
    }
    onSelect(item.id)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`
          group relative flex w-full items-center gap-2.5 py-2 pr-3 text-left text-sm
          transition-all duration-150 ease-out
          ${depth === 0 ? 'font-medium' : 'text-[13px]'}
          ${isActive
            ? 'text-emerald-600 font-medium'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }
        `}
        style={{ paddingLeft: padLeft }}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-emerald-500 rounded-r-full" />
        )}
        {depth === 0 && (
          <span className={`shrink-0 transition-colors duration-150 ${
            isActive ? 'text-emerald-500' : 'text-slate-400 group-hover:text-slate-500'
          }`}>
            <Icon name={item.icon} size={16} />
          </span>
        )}
        <span className="truncate flex-1">{item.label}</span>
        {item.badge && (
          <span className="shrink-0 rounded-full bg-red-50 px-1.5 py-0.5 text-[11px] font-medium leading-tight text-red-500 ring-1 ring-red-200/50">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            className={`shrink-0 text-slate-300 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
          >
            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      {hasChildren && (
        <div className={`overflow-hidden transition-all duration-200 ${
          expanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {item.children.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              depth={1}
              activeId={activeId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </>
  )
}

function NavSection({ section, activeId, onSelect, expandedId, onToggle }) {
  return (
    <div className="pt-4">
      <div className="px-3 pb-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-500">
          {section.title}
        </span>
      </div>
      <div className="space-y-0.5">
        {section.items.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            depth={0}
            activeId={activeId}
            onSelect={onSelect}
            expanded={expandedId === item.id}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  )
}

export default function Sidebar({ proposal, activeId, onSelect }) {
  const [expandedId, setExpandedId] = useState(null)

  if (!proposal) return null

  return (
    <aside className="w-[256px] min-w-[256px] h-full bg-white border-r border-slate-200/70 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 pt-5 pb-3 border-b border-slate-100">
        <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shadow-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 10L7 13L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-sm font-semibold text-slate-800 tracking-tight">智慧消防监管</span>
      </div>

      {/* Proposal label */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            {proposal.label}
          </span>
          <span className="text-[10px] text-slate-300 tabular-nums">
            {countItems(proposal)} 项
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll px-2 pb-6">
        {proposal.sections.map((section) => (
          <NavSection
            key={section.title}
            section={section}
            activeId={activeId}
            onSelect={onSelect}
            expandedId={expandedId}
            onToggle={(id) => setExpandedId(expandedId === id ? null : id)}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
            <Icon name="PersonIcon" size={14} className="text-slate-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-slate-700 truncate">消防大队 · 值班员</div>
            <div className="text-[10px] text-slate-400">liangzhu.gov.cn</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function countItems(proposal) {
  let count = 0
  for (const section of proposal.sections) {
    for (const item of section.items) {
      count++
      if (item.children) count += item.children.length
    }
  }
  return count
}
