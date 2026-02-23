import { Outlet, createRootRoute } from '@tanstack/react-router'
import { AnimatedBackground } from '@/components/animated-background'
import { NotFound } from '@/components/not-found'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <>
      <AnimatedBackground />
      <Outlet />
    </>
  )
}
