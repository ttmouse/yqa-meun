import { useState, useCallback } from 'react'
import { PROPOSALS } from './data/menus'
import TopBar from './components/TopBar'
import Sidebar from './components/Sidebar'
import ContentArea from './components/ContentArea'

export default function App() {
  const [activeProposalId, setActiveProposalId] = useState(PROPOSALS[0].id)
  const [activeItemId, setActiveItemId] = useState('briefing')

  const activeProposal = PROPOSALS.find((p) => p.id === activeProposalId)

  const handleSwitchProposal = useCallback((id) => {
    setActiveProposalId(id)
    // Reset to first item's id when switching proposal
    const proposal = PROPOSALS.find((p) => p.id === id)
    if (proposal) {
      const firstItem = proposal.sections
        .flatMap((s) => s.items)
        .find((i) => i.variant !== 'optional')
      if (firstItem) setActiveItemId(firstItem.id)
    }
  }, [])

  const handleSelectItem = useCallback((id) => {
    setActiveItemId(id)
  }, [])

  return (
    <div className="h-screen w-screen flex flex-col bg-[#f9fafb] overflow-hidden">
      <TopBar
        proposals={PROPOSALS}
        activeId={activeProposalId}
        onSwitch={handleSwitchProposal}
      />
      <div className="flex flex-1 min-h-0">
        <Sidebar
          proposal={activeProposal}
          activeId={activeItemId}
          onSelect={handleSelectItem}
        />
        <ContentArea
          activeId={activeItemId}
          proposal={activeProposal}
        />
      </div>
    </div>
  )
}
