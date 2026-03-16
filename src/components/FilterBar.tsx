import { Search, X } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { FilterState } from '@/types'

interface FilterBarProps {
  filters: FilterState
  setQuery: (q: string) => void
}

export default function FilterBar({ filters, setQuery }: FilterBarProps) {
  const searchRef = useRef<HTMLInputElement>(null)

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
    },
    [setQuery],
  )

  const hasQuery = !!filters.query.trim()

  return (
    <div className="min-w-0 overflow-hidden">
      <div className="flex items-center gap-2">
        {hasQuery && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className={cn(
              'flex items-center justify-center rounded-full shrink-0',
              'bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted',
              'transition-all duration-150 cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'h-8 w-8 sm:w-auto sm:px-3 sm:gap-1.5 sm:text-sm sm:font-medium',
            )}
          >
            <X size={14} aria-hidden="true" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        )}
        <div className="relative flex-1 min-w-0">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
          <input
            ref={searchRef}
            type="search"
            value={filters.query}
            onChange={handleSearch}
            placeholder="Search issues…"
            aria-label="Search issues"
            className={cn(
              'h-8 pl-8 pr-3 rounded-full text-sm',
              'bg-muted/70 placeholder:text-muted-foreground',
              'border border-transparent focus:border-border focus:bg-card',
              'focus:outline-none transition-all duration-200',
              'w-full md:w-40 md:focus:w-60',
              'text-base md:text-sm',
            )}
          />
        </div>
      </div>
    </div>
  )
}
