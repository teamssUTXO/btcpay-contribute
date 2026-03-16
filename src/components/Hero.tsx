import type React from 'react'
import { Code2, FlaskConical, PenLine } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Role } from '@/types'

interface RoleMeta {
  id: Role
  icon: React.ReactElement
  label: string
  description: string
}

const ROLES: RoleMeta[] = [
  {
    id: 'developer',
    icon: <Code2 size={28} />,
    label: 'Developer',
    description: 'Write code, fix bugs, ship features in C#, TypeScript, and more.',
  },
  {
    id: 'tester',
    icon: <FlaskConical size={28} />,
    label: 'Tester',
    description: 'Test pull requests, hunt bugs, and give quality feedback.',
  },
  {
    id: 'writer',
    icon: <PenLine size={28} />,
    label: 'Writer',
    description: 'Improve docs, write blog posts, and help users understand BTCPay Server.',
  },
]


interface HeroProps {
  selectedRole: Role
  onRoleSelect: (role: Role) => void
}

export default function Hero({ selectedRole, onRoleSelect }: HeroProps) {
  return (
    <section id="role-selector" aria-label="Choose your contribution path" className="py-16 sm:py-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="relative text-center max-w-2xl mx-auto mb-12 space-y-4">
        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-display font-bold tracking-tight leading-[1.05] text-foreground">
          Start contributing to{' '}
          <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
            ₿itcoin
          </span>
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-xl mx-auto">
          Find a task matching your skillset and make a difference.
        </p>
      </div>

      {/* Role selector */}
      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
        {ROLES.map((role) => {
          const selected = selectedRole === role.id
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onRoleSelect(role.id)}
              aria-pressed={selected}
              className={cn(
                'group relative flex flex-col items-start gap-4 rounded-2xl border p-6 text-left',
                'transition-all duration-200 cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                selected
                  ? 'border-primary bg-primary/[0.06] shadow-lg shadow-primary/10'
                  : 'border-border/60 bg-card/50 hover:border-border hover:bg-card',
              )}
            >
              {selected && (
                <span
                  className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
              <div
                className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200',
                  selected
                    ? 'bg-primary/15 text-primary'
                    : 'bg-muted text-muted-foreground group-hover:text-foreground group-hover:bg-muted/80',
                )}
              >
                {role.icon}
              </div>
              <div className="space-y-1">
                <p className="font-display font-bold text-base leading-tight text-foreground">
                  {role.label}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {role.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

    </section>
  )
}
