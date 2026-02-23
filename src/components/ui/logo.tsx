import { cn } from '@/lib/utils'
import type { WithBasicProps } from '@/lib/utils'

type LogoProps = WithBasicProps<{
  size?: number
  showText?: boolean
}>

export function LogoIcon({
  size = 40,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id="lg-top"
          x1="8"
          y1="16"
          x2="40"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <linearGradient
          id="lg-mid"
          x1="8"
          y1="24"
          x2="40"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient
          id="lg-bot"
          x1="8"
          y1="32"
          x2="40"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#2e1065" />
        </linearGradient>
      </defs>

      {/* Bottom layer */}
      <polygon
        points="24,24 40,32 24,40 8,32"
        fill="url(#lg-bot)"
        opacity="0.85"
      />

      {/* Middle layer */}
      <polygon
        points="24,16 40,24 24,32 8,24"
        fill="url(#lg-mid)"
        opacity="0.9"
      />

      {/* Top layer */}
      <polygon points="24,8 40,16 24,24 8,16" fill="url(#lg-top)" />

      {/* Layer edge highlights — left face */}
      <polygon points="8,16 24,24 24,32 8,24" fill="#1d4ed8" opacity="0.6" />
      <polygon points="8,24 24,32 24,40 8,32" fill="#1e3a6e" opacity="0.5" />

      {/* Layer edge highlights — right face */}
      <polygon points="40,16 24,24 24,32 40,24" fill="#4f46e5" opacity="0.6" />
      <polygon points="40,24 24,32 24,40 40,32" fill="#312e81" opacity="0.5" />

      {/* Arc curve over top layer */}
      <path
        d="M 11 17 Q 24 4 37 17"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />

      {/* Scatter dots on top layer */}
      <circle cx="18" cy="14" r="1.5" fill="white" opacity="0.95" />
      <circle cx="24" cy="11" r="1.5" fill="white" opacity="0.95" />
      <circle cx="30" cy="14" r="1.5" fill="white" opacity="0.95" />
    </svg>
  )
}

export function Logo({ size = 40, showText = true, className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <LogoIcon size={size} />
      {showText ? (
        <span
          className="text-foreground font-bold tracking-tight"
          style={{ fontSize: size * 0.45 }}
        >
          deck<span className="text-primary">.gl</span>
        </span>
      ) : null}
    </div>
  )
}
