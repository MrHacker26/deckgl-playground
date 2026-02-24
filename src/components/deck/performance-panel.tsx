import { cn, type WithBasicProps } from '@/lib/utils'

export type Metrics = {
  fps: number
  renderTime: number
  framesRedrawn: number
  idle: boolean
}

type PerformancePanelProps = WithBasicProps<{
  metrics: Metrics
  layerCount: number
  className?: string
}>

type StatRowProps = {
  label: string
  value: string
  valueClassName?: string
}

function StatRow({ label, value, valueClassName }: StatRowProps) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span
        className={cn(
          'font-mono text-xs font-semibold tabular-nums',
          valueClassName,
        )}
      >
        {value}
      </span>
    </div>
  )
}

function fpsColor(fps: number) {
  if (fps >= 50) {
    return 'text-green-400'
  }
  if (fps >= 30) {
    return 'text-yellow-400'
  }
  return 'text-red-400'
}

function detectGpuInfo() {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
  if (!gl) {
    return null
  }

  const version = canvas.getContext('webgl2') ? 'WebGL2' : 'WebGL1'
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
  if (!debugInfo) {
    return {
      version,
      renderer: 'Unknown GPU',
      full: 'Unknown GPU',
    }
  }

  const full = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)

  const renderer = full
    .replace(/^ANGLE \(/i, '') // Windows ANGLE prefix
    .replace(/\(.*?\)/g, '') // strip driver internals: (radeonsi renoir ACO)
    .replace(/,?\s*(OpenGL|Direct3D|Metal|Vulkan|ES)\s*[\w.]+.*/i, '') // strip API suffix
    .replace(/,\s*$/, '') // trailing comma
    .replace(/\s+/g, ' ')
    .trim()

  return { version, renderer, full }
}

const GPU_INFO = detectGpuInfo()

export function PerformancePanel({
  metrics,
  layerCount,
  className,
}: PerformancePanelProps) {
  const { fps, renderTime, framesRedrawn, idle } = metrics

  return (
    <div className={cn('glass w-52 space-y-2 rounded-lg p-3', className)}>
      <div className="flex items-center justify-between">
        <p className="text-card-foreground text-xs font-semibold tracking-widest uppercase">
          Performance
        </p>
        {idle ? (
          <span className="text-muted-foreground rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs">
            idle
          </span>
        ) : null}
      </div>
      <div className="space-y-1.5">
        <StatRow
          label="FPS"
          value={idle ? '—' : fps.toFixed(1)}
          valueClassName={idle ? 'text-muted-foreground' : fpsColor(fps)}
        />
        <StatRow
          label="Frame Time"
          value={idle ? '—' : `${renderTime.toFixed(2)} ms`}
          valueClassName="text-foreground"
        />
        <StatRow
          label="Frames"
          value={framesRedrawn.toLocaleString()}
          valueClassName="text-foreground"
        />
        <StatRow
          label="Layers"
          value={String(layerCount)}
          valueClassName="text-foreground"
        />
      </div>
      <div className="border-border overflow-hidden border-t pt-2">
        {GPU_INFO ? (
          <div className="flex items-center gap-1.5" title={GPU_INFO.full}>
            <span className="bg-primary/20 text-primary shrink-0 rounded px-1.5 py-0.5 font-mono text-xs font-bold">
              {GPU_INFO.version}
            </span>
            <span className="text-muted-foreground font-mono text-xs leading-tight">
              {GPU_INFO.renderer}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground font-mono text-xs">
            Detecting GPU…
          </span>
        )}
      </div>
    </div>
  )
}
