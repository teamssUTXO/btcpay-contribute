import { useState, useRef, useEffect } from 'react'
import type React from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { Code2, FlaskConical, PenLine, ChevronDown } from 'lucide-react'
import type { Role } from '@/types'

/** BTCPay logo mark - paths extracted from directory.btcpayserver.org logo SVG */
function BTCPayMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="3.5 0 62 107.758"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M 9.525 104.7 C 6.228 104.682 3.565 102.004 3.565 98.707 L 3.565 8.573 C 3.5 6.39 4.627 4.344 6.507 3.233 C 8.387 2.122 10.723 2.122 12.603 3.233 C 14.484 4.344 15.611 6.39 15.545 8.573 L 15.545 98.707 C 15.545 100.301 14.91 101.83 13.78 102.954 C 12.651 104.079 11.119 104.707 9.525 104.7 Z" fill="rgb(206,220,33)" />
      <path d="M 9.531 104.7 C 6.751 104.675 4.353 102.741 3.739 100.03 C 3.126 97.318 4.458 94.54 6.957 93.321 L 43.076 76.178 L 5.976 48.826 C 3.313 46.864 2.744 43.115 4.706 40.452 C 6.667 37.788 10.417 37.22 13.08 39.181 L 58.242 72.455 C 59.953 73.696 60.879 75.749 60.676 77.852 C 60.473 79.956 59.172 81.794 57.256 82.685 L 12.105 104.12 C 11.301 104.504 10.421 104.702 9.531 104.7 Z" fill="rgb(81,177,62)" />
      <path d="M 9.531 69.269 C 6.927 69.288 4.61 67.622 3.799 65.148 C 2.987 62.674 3.868 59.96 5.976 58.433 L 43.076 31.097 L 6.957 13.98 C 3.965 12.562 2.689 8.986 4.107 5.994 C 5.526 3.001 9.101 1.725 12.094 3.144 L 57.256 24.579 C 59.161 25.48 60.452 27.318 60.654 29.416 C 60.857 31.515 59.94 33.565 58.242 34.814 L 13.08 68.104 C 12.052 68.863 10.808 69.271 9.531 69.269 Z" fill="rgb(206,220,33)" />
      <path d="M 15.518 40.975 L 15.518 66.305 L 32.7 53.648 Z" fill="rgb(30,122,68)" />
      <rect x="3.538" y="30.355" width="11.98" height="29.199" fill="white" />
      <path d="M 15.518 8.573 C 15.584 6.39 14.457 4.344 12.576 3.233 C 10.696 2.122 8.36 2.122 6.48 3.233 C 4.6 4.344 3.472 6.39 3.538 8.573 L 3.538 83.937 L 15.518 83.937 Z" fill="rgb(206,220,33)" />
    </svg>
  )
}

const ROLES: Role[] = ['developer', 'tester', 'writer']

const ROLE_ICON: Record<Role, React.ReactElement> = {
  developer: <Code2 size={13} />,
  tester: <FlaskConical size={13} />,
  writer: <PenLine size={13} />,
}

const ROLE_LABEL: Record<Role, string> = {
  developer: 'Developer',
  tester: 'Tester',
  writer: 'Writer',
}

interface NavbarProps {
  selectedRole: Role
  onRoleSelect: (role: Role) => void
}

export default function Navbar({ selectedRole, onRoleSelect }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6">
        <a
          href="/"
          aria-label="BTCPay Contribute home"
          className="flex items-center gap-2 shrink-0 group"
        >
          <BTCPayMark className="h-9 w-auto transition-transform duration-300 group-hover:scale-105" />
          <span className="font-display leading-[1.1]">
            <span className="block font-bold text-sm tracking-tight text-foreground">
              BTCPay
            </span>
            <span className="block text-[10px] font-bold tracking-[0.14em] uppercase text-primary">
              Contribute
            </span>
          </span>
        </a>

        <nav className="hidden sm:flex items-center gap-1">
          <a
            href="#issues"
            className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
          >
            Contribute
          </a>
          <a
            href="#how-it-works"
            className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
          >
            How it works
          </a>
        </nav>

        <div className="flex items-center gap-1.5 ml-auto">
          <div ref={ref} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-label="Change contribution role"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-primary">{ROLE_ICON[selectedRole]}</span>
              {ROLE_LABEL[selectedRole]}
              <ChevronDown
                size={12}
                className={`text-muted-foreground transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
              />
            </button>

            {open && (
              <div
                role="listbox"
                aria-label="Select role"
                className="absolute right-0 top-full mt-1.5 w-40 rounded-xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-lg overflow-hidden"
              >
                {ROLES.map((role) => (
                  <button
                    key={role}
                    type="button"
                    role="option"
                    aria-selected={role === selectedRole}
                    onClick={() => { onRoleSelect(role); setOpen(false) }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors duration-100 hover:bg-muted ${
                      role === selectedRole
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <span className={role === selectedRole ? 'text-primary' : 'text-muted-foreground'}>
                      {ROLE_ICON[role]}
                    </span>
                    {ROLE_LABEL[role]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://github.com/btcpayserver/btcpay-contribute"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="BTCPay Server on GitHub"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
