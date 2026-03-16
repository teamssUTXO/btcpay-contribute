import { useState, lazy, Suspense, useCallback } from 'react'
import type React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FilterBar from '@/components/FilterBar'
import IssueGrid from '@/components/IssueGrid'
import ResourcesSection from '@/components/ResourcesSection'
import Footer from '@/components/Footer'

const IssueModal = lazy(() => import('@/components/IssueModal'))
const preloadIssueModal = () => import('@/components/IssueModal')

import { useFilters } from '@/hooks/useFilters'
import { useIssues } from '@/hooks/useIssues'
import type { Issue, Role } from '@/types'

const ROLE_SECTION_TITLE: Record<Role, { heading: string; sub: string }> = {
  developer: {
    heading: 'Jump right in',
    sub: 'Pick a good first issue and start shipping.',
  },
  tester: {
    heading: 'Jump right in',
    sub: 'The best testers use BTCPay Server daily. Test PRs, try every release, and report every bug you find.',
  },
  writer: {
    heading: 'Jump right in',
    sub: 'Pick an open issue in the docs or blog and start writing.',
  },
}

export default function App() {
  const [selectedRole, setSelectedRole] = useState<Role>('developer')

  const { filters, setQuery } = useFilters()
  const { filtered, testerFiltered, writerFiltered, status } = useIssues(filters)
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)
  const [slideFrom, setSlideFrom] = useState<'left' | 'bottom' | 'right'>('bottom')

  const handleRoleSelect = useCallback((role: Role) => {
    setSelectedRole(role)
    setQuery('')
  }, [setQuery])

  const handleIssueClick = (e: React.MouseEvent, issue: Issue) => {
    const { left, width } = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const third = window.innerWidth / 3
    const cardCenter = left + width / 2
    const direction = cardCenter < third ? 'left' : cardCenter > third * 2 ? 'right' : 'bottom'
    setSlideFrom(direction)
    setSelectedIssue(issue)
  }

  const { heading, sub } = ROLE_SECTION_TITLE[selectedRole]

  function getIssues() {
    if (selectedRole === 'tester') return testerFiltered
    if (selectedRole === 'writer') return writerFiltered
    return filtered
  }

  return (
    <>
      <Navbar selectedRole={selectedRole} onRoleSelect={handleRoleSelect} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-[4.5rem] pb-8">
        <Hero
          selectedRole={selectedRole}
          onRoleSelect={handleRoleSelect}
        />

        <div id="issues" className="border-t border-border/60 pt-20 sm:pt-28 pb-10 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground">
            {heading}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-sm mx-auto text-sm sm:text-base">
            {sub}
          </p>
        </div>

        <div>
          <div className="sticky top-16 z-40 py-4 bg-background/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-0">
              <FilterBar
                filters={filters}
                setQuery={setQuery}
              />
            </div>
          </div>

          <IssueGrid
            issues={getIssues()}
            loading={status === 'loading'}
            onIssueClick={handleIssueClick}
            onIssueHover={preloadIssueModal}
          />
        </div>

        <ResourcesSection role={selectedRole} />
      </main>

      <Footer />

      <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/30" />}>
        <IssueModal
          issue={selectedIssue}
          slideFrom={slideFrom}
          onClose={() => setSelectedIssue(null)}
        />
      </Suspense>
    </>
  )
}
