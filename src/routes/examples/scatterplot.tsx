import { createFileRoute } from '@tanstack/react-router'
import { ScatterplotLayer } from '@deck.gl/layers'
import { useState } from 'react'

import { DeckMap } from '@/components/deck/deck-map'
import { generateRandomPoints, VIEW_STATES, type Point } from '@/lib/deck-utils'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/examples/scatterplot')({
  component: ScatterplotExamplePage,
})

function ScatterplotExamplePage() {
  const [pointCount, setPointCount] = useState(1000)
  const [pointSize, setPointSize] = useState(30)

  const data = generateRandomPoints(pointCount)

  const layers = [
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: (d: Point) => d.coordinates,
      getRadius: pointSize,
      getFillColor: () =>
        [255, 140, 0, 200] as [number, number, number, number],
      getLineColor: [0, 0, 0],
    }),
  ]

  return (
    <DeckMap initialViewState={VIEW_STATES.bangalore} layers={layers}>
      <div className="bg-card/80 border-border absolute top-4 left-4 space-y-2 rounded-lg border p-4 shadow-lg backdrop-blur-sm">
        <div className="text-card-foreground text-lg font-semibold">
          Scatterplot Example
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="point-count" className="text-muted-foreground">
              Points: {pointCount}
            </Label>
            <Slider
              id="point-count"
              min={100}
              max={10000}
              step={100}
              value={[pointCount]}
              onValueChange={([v]) => {
                setPointCount(v)
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="point-size" className="text-muted-foreground">
              Size: {pointSize}
            </Label>
            <Slider
              id="point-size"
              min={10}
              max={100}
              value={[pointSize]}
              onValueChange={([value]) => {
                setPointSize(value)
              }}
            />
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setPointCount(1000)
            setPointSize(30)
          }}
        >
          Reset
        </Button>
      </div>
    </DeckMap>
  )
}
