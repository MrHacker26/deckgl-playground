import { MAP_STYLES } from '@/lib/deck-utils'
import { cn, type WithBasicProps } from '@/lib/utils'

export type MapStyleKey = keyof typeof MAP_STYLES

const STYLE_OPTIONS: { key: MapStyleKey; label: string }[] = [
  { key: 'dark', label: 'Dark' },
  { key: 'light', label: 'Light' },
  { key: 'voyager', label: 'Voyager' },
]

type MapStyleSwitcherProps = WithBasicProps<{
  value: MapStyleKey
  onChange: (style: MapStyleKey) => void
}>

export function MapStyleSwitcher({
  value,
  onChange,
  className,
  style,
}: MapStyleSwitcherProps) {
  return (
    <div
      className={cn('glass flex overflow-hidden rounded-lg', className)}
      style={style}
    >
      {STYLE_OPTIONS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => {
            onChange(key)
          }}
          className={cn(
            'cursor-pointer px-3 py-1.5 text-sm font-medium transition-colors',
            value === key
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
