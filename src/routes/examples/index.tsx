import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/examples/')({
  component: RouteComponent,
})

function RouteComponent() {
  // Redirect to home if someone lands on /examples/ directly
  return <Navigate to="/" />
}
