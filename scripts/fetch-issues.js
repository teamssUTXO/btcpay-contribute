// @ts-check

/**
 * Fetches all open "good first issue" issues across the btcpayserver GitHub org.
 * Writes output to public/data/issues.json.
 * Exits with code 1 (no-op signal) if data is unchanged — avoids redundant deploys.
 *
 * Required env (CI): ORG_GITHUB_TOKEN — PAT with repo:read scope.
 *   The org has 70+ repos. Fetching all of them requires ~70 API requests, which
 *   exceeds the unauthenticated rate limit of 60 req/hr. A token is mandatory for
 *   the cron workflow. Set it as a repo secret named ORG_GITHUB_TOKEN.
 *
 * Local dev: run `ORG_GITHUB_TOKEN=ghp_xxx node scripts/fetch-issues.js`
 *   You can create a token at https://github.com/settings/tokens (no scopes needed
 *   for public repos — just generate a classic token with no checkboxes ticked).
 */

import { Octokit } from '@octokit/rest'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

const ORG             = 'btcpayserver'
const LABEL           = 'good first issue'
const TESTER_LABEL    = 'User Testing'
const WRITER_REPOS    = ['btcpayserver-doc', 'btcpayserver-blog']
const COPYWRITING_LABEL = 'copywriting'
const OUT             = resolve(__dirname, '../public/data/issues.json')
const BODY_MAX        = 600

