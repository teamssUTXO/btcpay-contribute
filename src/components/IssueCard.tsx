import { GitBranch, GitPullRequest, Clock } from 'lucide-react'
import type React from 'react'
import { Badge } from '@/components/ui/badge'
import IssueLabel from '@/components/IssueLabel'
import type { Issue } from '@/types'
import { cn, timeAgo, stripMarkdown } from '@/lib/utils'

interface IssueCardProps {
  issue:   Issue
  onClick: (e: React.MouseEvent, issue: Issue) => void
}

export default function IssueCard({ issue, onClick }: IssueCardProps) {
  const isPR = issue.type === 'pr'

  return (
    <button
      type="button"
      onClick={(e) => onClick(e, issue)}
      className={cn(
        'glass rounded-2xl text-left w-full h-full flex flex-col p-5 group transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
          <GitBranch size={11} aria-hidden="true" />
          {issue.repo.name}
        </span>
        {isPR && (
          <Badge variant="skill" className="text-[10px] gap-1">
            <GitPullRequest size={10} aria-hidden="true" /> PR
          </Badge>
        )}
      </div>

      <h3 className="font-display font-bold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
        {issue.title}
      </h3>

      {issue.body && (
        <p className="text-muted-foreground text-sm leading-relaxed mt-2 line-clamp-2 overflow-hidden break-words min-w-0">
          {stripMarkdown(issue.body)}
        </p>
      )}

      {issue.labels.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {issue.labels.slice(0, 3).map((label) => (
            <IssueLabel key={label.name} label={label} />
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 mt-auto pt-2 text-muted-foreground text-xs">
        <span className="flex items-center gap-1 ml-auto">
          <Clock size={11} aria-hidden="true" /> {timeAgo(issue.createdAt)}
        </span>
      </div>
    </button>
  )
}
