import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import DeckGL from '@deck.gl/react'
import { MapView } from '@deck.gl/core'
import Map from 'react-map-gl/maplibre'
import type { MapViewState, PickingInfo } from '@deck.gl/core'
import type { Layer } from '@deck.gl/core'
import { ActivityIcon } from 'lucide-react'

import 'maplibre-gl/dist/maplibre-gl.css'
import { cn } from '@/lib/utils'
import type { WithBasicProps } from '@/lib/utils'
import { MAP_STYLES } from '@/lib/deck-utils'
import { MapStyleSwitcher, type MapStyleKey } from './map-style-switcher'
import { PerformancePanel, type Metrics } from './performance-panel'

type DeckMapProps = WithBasicProps<{
  initialViewState?: Partial<MapViewState>
  layers?: Layer[]
  onHover?: (info: PickingInfo) => void
  onClick?: (info: PickingInfo) => void
  mapStyle?: string
  showStyleSwitcher?: boolean
  showPerformancePanel?: boolean
  children?: React.ReactNode
}>

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 77.5946,
  latitude: 12.9716,
  zoom: 11,
  pitch: 0,
  bearing: 0,
}

const DEFAULT_METRICS: Metrics = {
  fps: 0,
  renderTime: 0,
  framesRedrawn: 0,
  idle: true,
}

export function DeckMap({
  initialViewState = INITIAL_VIEW_STATE,
  layers = [],
  onHover,
  onClick,
  mapStyle = MAP_STYLES.dark,
  showStyleSwitcher = false,
  showPerformancePanel = false,
  children,
}: DeckMapProps) {
  const [viewState, setViewState] = useState<MapViewState>({
    ...INITIAL_VIEW_STATE,
    ...initialViewState,
  } as MapViewState)

  const [activeStyleKey, setActiveStyleKey] = useState<MapStyleKey>('dark')
  const [metrics, setMetrics] = useState<Metrics>(DEFAULT_METRICS)
  const [showPanelMobile, setShowPanelMobile] = useState(false)

  // FPS tracking refs
  const fpsRef = useRef({
    windowStart: null as number | null,
    windowFrameCount: 0,
    frameTimes: [] as number[],
    lastFrame: null as number | null,
    totalFrames: 0,
    idleTimer: null as ReturnType<typeof setTimeout> | null,
  })

  useEffect(() => {
    const fps = fpsRef.current
    return () => {
      if (fps.idleTimer) {
        clearTimeout(fps.idleTimer)
      }
    }
  }, [])

  const resolvedMapStyle = showStyleSwitcher
    ? MAP_STYLES[activeStyleKey]
    : mapStyle

  const handleViewStateChange = useCallback(
    ({ viewState }: { viewState: MapViewState }) => {
      setViewState(viewState)
    },
    [],
  )

  const handleAfterRender = useCallback(() => {
    if (!showPerformancePanel) {
      return
    }
    const now = performance.now()
    const fps = fpsRef.current

    // Seed refs on first render
    if (fps.windowStart === null || fps.lastFrame === null) {
      fps.windowStart = now
      fps.lastFrame = now
      return
    }

    // Per-frame render time (rolling 60-frame average)
    fps.frameTimes.push(now - fps.lastFrame)
    if (fps.frameTimes.length > 60) {
      fps.frameTimes.shift()
    }
    fps.lastFrame = now
    fps.totalFrames++
    fps.windowFrameCount++

    // FPS = renders counted in the last 1-second window
    const elapsed = now - fps.windowStart
    if (elapsed >= 1000) {
      const currentFps = (fps.windowFrameCount / elapsed) * 1000
      const avgRenderTime =
        fps.frameTimes.reduce((a, b) => a + b, 0) / fps.frameTimes.length
      setMetrics({
        fps: currentFps,
        renderTime: avgRenderTime,
        framesRedrawn: fps.totalFrames,
        idle: false,
      })
      fps.windowFrameCount = 0
      fps.windowStart = now
    }

    // Mark idle after 300ms with no renders
    if (fps.idleTimer) {
      clearTimeout(fps.idleTimer)
    }
    fps.idleTimer = setTimeout(() => {
      setMetrics((prev) => ({ ...prev, idle: true }))
    }, 300)
  }, [showPerformancePanel])

  const mapView = useMemo(() => new MapView({ repeat: true }), [])

  return (
    <div className="relative h-screen w-screen">
      <DeckGL
        viewState={viewState}
        controller={true}
        layers={layers}
        onViewStateChange={handleViewStateChange}
        onHover={onHover}
        onClick={onClick}
        views={mapView}
        onAfterRender={handleAfterRender}
      >
        <Map mapStyle={resolvedMapStyle} />
      </DeckGL>
      {children}
      {showPerformancePanel ? (
        <>
          <button
            className="glass absolute top-4 right-4 rounded-lg p-1.5 sm:hidden"
            onClick={() => {
              setShowPanelMobile((value) => !value)
            }}
            aria-label="Toggle performance panel"
          >
            <ActivityIcon className="size-4" />
          </button>
          <div
            className={cn(
              'absolute top-14 right-4 sm:top-4',
              showPanelMobile ? 'block' : 'hidden',
              'sm:block',
            )}
          >
            <PerformancePanel metrics={metrics} layerCount={layers.length} />
          </div>
        </>
      ) : null}
      {showStyleSwitcher ? (
        <div className="absolute right-4 bottom-4">
          <MapStyleSwitcher
            value={activeStyleKey}
            onChange={setActiveStyleKey}
            className="mb-6"
          />
        </div>
      ) : null}
    </div>
  )
}
