import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className="text-2xl font-bold">Deck.gl Playground</div>
      <Outlet />
    </React.Fragment>
  )
}
