import { createFileRoute } from '@tanstack/react-router'
import { BaseButton, Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { CircleDot, Flame, Box } from 'lucide-react'
import ExampleCard from '@/components/example-card'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

const EXAMPLES = [
  {
    id: 'scatterplot',
    title: 'Scatterplot Layer',
    description:
      'Render thousands of GPU-accelerated points with dynamic sizing and color control.',
    path: '/examples/scatterplot',
    tag: 'Points Rendering',
    icon: <CircleDot className="size-6" />,
  },
  {
    id: 'heatmap',
    title: 'Heatmap Layer',
    description:
      'Visualize density distributions and spatial intensity patterns.',
    path: '/examples/heatmap',
    tag: 'Density Analysis',
    icon: <Flame className="size-6" />,
  },
  {
    id: 'column',
    title: '3D Column Layer',
    description:
      'Extruded 3D columns powered by WebGL for elevation-based visualization.',
    path: '/examples/column',
    tag: '3D Visualization',
    icon: <Box className="size-6" />,
  },
] as const satisfies {
  id: string
  title: string
  description: string
  path: string
  tag?: string
  icon?: React.ReactNode
}[]

function RouteComponent() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="text-foreground mb-6 text-5xl font-bold tracking-tight md:text-6xl">
            Deck.gl Playground
          </div>

          <div className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
            GPU-accelerated geospatial rendering experiments focused on
            performance benchmarking and large-scale dataset visualization.
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg">Explore Examples</Button>
            <BaseButton variant="outline" size="lg" asChild>
              <a
                href="https://github.com/MrHacker26/deckgl-playground"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </BaseButton>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {EXAMPLES.map((example, index) => (
            <motion.div
              key={example.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ExampleCard {...example} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
