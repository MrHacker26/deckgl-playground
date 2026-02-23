import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArcLayer } from '@deck.gl/layers'
import { useState, useMemo } from 'react'

import { DeckMap } from '@/components/deck/deck-map'
import { VIEW_STATES, generateArcs, type ArcData } from '@/lib/deck-utils'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { ChevronLeftIcon } from 'lucide-react'

export const Route = createFileRoute('/examples/arc')({
  component: ArcExamplePage,
})

function ArcExamplePage() {
  const navigate = useNavigate()
  const [arcCount, setArcCount] = useState(20)
  const [arcWidth, setArcWidth] = useState(2)

  const data = useMemo(() => generateArcs(arcCount), [arcCount])

  const layers = useMemo(
    () => [
      new ArcLayer<ArcData>({
        id: 'arc-layer',
        data,
        pickable: true,
        getWidth: arcWidth,
        getSourcePosition: (d) => d.source as [number, number],
        getTargetPosition: (d) => d.target as [number, number],
        getSourceColor: [0, 128, 255, 220],
        getTargetColor: [255, 80, 180, 220],
      }),
    ],
    [data, arcWidth],
  )

  return (
    <DeckMap initialViewState={VIEW_STATES.india} layers={layers}>
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
            Arc Layer
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="arc-count" className="text-muted-foreground">
                Arcs: {arcCount}
              </Label>
              <Slider
                id="arc-count"
                min={1}
                max={45}
                step={1}
                value={[arcCount]}
                onValueChange={([v]) => setArcCount(v)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="arc-width" className="text-muted-foreground">
                Width: {arcWidth}px
              </Label>
              <Slider
                id="arc-width"
                min={1}
                max={10}
                step={1}
                value={[arcWidth]}
                onValueChange={([v]) => setArcWidth(v)}
              />
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setArcCount(20)
              setArcWidth(2)
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </DeckMap>
  )
}
