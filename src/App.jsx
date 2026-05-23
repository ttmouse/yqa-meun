import { useState, useCallback, useMemo } from 'react'
import SCHEMES from './data/schemes'
import Sidebar from './components/Sidebar'
import ContentArea from './components/ContentArea'

export default function App() {
  const [activeKey, setActiveKey] = useState(SCHEMES[0].key)
  const [activeItemId, setActiveItemId] = useState('')
  const [dark, setDark] = useState(false)

  const scheme = useMemo(() => SCHEMES.find((s) => s.key === activeKey), [activeKey])

  const handleSwitch = useCallback((key) => {
    setActiveKey(key)
    const next = SCHEMES.find((s) => s.key === key)
    if (next) {
      for (const group of next.nav) {
        for (const item of group.items) {
          if (!item.children) {
            setActiveItemId(item.id)
            return
          }
          if (item.children && item.children.length > 0) {
            setActiveItemId(item.children[0].id)
            return
          }
        }
      }
    }
  }, [])

  const handleSelect = useCallback((id) => {
    setActiveItemId(id)
  }, [])

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="h-screen w-screen flex bg-white dark:bg-slate-950 overflow-hidden">
        <Sidebar
          schemes={SCHEMES}
          scheme={scheme}
          activeKey={activeKey}
          activeId={activeItemId}
          dark={dark}
          onSelect={handleSelect}
          onSwitch={(key) => handleSwitch(key)}
        />
        <ContentArea
          scheme={scheme}
          activeItemId={activeItemId}
          dark={dark}
          onToggleDark={() => setDark(!dark)}
        />
      </div>
    </div>
  )
}
