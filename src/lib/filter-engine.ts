import type { Issue, FilterState } from '@/types'

export function filterIssues(issues: Issue[], filters: FilterState): Issue[] {
  let result = issues.filter((i) => i.assignees.length === 0)

  if (filters.query.trim()) {
    const q = filters.query.trim().toLowerCase()
    result = result.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.body.toLowerCase().includes(q) ||
        i.repo.name.toLowerCase().includes(q),
    )
  }

  return result
}

export function filterByQuery(items: Issue[], query: string): Issue[] {
  if (!query.trim()) return items
  const q = query.trim().toLowerCase()
  return items.filter(
    (i) =>
      i.title.toLowerCase().includes(q) ||
      i.body.toLowerCase().includes(q) ||
      i.repo.name.toLowerCase().includes(q),
  )
}
