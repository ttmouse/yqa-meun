import { useRef, useEffect } from 'react'

/**
 * 顶部多页签工作区导航组件
 *
 * Props:
 *   tabs         - Tab 数组 [{key, title, closable, fixed, ...}]
 *   activeTabKey - 当前激活 Tab 的 key
 *   onTabClick   - (key) => void
 *   onTabClose   - (key) => void
 */
export default function WorkspaceTabs({ tabs, activeTabKey, onTabClick, onTabClose }) {
  const scrollRef = useRef(null)
  const activeRef = useRef(null)
  const prevActiveRef = useRef(activeTabKey)

  // 当前激活 Tab 变化时，自动滚动到可视区域内
  useEffect(() => {
    if (prevActiveRef.current === activeTabKey) return
    prevActiveRef.current = activeTabKey

    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current
      const el = activeRef.current
      const containerRect = container.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()

      const isOutOfViewLeft = elRect.left < containerRect.left
      const isOutOfViewRight = elRect.right > containerRect.right

      if (isOutOfViewLeft) {
        container.scrollBy({
          left: elRect.left - containerRect.left - 16,
          behavior: 'smooth',
        })
      } else if (isOutOfViewRight) {
        container.scrollBy({
          left: elRect.right - containerRect.right + 16,
          behavior: 'smooth',
        })
      }
    }
  }, [activeTabKey])

  if (!tabs || tabs.length === 0) return null

  return (
    <div className="workspace-tabs">
      <div className="workspace-tabs-scroll" ref={scrollRef}>
        <div className="workspace-tabs-track">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTabKey
            return (
              <button
                key={tab.key}
                ref={isActive ? activeRef : null}
                className={`workspace-tab ${isActive ? 'workspace-tab-active' : ''} ${tab.fixed ? 'workspace-tab-fixed' : ''}`}
                onClick={() => onTabClick(tab.key)}
                title={tab.title}
              >
                <span className="workspace-tab-label">{tab.title}</span>
                {tab.closable && (
                  <span
                    className="workspace-tab-close"
                    onClick={(e) => {
                      e.stopPropagation()
                      onTabClose(tab.key)
                    }}
                    title="关闭"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 2L8 8M8 2L2 8"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
