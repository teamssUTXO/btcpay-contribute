import { useEffect, useRef, useState } from 'react'
import { Play, ArrowUpRight, Code2, Terminal, MonitorPlay, FlaskConical, PenLine, BookOpen, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Role } from '@/types'

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.89 8.25-1.97 9.27c-.14.66-.54.82-1.08.51l-3-2.21-1.45 1.39c-.16.16-.3.29-.61.29l.21-3.05 5.56-5.02c.24-.21-.05-.33-.37-.12L6.3 13.66l-2.96-.92c-.64-.2-.65-.64.14-.95l11.57-4.46c.53-.19 1 .13.84.92z" />
    </svg>
  )
}

function MattermostIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.977 0C5.358 0 .008 5.35.008 11.97S5.358 23.94 11.978 23.94c6.618 0 11.969-5.35 11.969-11.97S18.596 0 11.977 0zm5.882 17.29c-.114.099-.276.131-.419.082l-5.47-1.764-3.674 2.672a.387.387 0 01-.606-.385l.553-5.784-5.214-2.858a.387.387 0 01.072-.71l14.476-4.365a.385.385 0 01.487.463l-2.878 12.175a.387.387 0 01-.307.474z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  )
}

function DockerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.887c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
    </svg>
  )
}

interface VideoMeta {
  id: string
  meta: string
  title: string
  ariaLabel: string
  start?: number
}

function YoutubeThumbnail({ video, priority = false }: { video: VideoMeta; priority?: boolean }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1${video.start ? `&start=${video.start}` : ''}`}
          title={video.ariaLabel}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${video.ariaLabel}`}
      className="group relative w-full aspect-video rounded-2xl overflow-hidden bg-black cursor-pointer"
    >
      <img
        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
        alt=""
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: 'hsl(var(--primary))', boxShadow: '0 0 0 16px hsl(var(--primary) / 0.15)' }}
        >
          <Play size={20} fill="white" className="ml-1" aria-hidden="true" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-white/60 text-xs font-medium">{video.meta}</p>
        <p className="text-white font-semibold text-sm mt-0.5 leading-snug">{video.title}</p>
      </div>
    </button>
  )
}

const DOC_VIDEO: VideoMeta = {
  id: 'Z78ZbPcsc3g',
  meta: 'Documentary · 42 min',
  title: 'My Trust in You Is Broken',
  ariaLabel: 'My Trust in You Is Broken - BTCPay Server documentary',
}

const DEV_VIDEO: VideoMeta = {
  id: 'dW9eSgA_dUg',
  meta: 'Dev setup walkthrough',
  title: 'BTCPay Server Development Setup',
  ariaLabel: 'BTCPay Server development environment setup tutorial',
  start: 408,
}

const WRITER_VIDEO: VideoMeta = {
  id: 'bSDROcdSSWw',
  meta: 'Writing guide',
  title: 'How to contribute to BTCPay Server docs',
  ariaLabel: 'How to contribute to BTCPay Server documentation',
}


