import { useEffect, useMemo, useState } from 'react'
import type { IssuesData, FilterState } from '@/types'
import { filterIssues, filterByQuery } from '@/lib/filter-engine'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useIssues(filters: FilterState) {
  const [data, setData] = useState<IssuesData | null>(null)
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    setStatus('loading')
    fetch('/data/issues.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<IssuesData>
      })
      .then((d) => { setData(d); setStatus('success') })
      .catch((err) => { console.error('[useIssues] failed to load issues.json:', err); setStatus('error') })
  }, [])

  const filtered = useMemo(
    () => (data ? filterIssues(data.issues, filters) : []),
    [data, filters],
  )

  const testerFiltered = useMemo(
    () => (data ? filterByQuery(data.testerItems ?? [], filters.query) : []),
    [data, filters.query],
  )

  const writerFiltered = useMemo(
    () => (data ? filterIssues(data.writerIssues ?? [], filters) : []),
    [data, filters],
  )

  return { filtered, testerFiltered, writerFiltered, status }
}
