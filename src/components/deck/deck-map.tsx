import { useCallback, useMemo, useState } from 'react'
import DeckGL from '@deck.gl/react'
import { MapView } from '@deck.gl/core'
import Map from 'react-map-gl/maplibre'
import type { MapViewState, PickingInfo } from '@deck.gl/core'
import type { Layer } from '@deck.gl/core'

import 'maplibre-gl/dist/maplibre-gl.css'
import type { WithBasicProps } from '@/lib/utils'
import { MAP_STYLES } from '@/lib/deck-utils'
import { MapStyleSwitcher, type MapStyleKey } from './map-style-switcher'

type DeckMapProps = WithBasicProps<{
  initialViewState?: Partial<MapViewState>
  layers?: Layer[]
  onHover?: (info: PickingInfo) => void
  onClick?: (info: PickingInfo) => void
  mapStyle?: string
  showStyleSwitcher?: boolean
  children?: React.ReactNode
}>

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 77.5946,
  latitude: 12.9716,
  zoom: 11,
  pitch: 0,
  bearing: 0,
}

export function DeckMap({
  initialViewState = INITIAL_VIEW_STATE,
  layers = [],
  onHover,
  onClick,
  mapStyle = MAP_STYLES.dark,
  showStyleSwitcher = false,
  children,
}: DeckMapProps) {
  const [viewState, setViewState] = useState<MapViewState>({
    ...INITIAL_VIEW_STATE,
    ...initialViewState,
  } as MapViewState)

  const [activeStyleKey, setActiveStyleKey] = useState<MapStyleKey>('dark')

  const resolvedMapStyle = showStyleSwitcher
    ? MAP_STYLES[activeStyleKey]
    : mapStyle

  const handleViewStateChange = useCallback(
    ({ viewState }: { viewState: MapViewState }) => {
      setViewState(viewState)
    },
    [],
  )

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
      >
        <Map mapStyle={resolvedMapStyle} />
      </DeckGL>
      {children}
      {showStyleSwitcher ? (
        <div className="absolute right-4 bottom-8">
          <MapStyleSwitcher
            value={activeStyleKey}
            onChange={setActiveStyleKey}
          />
        </div>
      ) : null}
    </div>
  )
}