function ToolRow({ href, icon, label, meta }: {
  href?: string
  icon: React.ReactNode
  label: React.ReactNode
  meta?: React.ReactNode
}) {
  const base = 'flex items-center gap-3 rounded-2xl border border-border/60 bg-card/50 p-3'
  const inner = (
    <>
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">{icon}</div>
      <span className="font-semibold text-sm text-foreground flex-1 min-w-0">{label}</span>
      {meta ?? (href && <ArrowUpRight size={13} className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0" aria-hidden="true" />)}
    </>
  )
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer"
        className={`${base} group hover:border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
      >{inner}</a>
    )
  }
  return <div className={base}>{inner}</div>
}

function InlineLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      {links.map((link, i) => (
        <span key={link.href} className="flex items-center gap-2">
          {i > 0 && <span className="text-border">·</span>}
          <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[11px] font-medium text-primary hover:underline">{link.label}</a>
        </span>
      ))}
    </div>
  )
}

// ── Step visuals ──────────────────────────────────────────────────────────────

function DevToolRows() {
  return (
    <div className="flex flex-col gap-1.5">
      <ToolRow
        icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-foreground" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>}
        label="Git Client"
        meta={<InlineLinks links={[{ href: 'https://desktop.github.com', label: 'GitHub Desktop' }, { href: 'https://www.sourcetreeapp.com', label: 'SourceTree' }]} />}
      />
      <ToolRow href="https://dotnet.microsoft.com/download/dotnet/10.0" icon={<Terminal size={15} className="text-foreground" />} label=".NET 10.0 SDK" />
      <ToolRow href="https://www.docker.com/get-started/" icon={<DockerIcon className="w-4 h-4 text-foreground" />} label="Docker Desktop" />
      <ToolRow href="https://www.jetbrains.com/rider/" icon={<Code2 size={15} className="text-foreground" />} label={<>JetBrains Rider <span className="text-xs font-normal text-muted-foreground">community edition</span></>} />
      <ToolRow icon={<BookOpen size={15} className="text-foreground" />} label="Read the docs" meta={<InlineLinks links={[{ href: 'https://docs.btcpayserver.org/Contribute/DevCode/', label: 'Dev Docs' }, { href: 'https://www.youtube.com/channel/UCpG9WL6TJuoNfFVkaDMp9ug/', label: 'Playlist' }]} />} />
    </div>
  )
}

function CommunityRows() {
  return (
    <div className="flex flex-col gap-1.5">
      <ToolRow href="https://t.me/btcpayserver" icon={<TelegramIcon className="w-4 h-4 text-foreground" />} label="Telegram" />
      <ToolRow href="https://chat.btcpayserver.org" icon={<MattermostIcon className="w-4 h-4 text-foreground" />} label="Mattermost" />
      <ToolRow href="https://x.com/BtcpayServer" icon={<XIcon className="w-4 h-4 text-foreground" />} label="Follow on X" />
    </div>
  )
}

function TesterStep4() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Day to day</p>
        <ToolRow href="https://github.com/btcpayserver/btcpayserver/releases" icon={<FlaskConical size={15} className="text-foreground" />} label="Try every new release as soon as it drops" />
        <ToolRow href="https://github.com/btcpayserver/btcpayserver/issues/new/choose" icon={<PenLine size={15} className="text-foreground" />} label="Report bugs on GitHub with clear repro steps" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">When testing a PR</p>
        <ToolRow icon={<MessageSquare size={15} className="text-foreground" />} label="Leave a comment with your findings on the PR" />
        <ToolRow icon={<MonitorPlay size={15} className="text-foreground" />} label="Record a video or provide a screenshot for context" />
        <ToolRow icon={<PenLine size={15} className="text-foreground" />} label="Include exact steps to reproduce so the dev can follow" />
        <ToolRow icon={<FlaskConical size={15} className="text-foreground" />} label="Approve the PR and state it has been user-tested" />
      </div>
    </div>
  )
}



function WriterStep4() {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">When submitting</p>
      <ToolRow icon={<PenLine size={15} className="text-foreground" />} label="Write in English, clear and concise" />
      <ToolRow icon={<BookOpen size={15} className="text-foreground" />} label="Follow the existing tone and formatting style" />
      <ToolRow icon={<MessageSquare size={15} className="text-foreground" />} label="Reference the issue you are addressing in the PR" />
    </div>
  )
}

function DevStep4() {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">When submitting a PR</p>
      <ToolRow icon={<MonitorPlay size={15} className="text-foreground" />} label="Include a screen recording in description" />
      <ToolRow icon={<FlaskConical size={15} className="text-foreground" />} label="Test locally before requesting review" />
      <ToolRow icon={<PenLine size={15} className="text-foreground" />} label="Write a human-readable description" />
    </div>
  )
}

// ── Step data ────────────────────────────────────────────────────────────────

interface StepDef {
  label: string
  title: string
  description: string
  cta?: { href: string; label: string }
}

const STEPS: Record<Role, StepDef[]> = {
  developer: [
    {
      label: 'Documentary',
      title: 'Watch the documentary',
      description: 'Understand the mission and meet the contributors who built BTCPay Server. A 42-minute film that shows why this project matters.',
    },
    {
      label: 'Dev Setup',
      title: 'Deploy a local dev environment',
      description: '',
    },
    {
      label: 'Community',
      title: 'Join the community',
      description: 'Introduce yourself, ask questions, and connect with contributors who have shipped real features.',
    },
    {
      label: 'Ship It',
      title: 'Pick an issue and ship it',
      description: 'Filter by your skill and grab a good-first-issue that fits your experience level.',
      cta: { href: '#issues', label: 'Pick an issue' },
    },
  ],
  tester: [
    {
      label: 'Documentary',
      title: 'Watch the documentary',
      description: 'Understand the mission and meet the contributors who built BTCPay Server. A 42-minute film that shows why this project matters.',
    },
    {
      label: 'Dev Setup',
      title: 'Deploy a local dev environment',
      description: 'Testers need the same local setup as developers to run BTCPay and reproduce issues accurately.',
    },
    {
      label: 'Community',
      title: 'Join the community',
      description: 'Introduce yourself, ask questions, and find out what the team is currently working on.',
    },
    {
      label: 'Test',
      title: 'Pick a PR and test it',
      description: 'Use BTCPay Server regularly, test every new release, and report bugs. For PRs, leave a thorough comment with video and repro steps.',
      cta: { href: '#issues', label: 'Test a PR' },
    },
  ],
  writer: [
    {
      label: 'Documentary',
      title: 'Watch the documentary',
      description: 'Understand the mission and meet the contributors who built BTCPay Server. A 42-minute film that shows why this project matters.',
    },
    {
      label: 'Set up',
      title: 'Set up your environment',
      description: 'Learn how to fork the docs repo, edit locally, and submit a pull request. Start improving documentation step by step.',
    },
    {
      label: 'Community',
      title: 'Join the community',
      description: 'Introduce yourself, ask questions, and connect with contributors who have shipped real features.',
    },
    {
      label: 'Write',
      title: 'Write and submit a PR',
      description: 'Fork the repo, write your contribution, and open a pull request. Keep it focused and reference the issue you are addressing.',
      cta: { href: '#issues', label: 'Pick an issue' },
    },
  ],
}

// ── Step visual resolver ─────────────────────────────────────────────────────

function StepVisual({ role, stepIndex }: { role: Role; stepIndex: number }) {
  // Step 1 (index 0): always documentary
  if (stepIndex === 0) return <YoutubeThumbnail video={DOC_VIDEO} priority />

  // Step 2 (index 1): dev/tester = dev env setup; writer = writing guide video
  if (stepIndex === 1) {
    if (role === 'developer' || role === 'tester') return <YoutubeThumbnail video={DEV_VIDEO} />
    if (role === 'writer') return <YoutubeThumbnail video={WRITER_VIDEO} />
  }

  // Step 3 (index 2): same for all roles
  if (stepIndex === 2) return <CommunityRows />

  // Step 4 (index 3)
  if (role === 'developer') return <DevStep4 />
  if (role === 'tester') return <TesterStep4 />
  if (role === 'writer') return <WriterStep4 />

  return null
}

// ── Step row ─────────────────────────────────────────────────────────────────

function StepRow({ step, index, role }: { step: StepDef; index: number; role: Role }) {
  const { ref, visible } = useScrollReveal()
  const flip = index % 2 !== 0

  // Step 2 for dev/tester gets the wide two-column layout with video + tools side by side
  const isDevSetupStep = index === 1 && (role === 'developer' || role === 'tester')

  if (isDevSetupStep) {
    return (
      <div
        ref={ref}
        className={cn(
          'py-14 sm:py-20 space-y-6 transition-all duration-700 ease-out',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="hidden lg:block" />
          <div className="space-y-1">
            <span
              className="font-display font-bold leading-none select-none block text-foreground/[0.055]"
              style={{ fontSize: 'clamp(5rem, 12vw, 9rem)' }}
              aria-hidden="true"
            >
              02
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight -mt-3 sm:-mt-5">
              {step.title}
            </h3>
            {step.description && (
              <p className="text-muted-foreground leading-relaxed max-w-sm pt-2">{step.description}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <YoutubeThumbnail video={role === 'writer' ? WRITER_VIDEO : DEV_VIDEO} />
          <DevToolRows />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 py-14 sm:py-20 items-start transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
      )}
    >
      <div className={cn('space-y-1', flip && 'lg:order-2')}>
        <span
          className="font-display font-bold leading-none select-none block text-foreground/[0.055]"
          style={{ fontSize: 'clamp(5rem, 12vw, 9rem)' }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="-mt-3 sm:-mt-5 space-y-3">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
            {step.title}
          </h3>
          {step.description && (
            <p className="text-muted-foreground leading-relaxed max-w-sm">{step.description}</p>
          )}
          {step.cta && (
            <div className="pt-1">
              <a
                href={step.cta.href}
                className="inline-flex items-center gap-2 rounded-full px-8 h-12 text-sm font-semibold text-primary-foreground bg-primary shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:bg-primary/90 transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {step.cta.label}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className={cn(flip && 'lg:order-1')}>
        <StepVisual role={role} stepIndex={index} />
      </div>
    </div>
  )
}

// ── Section subtitles per role ───────────────────────────────────────────────

const SECTION_SUB: Record<Role, string> = {
  developer: 'New to open source? Follow these steps to land your first merged PR.',
  tester: 'New to testing? Follow these steps to file your first quality report.',
  writer: 'New to contributing docs or content? Follow these steps to get your first PR merged.',
}

// ── Export ───────────────────────────────────────────────────────────────────

export default function ResourcesSection({ role }: { role: Role }) {
  const steps = STEPS[role]

  return (
    <section id="how-it-works" aria-label="Getting started" className="border-t border-border/60">
      <div className="text-center pt-20 sm:pt-28 pb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          How it works
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground">
          New here? Learn step by step
        </h2>
        <p className="mt-4 text-muted-foreground max-w-sm mx-auto text-sm sm:text-base">
          {SECTION_SUB[role]}
        </p>
      </div>

      <div className="divide-y divide-border/60">
        {steps.map((step, i) => (
          <StepRow key={step.label} step={step} index={i} role={role} />
        ))}
      </div>
    </section>
  )
}