async function main() {
  const token = process.env.ORG_GITHUB_TOKEN
  if (!token) {
    console.error('ORG_GITHUB_TOKEN is required. The org has 70+ repos and will exceed')
    console.error('the unauthenticated rate limit of 60 req/hr.')
    console.error('Create a token at https://github.com/settings/tokens (no scopes needed for public repos)')
    console.error('then run: ORG_GITHUB_TOKEN=ghp_xxx node scripts/fetch-issues.js')
    process.exit(2)
  }

  const octokit = new Octokit({ auth: token })

  // ── 1. Fetch all org repos ─────────────────────────────────────────────────
  console.log(`Fetching repos for org: ${ORG}`)
  const repos = await octokit.paginate(octokit.rest.repos.listForOrg, {
    org: ORG,
    type: 'public',
    per_page: 100,
  })
  console.log(`Found ${repos.length} public repos`)

  // ── 2. Fetch good-first-issues from each repo ──────────────────────────────
  /** @type {any[]} */
  const issues = []

  for (const repo of repos) {
    let page = 1
    while (true) {
      const { data } = await octokit.rest.issues.listForRepo({
        owner: ORG,
        repo:  repo.name,
        labels: LABEL,
        state:  'open',
        per_page: 100,
        page,
      })
      if (data.length === 0) break

      for (const raw of data) {
        // Skip pull requests (GitHub returns PRs in issue list)
        if (raw.pull_request) continue

        issues.push({
          id:            raw.id,
          number:        raw.number,
          type:          'issue',
          title:         raw.title,
          body:          (raw.body ?? '').slice(0, BODY_MAX),
          url:           raw.html_url,
          createdAt:     raw.created_at,
          updatedAt:     raw.updated_at ?? raw.created_at,
          commentsCount: raw.comments,
          reactionCount: raw.reactions?.total_count ?? 0,
          labels:        raw.labels
            .filter((l) => typeof l === 'object')
            .map((l) => ({ name: l.name ?? '', color: l.color ?? '888888' })),
          repo: {
            name:     repo.name,
            fullName: repo.full_name,
            language: repo.language ?? null,
            url:      repo.html_url,
          },
          assignees: (raw.assignees ?? []).map((a) => ({
            login:     a.login,
            avatarUrl: a.avatar_url,
            url:       a.html_url,
          })),
          author: {
            login:     raw.user?.login ?? 'unknown',
            avatarUrl: raw.user?.avatar_url ?? '',
            url:       raw.user?.html_url ?? '',
          },
        })
      }

      if (data.length < 100) break
      page++
    }
  }

  // ── 3. Sort by creation date desc ─────────────────────────────────────────
  issues.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // ── 3b. Fetch tester items: open PRs + "User Testing" issues ──────────────
  /** @type {any[]} */
  const testerItems = []

  // PRs and issues labeled "User Testing" across all org repos
  console.log(`Fetching "${TESTER_LABEL}" items across org`)
  for (const repo of repos) {
    let page = 1
    while (true) {
      const { data } = await octokit.rest.issues.listForRepo({
        owner:    ORG,
        repo:     repo.name,
        labels:   TESTER_LABEL,
        state:    'open',
        per_page: 100,
        page,
      })
      if (data.length === 0) break

      for (const raw of data) {
        const isPR = !!raw.pull_request
        testerItems.push({
          id:            raw.id,
          number:        raw.number,
          type:          isPR ? 'pr' : 'issue',
          title:         raw.title,
          body:          (raw.body ?? '').slice(0, BODY_MAX),
          url:           raw.html_url,
          createdAt:     raw.created_at,
          updatedAt:     raw.updated_at ?? raw.created_at,
          commentsCount: raw.comments,
          reactionCount: raw.reactions?.total_count ?? 0,
          labels:        raw.labels
            .filter((l) => typeof l === 'object')
            .map((l) => ({ name: l.name ?? '', color: l.color ?? '888888' })),
          repo: {
            name:     repo.name,
            fullName: repo.full_name,
            language: repo.language ?? null,
            url:      repo.html_url,
          },
          assignees: (raw.assignees ?? []).map((a) => ({
            login:     a.login,
            avatarUrl: a.avatar_url,
            url:       a.html_url,
          })),
          author: {
            login:     raw.user?.login ?? 'unknown',
            avatarUrl: raw.user?.avatar_url ?? '',
            url:       raw.user?.html_url ?? '',
          },
        })
      }

      if (data.length < 100) break
      page++
    }
  }
  console.log(`Found ${testerItems.filter((i) => i.type === 'pr').length} PRs and ${testerItems.filter((i) => i.type === 'issue').length} issues with "${TESTER_LABEL}" label`)

  // Sort tester items: PRs first, then issues, newest first within each group
  testerItems.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'pr' ? -1 : 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  // ── 3c. Writer issues: all open issues from doc + blog repos ─────────────
  /** @type {any[]} */
  const writerIssues = []
  console.log(`Fetching all open issues from writer repos: ${WRITER_REPOS.join(', ')}`)

  for (const repoName of WRITER_REPOS) {
    const repo = repos.find((r) => r.name === repoName)
    if (!repo) { console.warn(`  Writer repo not found: ${repoName}`); continue }

    let page = 1
    while (true) {
      const { data } = await octokit.rest.issues.listForRepo({
        owner:    ORG,
        repo:     repoName,
        state:    'open',
        per_page: 100,
        page,
      })
      if (data.length === 0) break

      for (const raw of data) {
        if (raw.pull_request) continue // skip PRs
        writerIssues.push({
          id:            raw.id,
          number:        raw.number,
          type:          'issue',
          title:         raw.title,
          body:          (raw.body ?? '').slice(0, BODY_MAX),
          url:           raw.html_url,
          createdAt:     raw.created_at,
          updatedAt:     raw.updated_at ?? raw.created_at,
          commentsCount: raw.comments,
          reactionCount: raw.reactions?.total_count ?? 0,
          labels:        raw.labels
            .filter((l) => typeof l === 'object')
            .map((l) => ({ name: l.name ?? '', color: l.color ?? '888888' })),
          repo: {
            name:     repo.name,
            fullName: repo.full_name,
            language: repo.language ?? null,
            url:      repo.html_url,
          },
          assignees: (raw.assignees ?? []).map((a) => ({
            login:     a.login,
            avatarUrl: a.avatar_url,
            url:       a.html_url,
          })),
          author: {
            login:     raw.user?.login ?? 'unknown',
            avatarUrl: raw.user?.avatar_url ?? '',
            url:       raw.user?.html_url ?? '',
          },
        })
      }

      if (data.length < 100) break
      page++
    }
  }

  // Also fetch "copywriting" labeled issues across all org repos
  const seenWriterIds = new Set(writerIssues.map((i) => i.id))
  console.log(`Fetching "${COPYWRITING_LABEL}" issues across org`)
  for (const repo of repos) {
    let page = 1
    while (true) {
      const { data } = await octokit.rest.issues.listForRepo({
        owner:    ORG,
        repo:     repo.name,
        labels:   COPYWRITING_LABEL,
        state:    'open',
        per_page: 100,
        page,
      })
      if (data.length === 0) break
      for (const raw of data) {
        if (raw.pull_request) continue
        if (seenWriterIds.has(raw.id)) continue // already included
        seenWriterIds.add(raw.id)
        writerIssues.push({
          id:            raw.id,
          number:        raw.number,
          type:          'issue',
          title:         raw.title,
          body:          (raw.body ?? '').slice(0, BODY_MAX),
          url:           raw.html_url,
          createdAt:     raw.created_at,
          updatedAt:     raw.updated_at ?? raw.created_at,
          commentsCount: raw.comments,
          reactionCount: raw.reactions?.total_count ?? 0,
          labels:        raw.labels
            .filter((l) => typeof l === 'object')
            .map((l) => ({ name: l.name ?? '', color: l.color ?? '888888' })),
          repo: {
            name:     repo.name,
            fullName: repo.full_name,
            language: repo.language ?? null,
            url:      repo.html_url,
          },
          assignees: (raw.assignees ?? []).map((a) => ({
            login:     a.login,
            avatarUrl: a.avatar_url,
            url:       a.html_url,
          })),
          author: {
            login:     raw.user?.login ?? 'unknown',
            avatarUrl: raw.user?.avatar_url ?? '',
            url:       raw.user?.html_url ?? '',
          },
        })
      }
      if (data.length < 100) break
      page++
    }
  }

  // Sort writer issues: unassigned first, then newest
  writerIssues.sort((a, b) => {
    if (a.assignees.length !== b.assignees.length) return a.assignees.length - b.assignees.length
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  console.log(`Found ${writerIssues.length} open writer issues (doc/blog repos + "${COPYWRITING_LABEL}" label)`)

  // ── 4. Build repo list ─────────────────────────────────────────────────────
  const reposWithIssues = repos
    .filter((r) => issues.some((i) => i.repo.name === r.name))
    .map((r) => ({
      id:          r.id,
      name:        r.name,
      fullName:    r.full_name,
      description: r.description ?? null,
      url:         r.html_url,
      language:    r.language ?? null,
      topics:      r.topics ?? [],
      stars:       r.stargazers_count,
    }))

  const output = {
    lastUpdated:  new Date().toISOString(),
    totalIssues:  issues.length,
    repoCount:    reposWithIssues.length,
    repos:        reposWithIssues,
    issues,
    testerItems,
    writerIssues,
  }

  // ── 5. Diff check — skip write if unchanged ────────────────────────────────
  const json = JSON.stringify(output, null, 2)
  if (existsSync(OUT)) {
    const existing = readFileSync(OUT, 'utf8')
    const strip = (s) => s.replace(/"lastUpdated":\s*"[^"]+"/g, '"lastUpdated":""')
    if (strip(existing) === strip(json)) {
      console.log('No changes detected — skipping deploy')
      process.exit(1) // signals workflow to skip build step
    }
  }

  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, json, 'utf8')
  console.log(`✓ Wrote ${issues.length} issues, ${testerItems.length} tester items, ${writerIssues.length} writer issues from ${reposWithIssues.length} repos to ${OUT}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(2)
})
