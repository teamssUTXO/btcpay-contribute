import { lazy, Suspense } from 'react'
import { ExternalLink, MessageCircle, Clock, GitBranch } from 'lucide-react'
const ReactMarkdown = lazy(() => import('react-markdown'))
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import IssueLabel from '@/components/IssueLabel'
import type { Issue } from '@/types'
import { timeAgo } from '@/lib/utils'

interface IssueModalProps {
  issue: Issue | null
  onClose: () => void
  slideFrom: 'left' | 'bottom' | 'right'
}

export default function IssueModal({ issue, onClose, slideFrom }: IssueModalProps) {
  return (
    <Dialog open={!!issue} onOpenChange={(open) => { if (!open) onClose() }}>
      {issue && (
        <DialogContent slideFrom={slideFrom} className="flex flex-col overflow-hidden">

          <div className="flex items-center gap-2 text-muted-foreground text-xs pr-8">
            <GitBranch size={12} aria-hidden="true" />
            <a
              href={issue.repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              {issue.repo.fullName}
            </a>
            <span aria-hidden="true">·</span>
            <span>#{issue.number}</span>
          </div>

          <DialogTitle className="font-display font-semibold text-xl leading-snug mt-2 pr-8">
            {issue.title}
          </DialogTitle>

          {issue.labels.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2 mb-2">
              {issue.labels.map((label) => (
                <IssueLabel key={label.name} label={label} />
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
            <img
              src={issue.author.avatarUrl}
              alt={issue.author.login}
              className="w-5 h-5 rounded-full"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <a
              href={issue.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-primary transition-colors"
            >
              {issue.author.login}
            </a>
            <span className="flex items-center gap-1">
              <Clock size={11} aria-hidden="true" /> {timeAgo(issue.createdAt)}
            </span>
            <span className="flex items-center gap-1 ml-auto">
              <MessageCircle size={11} aria-hidden="true" /> {issue.commentsCount} comments
            </span>
          </div>

          <div className="flex-1 overflow-y-auto mt-4 mb-4 pr-1 min-h-0">
            <div className="prose prose-sm max-w-none dark:prose-invert text-foreground">
              <Suspense fallback={<p className="text-muted-foreground text-sm whitespace-pre-wrap">{issue.body || '_No description provided._'}</p>}>
                <ReactMarkdown
                  skipHtml
                  allowedElements={['p', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'code', 'pre', 'blockquote', 'a', 'strong', 'em', 'br']}
                  unwrapDisallowed
                >
                  {issue.body || '_No description provided._'}
                </ReactMarkdown>
              </Suspense>
            </div>
          </div>


          <div className="pt-4 border-t border-border">
            <Button size="lg" className="w-full" asChild>
              <a href={issue.url} target="_blank" rel="noopener noreferrer">
                Open Issue on GitHub
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </Button>
          </div>

        </DialogContent>
      )}
    </Dialog>
  )
}
