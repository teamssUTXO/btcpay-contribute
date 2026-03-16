import { useCallback, useEffect, useState } from 'react'
import type { FilterState } from '@/types'

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(() => ({
    query: new URLSearchParams(window.location.search).get('q') ?? '',
  }))

  // Sync search query to URL
  useEffect(() => {
    const q = filters.query.trim()
    const url = q ? `?q=${encodeURIComponent(q)}` : window.location.pathname
    window.history.replaceState(null, '', url)
  }, [filters.query])

  const setQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, query }))
  }, [])

  return { filters, setQuery }
}
