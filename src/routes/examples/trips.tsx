import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { TripsLayer } from '@deck.gl/geo-layers'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeftIcon, PauseIcon, PlayIcon } from 'lucide-react'

import { DeckMap } from '@/components/deck/deck-map'
import {
  generateTrips,
  LOOP_LENGTH,
  VIEW_STATES,
  type TripData,
} from '@/lib/deck-utils'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/examples/trips')({
  component: TripsExamplePage,
})

function formatSimTime(seconds: number) {
  const h = Math.floor(seconds / 3600) % 24
  const m = Math.floor((seconds % 3600) / 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function TripsExamplePage() {
  const navigate = useNavigate()

  const [settings, setSettings] = useState({
    tripCount: 200,
    trailLength: 120,
    speed: 5,
  })
  const [playing, setPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)

  const { tripCount, trailLength, speed } = settings

  const trips = useMemo(() => generateTrips(tripCount), [tripCount])

  // Animation loop
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)

  useEffect(() => {
    if (!playing) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      lastTsRef.current = null
      return
    }

    function tick(ts: number) {
      if (lastTsRef.current !== null) {
        const delta = ts - lastTsRef.current
        setCurrentTime((t) => (t + (delta / 1000) * speed * 10) % LOOP_LENGTH)
      }
      lastTsRef.current = ts
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      lastTsRef.current = null
    }
  }, [playing, speed])

  const layers = [
    new TripsLayer<TripData>({
      id: 'trips-layer',
      data: trips,
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: (d) => d.color,
      opacity: 0.9,
      widthMinPixels: 2,
      widthMaxPixels: 4,
      rounded: true,
      trailLength,
      currentTime,
    }),
  ]

  return (
    <DeckMap
      initialViewState={VIEW_STATES.bangalore_trips}
      layers={layers}
      showStyleSwitcher
      showPerformancePanel
    >
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="outline"
          icon={<ChevronLeftIcon />}
          className="glass w-fit"
          onClick={() => {
            navigate({ to: '/' })
          }}
        >
          Back
        </Button>

        <div className="glass w-64 space-y-4 rounded-lg p-4">
          <div className="text-card-foreground text-lg font-semibold">
            Trip Layer
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-muted-foreground">
                Trips: {tripCount}
              </Label>
              <Slider
                min={50}
                max={500}
                step={50}
                value={[tripCount]}
                onValueChange={([v]) =>
                  setSettings((s) => ({ ...s, tripCount: v }))
                }
              />
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground">
                Trail Length: {trailLength}s
              </Label>
              <Slider
                min={20}
                max={400}
                step={10}
                value={[trailLength]}
                onValueChange={([v]) =>
                  setSettings((s) => ({ ...s, trailLength: v }))
                }
              />
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground">Speed: {speed}x</Label>
              <Slider
                min={1}
                max={20}
                step={1}
                value={[speed]}
                onValueChange={([v]) =>
                  setSettings((s) => ({ ...s, speed: v }))
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="glass flex items-center gap-3 rounded-full px-4 py-2">
          <Button
            onClick={() => {
              setPlaying((play) => !play)
            }}
            icon={
              playing ? (
                <PauseIcon className="size-4" />
              ) : (
                <PlayIcon className="size-4" />
              )
            }
          />

          <div className="w-48">
            <Slider
              min={0}
              max={LOOP_LENGTH}
              step={1}
              value={[currentTime]}
              onValueChange={([value]) => {
                setCurrentTime(value)
              }}
            />
          </div>

          <span className="text-muted-foreground w-12 font-mono text-xs tabular-nums">
            {formatSimTime(currentTime)}
          </span>
        </div>
      </div>
    </DeckMap>
  )
}
