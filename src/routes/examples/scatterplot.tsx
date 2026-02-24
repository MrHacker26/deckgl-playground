import { createFileRoute } from '@tanstack/react-router'
import { ScatterplotLayer } from '@deck.gl/layers'
import { useState } from 'react'

import { DeckMap } from '@/components/deck/deck-map'
import { generateRandomPoints, VIEW_STATES, type Point } from '@/lib/deck-utils'
import { ExamplePanel, SliderField } from '@/components/example-panel'

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
    <DeckMap
      initialViewState={VIEW_STATES.bangalore}
      layers={layers}
      showStyleSwitcher
      showPerformancePanel
    >
      <ExamplePanel
        title="Scatterplot Example"
        onReset={() => {
          setPointCount(1000)
          setPointSize(30)
        }}
      >
        <SliderField
          label={`Points: ${pointCount}`}
          id="point-count"
          min={100}
          max={10000}
          step={100}
          value={pointCount}
          onChange={setPointCount}
        />
        <SliderField
          label={`Size: ${pointSize}`}
          id="point-size"
          min={10}
          max={100}
          value={pointSize}
          onChange={setPointSize}
        />
      </ExamplePanel>
    </DeckMap>
  )
}
