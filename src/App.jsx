import { useState, useCallback, useMemo } from 'react'
import SCHEMES from './data/schemes'
import useWorkspaceTabs from './hooks/useWorkspaceTabs'
import Sidebar from './components/Sidebar'
import ContentArea from './components/ContentArea'

/**
 * 获取当前 scheme 中第一个叶子菜单项的 id
 */
function getFirstLeafItemId(scheme) {
  if (!scheme) return ''
  for (const group of scheme.nav) {
    for (const item of group.items) {
      if (!item.children) return item.id
      if (item.children && item.children.length > 0) {
        return item.children[0].id
      }
    }
  }
  return ''
}

export default function App() {
  const [activeKey, setActiveKey] = useState(() => {
    const goal = SCHEMES.find((s) => s.key === 'goal')
    return goal ? goal.key : SCHEMES[0].key
  })
  const [dark, setDark] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const scheme = useMemo(() => SCHEMES.find((s) => s.key === activeKey), [activeKey])

  // 多页签工作区状态
  const { tabs, activeTabKey, openTab, closeTab, switchTab } =
    useWorkspaceTabs(SCHEMES)

  // 当前应显示的页面 itemId
  // 首页 Tab 映射到当前 scheme 的第一个叶子菜单项
  const activeItemId = useMemo(() => {
    if (activeTabKey === '__home__') {
      return getFirstLeafItemId(scheme)
    }
    return activeTabKey
  }, [activeTabKey, scheme])

  /**
   * 切换方案时自动打开第一个叶子菜单项
   */
  const handleSwitch = useCallback(
    (key) => {
      setActiveKey(key)
      const next = SCHEMES.find((s) => s.key === key)
      if (next) {
        const firstId = getFirstLeafItemId(next)
        if (firstId) {
          // 查找标题
          for (const group of next.nav) {
            for (const item of group.items) {
              if (item.id === firstId) {
                openTab(firstId, item.label)
                return
              }
              if (item.children) {
                for (const child of item.children) {
                  if (child.id === firstId) {
                    openTab(firstId, child.label)
                    return
                  }
                }
              }
            }
          }
          openTab(firstId)
        }
      }
    },
    [openTab],
  )

  /**
   * 菜单选中 → 打开/切换到对应 Tab
   */
  const handleSelect = useCallback(
    (itemId, label) => {
      openTab(itemId, label)
    },
    [openTab],
  )

  /**
   * 点击 Tab → 切换到该 Tab
   */
  const handleTabClick = useCallback(
    (tabKey) => {
      switchTab(tabKey)
    },
    [switchTab],
  )

  /**
   * 关闭 Tab
   */
  const handleTabClose = useCallback(
    (tabKey) => {
      closeTab(tabKey)
    },
    [closeTab],
  )

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="h-screen w-screen flex bg-white dark:bg-slate-950 overflow-hidden">
        <Sidebar
          schemes={SCHEMES}
          scheme={scheme}
          activeKey={activeKey}
          activeId={activeItemId}
          dark={dark}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onSelect={handleSelect}
          onSwitch={(key) => handleSwitch(key)}
        />
        <ContentArea
          scheme={scheme}
          activeItemId={activeItemId}
          activeTabKey={activeTabKey}
          tabs={tabs}
          dark={dark}
          onToggleDark={() => setDark(!dark)}
          onTabClick={handleTabClick}
          onTabClose={handleTabClose}
        />
      </div>
    </div>
  )
}
