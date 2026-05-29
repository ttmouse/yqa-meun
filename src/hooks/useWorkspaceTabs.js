import { useState, useCallback, useEffect, useRef } from 'react'

const STORAGE_KEY = 'admin_workspace_tabs'
const HOME_TAB_KEY = '__home__'

const HOME_TAB = {
  key: HOME_TAB_KEY,
  title: '首页',
  path: '',
  query: {},
  closable: false,
  fixed: true,
}

/**
 * 从 localStorage 安全读取持久化的 Tab 数据
 */
function loadTabs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    if (!Array.isArray(parsed.tabs)) return null
    // 确保首页 Tab 存在
    const hasHome = parsed.tabs.some((t) => t.key === HOME_TAB_KEY)
    if (!hasHome) return null
    return parsed
  } catch {
    return null
  }
}

/**
 * 安全写入 localStorage
 */
function saveTabs(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage 不可用或已满 — 静默失败
  }
}

/**
 * 根据 itemId 从所有 scheme 中查找菜单标题
 * @param {string} itemId
 * @param {Array} schemes - SCHEMES 数据
 * @returns {string|null}
 */
function resolveItemTitle(itemId, schemes) {
  if (!itemId || !schemes) return null
  for (const scheme of schemes) {
    for (const section of scheme.nav) {
      for (const item of section.items) {
        if (item.id === itemId) return item.label
        if (item.children) {
          for (const child of item.children) {
            if (child.id === itemId) return child.label
          }
        }
      }
    }
  }
  return null
}

/**
 * 验证持久化 Tab 是否仍然有效（菜单项存在）
 */
function validateTabs(tabs, schemes) {
  return tabs.filter((tab) => {
    if (tab.key === HOME_TAB_KEY) return true
    return resolveItemTitle(tab.key, schemes) !== null
  })
}

/**
 * 多页签工作区状态管理
 *
 * @param {Array} schemes - SCHEMES 数组，用于验证菜单项存在性
 * @returns {{
 *   tabs: Array,
 *   activeTabKey: string,
 *   openTab: (itemId: string, title?: string) => void,
 *   closeTab: (tabKey: string) => void,
 *   switchTab: (tabKey: string) => void,
 * }}
 */
export default function useWorkspaceTabs(schemes) {
  const [state, setState] = useState(() => {
    const saved = loadTabs()
    if (saved) {
      const validTabs = validateTabs(saved.tabs, schemes)
      const activeExists = validTabs.some((t) => t.key === saved.activeTabKey)
      return {
        tabs: validTabs,
        activeTabKey: activeExists ? saved.activeTabKey : HOME_TAB_KEY,
      }
    }
    return {
      tabs: [HOME_TAB],
      activeTabKey: HOME_TAB_KEY,
    }
  })

  // 状态变化时自动持久化
  const prevRef = useRef(state)
  useEffect(() => {
    if (prevRef.current !== state) {
      saveTabs(state)
      prevRef.current = state
    }
  }, [state])

  /**
   * 打开（或切换到）一个 Tab
   * @param {string} itemId
   * @param {string} [title] - 菜单项标题，不传则自动查找
   */
  const openTab = useCallback(
    (itemId, title) => {
      if (!itemId) return
      setState((prev) => {
        const existing = prev.tabs.find((t) => t.key === itemId)
        if (existing) {
          // Tab 已存在 — 只切换激活态
          return { ...prev, activeTabKey: itemId }
        }
        const tabTitle = title || resolveItemTitle(itemId, schemes) || itemId
        const newTab = {
          key: itemId,
          title: tabTitle,
          path: itemId,
          query: {},
          closable: true,
          fixed: false,
        }
        return {
          ...prev,
          tabs: [...prev.tabs, newTab],
          activeTabKey: itemId,
        }
      })
    },
    [schemes],
  )

  /**
   * 关闭一个 Tab
   * @param {string} tabKey
   */
  const closeTab = useCallback((tabKey) => {
    setState((prev) => {
      const tab = prev.tabs.find((t) => t.key === tabKey)
      if (!tab || tab.fixed) return prev // 固定 Tab 不可关闭

      const idx = prev.tabs.findIndex((t) => t.key === tabKey)
      const newTabs = prev.tabs.filter((t) => t.key !== tabKey)

      // 关闭的不是当前激活 Tab — 直接移除
      if (prev.activeTabKey !== tabKey) {
        return { ...prev, tabs: newTabs }
      }

      // 关闭的是当前激活 Tab — 切换到相邻 Tab
      // 优先切换到左侧相邻（比导航栏视觉位置更合理）
      let nextActive
      if (idx > 0) {
        nextActive = newTabs[idx - 1].key
      } else if (newTabs.length > 0) {
        nextActive = newTabs[0].key
      } else {
        nextActive = HOME_TAB_KEY
      }

      return {
        tabs: newTabs,
        activeTabKey: nextActive,
      }
    })
  }, [])

  /**
   * 切换到指定 Tab
   * @param {string} tabKey
   */
  const switchTab = useCallback((tabKey) => {
    setState((prev) => {
      if (prev.tabs.some((t) => t.key === tabKey)) {
        return { ...prev, activeTabKey: tabKey }
      }
      return prev
    })
  }, [])

  return {
    tabs: state.tabs,
    activeTabKey: state.activeTabKey,
    openTab,
    closeTab,
    switchTab,
  }
}
