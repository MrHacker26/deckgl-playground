import type { MapViewState } from '@deck.gl/core'
import { range } from './utils'

export type Point = {
  id: number
  coordinates: [number, number]
  value: number
}

export const VIEW_STATES = {
  bangalore: {
    longitude: 77.5946,
    latitude: 12.9716,
    zoom: 11,
    pitch: 0,
    bearing: 0,
  },
  mumbai: {
    longitude: 72.8777,
    latitude: 19.076,
    zoom: 11,
    pitch: 0,
    bearing: 0,
  },
  delhi: {
    longitude: 77.1025,
    latitude: 28.7041,
    zoom: 11,
    pitch: 0,
    bearing: 0,
  },
  world: {
    longitude: 0,
    latitude: 20,
    zoom: 1.5,
    pitch: 0,
    bearing: 0,
  },
  india: {
    longitude: 82.0,
    latitude: 22.0,
    zoom: 4.5,
    pitch: 0,
    bearing: 0,
  },
  uttarakhand: {
    longitude: 79.0193,
    latitude: 30.0668,
    zoom: 7,
    pitch: 0,
    bearing: 0,
  },
  bangalore_trips: {
    longitude: 77.5946,
    latitude: 12.9416,
    zoom: 12,
    pitch: 45,
    bearing: -10,
  },
} as const satisfies Record<string, Partial<MapViewState>>

export const MAP_STYLES = {
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  voyager: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
} as const

export function generateRandomPoints(
  count: number,
  bounds?: {
    minLng: number
    maxLng: number
    minLat: number
    maxLat: number
  },
) {
  const {
    minLng = 77.4,
    maxLng = 77.8,
    minLat = 12.8,
    maxLat = 13.1,
  } = bounds || {}
  return range(count).map((i) => ({
    id: i,
    coordinates: [
      minLng + Math.random() * (maxLng - minLng),
      minLat + Math.random() * (maxLat - minLat),
    ] as [number, number],
    value: Math.random() * 100,
  }))
}

export const CITIES = [
  { name: 'Delhi', coordinates: [77.1025, 28.7041] as [number, number] },
  { name: 'Mumbai', coordinates: [72.8777, 19.076] as [number, number] },
  { name: 'Bangalore', coordinates: [77.5946, 12.9716] as [number, number] },
  { name: 'Kolkata', coordinates: [88.3639, 22.5726] as [number, number] },
  { name: 'Chennai', coordinates: [80.2707, 13.0827] as [number, number] },
  { name: 'Hyderabad', coordinates: [78.4867, 17.385] as [number, number] },
  { name: 'Pune', coordinates: [73.8567, 18.5204] as [number, number] },
  { name: 'Ahmedabad', coordinates: [72.5714, 23.0225] as [number, number] },
  { name: 'Jaipur', coordinates: [75.7873, 26.9124] as [number, number] },
  { name: 'Lucknow', coordinates: [80.9462, 26.8467] as [number, number] },
  { name: 'Dehradun', coordinates: [78.0322, 30.3165] as [number, number] },
]

export type ArcData = {
  source: [number, number]
  target: [number, number]
  sourceName: string
  targetName: string
  value: number
}

export function generateArcs(count: number): ArcData[] {
  const arcs: ArcData[] = []
  for (let i = 0; i < CITIES.length; i++) {
    for (let j = i + 1; j < CITIES.length; j++) {
      arcs.push({
        source: CITIES[i].coordinates,
        target: CITIES[j].coordinates,
        sourceName: CITIES[i].name,
        targetName: CITIES[j].name,
        value: Math.random() * 100,
      })
    }
  }
  return arcs.sort((a, b) => b.value - a.value).slice(0, count)
}

// ─── Trips ────────────────────────────────────────────────────────────────────

export const LOOP_LENGTH = 1800 // simulation seconds (30-min loop)

export type TripData = {
  path: [number, number][] // [lng, lat] only
  timestamps: number[] // separate, monotonically increasing
  color: [number, number, number]
}

const TRIP_COLORS: [number, number, number][] = [
  [253, 128, 93], // orange
  [23, 184, 190], // cyan
  [128, 80, 255], // purple
  [255, 214, 0], // yellow
  [0, 200, 120], // green
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function generateTrips(count: number): TripData[] {
  const bounds = {
    minLng: 77.47,
    maxLng: 77.72,
    minLat: 12.86,
    maxLat: 13.06,
  }

  const maxDuration = 400

  return Array.from({ length: count }, (_, i) => {
    const startLng = lerp(bounds.minLng, bounds.maxLng, Math.random())
    const startLat = lerp(bounds.minLat, bounds.maxLat, Math.random())
    const endLng = lerp(bounds.minLng, bounds.maxLng, Math.random())
    const endLat = lerp(bounds.minLat, bounds.maxLat, Math.random())

    const waypoints = 8 + Math.floor(Math.random() * 8)
    // keep startTime early enough so trip fits within LOOP_LENGTH
    const startTime = Math.random() * (LOOP_LENGTH - maxDuration)
    const duration = 120 + Math.random() * (maxDuration - 120)

    const path: [number, number][] = []
    const timestamps: number[] = []

    for (let w = 0; w < waypoints; w++) {
      const t = w / (waypoints - 1)
      const jitter = Math.sin(t * Math.PI) * 0.018
      path.push([
        lerp(startLng, endLng, t) + (Math.random() - 0.5) * jitter,
        lerp(startLat, endLat, t) + (Math.random() - 0.5) * jitter,
      ])
      timestamps.push(startTime + t * duration)
    }

    return { path, timestamps, color: TRIP_COLORS[i % TRIP_COLORS.length] }
  })
}
