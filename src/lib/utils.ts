import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Strips common Markdown syntax so raw body text is safe for plain-text
 * display (e.g. line-clamp in IssueCard). Handles the patterns that appear
 * in GitHub issue bodies: links, images, bold/italic, headings, inline code,
 * code fences, blockquotes, list bullets, and HTML tags.
 */
export function stripMarkdown(md: string): string {
  return md
    // Collapse CRLF to spaces
    .replace(/\r\n/g, ' ')
    // Fenced code blocks - replace with a placeholder so they don't bleed
    .replace(/```[\s\S]*?```/g, '[code]')
    // Images ![alt](url) - keep alt text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Links [text](url) - keep text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Bare angle-bracket URLs <https://...>
    .replace(/<https?:\/\/[^>]*>/g, '')
    // HTML tags (e.g. <img ...>)
    .replace(/<[^>]+>/g, '')
    // ATX headings ##
    .replace(/^#{1,6}\s+/gm, '')
    // Bold/italic ***/__
    .replace(/(\*{1,3}|_{1,3})(.*?)\1/g, '$2')
    // Inline code `...`
    .replace(/`([^`]*)`/g, '$1')
    // Blockquote >
    .replace(/^>\s*/gm, '')
    // List bullets - / * / 1.
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Collapse multiple whitespace / newlines into a single space
    .replace(/\s+/g, ' ')
    .trim()
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (remainingMonths === 0) return `${years}y ago`
  return `${years}y ${remainingMonths}mo ago`
}
