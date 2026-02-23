import { Outlet, createRootRoute } from '@tanstack/react-router'
import { AnimatedBackground } from '@/components/animated-background'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <AnimatedBackground />
      <Outlet />
    </>
  )
}
