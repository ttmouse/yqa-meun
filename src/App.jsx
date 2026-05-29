import { useState, useCallback, useMemo, useEffect } from 'react'
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

/**
 * 查找菜单项标题
 */
function findLabel(scheme, itemId) {
  if (!scheme || !itemId) return null
  for (const group of scheme.nav) {
    for (const item of group.items) {
      if (item.id === itemId) return item.label
      if (item.children) {
        for (const child of item.children) {
          if (child.id === itemId) return child.label
        }
      }
    }
  }
  return null
}

/**
 * 获取 layoutType，不存在则默认为 'side'
 */
function getLayoutType(scheme) {
  return scheme?.layoutType || 'side'
}

export default function App() {
  const [activeKey, setActiveKey] = useState(() => {
    const goal = SCHEMES.find((s) => s.key === 'goal')
    return goal ? goal.key : SCHEMES[0].key
  })
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('admin_theme_dark')
      return saved !== null ? JSON.parse(saved) : true
    } catch {
      return true
    }
  })
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // 持久化深色模式
  useEffect(() => {
    try {
      localStorage.setItem('admin_theme_dark', JSON.stringify(dark))
    } catch {
      // 静默失败
    }
  }, [dark])

  const scheme = useMemo(() => SCHEMES.find((s) => s.key === activeKey), [activeKey])
  const layoutType = useMemo(() => getLayoutType(scheme), [scheme])

  // 多页签工作区状态
  const { tabs, activeTabKey, openTab, closeTab, switchTab } =
    useWorkspaceTabs(SCHEMES)

  // 当前应显示的页面 itemId
  const activeItemId = useMemo(() => {
    if (activeTabKey === '__home__') {
      return getFirstLeafItemId(scheme)
    }
    return activeTabKey
  }, [activeTabKey, scheme])

  // mix 模式下，当前选中的一级模块（用于控制侧边栏显示哪个模块的子菜单）
  const [topModuleKey, setTopModuleKey] = useState('')

  // 当 scheme 切换时，重置 topModuleKey
  useEffect(() => {
    if (layoutType === 'mix' && scheme) {
      const first = getFirstLeafItemId(scheme)
      // 找到 first 所属的父级
      for (const group of scheme.nav) {
        for (const item of group.items) {
          if (item.id === first) {
            setTopModuleKey(item.id)
            return
          }
          if (item.children) {
            for (const child of item.children) {
              if (child.id === first) {
                setTopModuleKey(item.id)
                return
              }
            }
          }
        }
      }
    }
  }, [layoutType, scheme])

  /**
   * 切换方案
   */
  const handleSwitch = useCallback(
    (key) => {
      setActiveKey(key)
      const next = SCHEMES.find((s) => s.key === key)
      if (next) {
        const firstId = getFirstLeafItemId(next)
        if (firstId) {
          const label = findLabel(next, firstId)
          openTab(firstId, label || firstId)
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

  /**
   * top/mix 模式下顶部导航点击
   */
  const handleTopNavClick = useCallback(
    (itemId, label) => {
      if (layoutType === 'mix') {
        // switch the module sidebar
        setTopModuleKey(itemId)
        // auto-select first child
        if (scheme) {
          for (const group of scheme.nav) {
            for (const item of group.items) {
              if (item.id === itemId) {
                if (item.children && item.children.length > 0) {
                  openTab(item.children[0].id, item.children[0].label)
                } else {
                  openTab(itemId, label)
                }
                return
              }
            }
          }
        }
      } else {
        // top mode: direct navigation
        openTab(itemId, label)
      }
    },
    [layoutType, scheme, openTab],
  )

  // 是否显示侧边栏
  const showSidebar = layoutType !== 'top'

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="h-screen w-screen flex bg-white dark:bg-slate-950 overflow-hidden">
        {showSidebar && (
          <Sidebar
            schemes={SCHEMES}
            scheme={scheme}
            activeKey={activeKey}
            activeId={activeItemId}
            dark={dark}
            layoutType={layoutType}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onSelect={handleSelect}
            onSwitch={(key) => handleSwitch(key)}
            topModuleKey={layoutType === 'mix' ? topModuleKey : ''}
          />
        )}
        <ContentArea
          scheme={scheme}
          activeItemId={activeItemId}
          activeTabKey={activeTabKey}
          tabs={tabs}
          dark={dark}
          layoutType={layoutType}
          topModuleKey={layoutType === 'mix' ? topModuleKey : ''}
          onToggleDark={() => setDark(!dark)}
          onTabClick={handleTabClick}
          onTabClose={handleTabClose}
          onTopNavClick={handleTopNavClick}
        />
      </div>
    </div>
  )
}
