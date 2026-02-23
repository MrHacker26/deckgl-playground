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
  uttarakhand: {
    longitude: 79.0193,
    latitude: 30.0668,
    zoom: 7,
    pitch: 0,
    bearing: 0,
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
