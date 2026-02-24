import { createFileRoute } from '@tanstack/react-router'
import { ArcLayer } from '@deck.gl/layers'
import { useState, useMemo } from 'react'

import { DeckMap } from '@/components/deck/deck-map'
import { VIEW_STATES, generateArcs, type ArcData } from '@/lib/deck-utils'
import { ExamplePanel, SliderField } from '@/components/example-panel'

export const Route = createFileRoute('/examples/arc')({
  component: ArcExamplePage,
})

function ArcExamplePage() {
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
    <DeckMap
      initialViewState={VIEW_STATES.india}
      layers={layers}
      showStyleSwitcher
      showPerformancePanel
    >
      <ExamplePanel
        title="Arc Layer"
        onReset={() => {
          setArcCount(20)
          setArcWidth(2)
        }}
      >
        <SliderField
          label={`Arcs: ${arcCount}`}
          id="arc-count"
          min={1}
          max={45}
          value={arcCount}
          onChange={setArcCount}
        />
        <SliderField
          label={`Width: ${arcWidth}px`}
          id="arc-width"
          min={1}
          max={10}
          value={arcWidth}
          onChange={setArcWidth}
        />
      </ExamplePanel>
    </DeckMap>
  )
}
