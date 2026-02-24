import { createFileRoute } from '@tanstack/react-router'
import { BaseButton, Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import {
  CircleDotIcon,
  FlameIcon,
  BoxIcon,
  SplineIcon,
  TelescopeIcon,
  NavigationIcon,
} from 'lucide-react'
import ExampleCard from '@/components/example-card'
import GradientText from '@/components/ui/gradient-text'
import { LogoIcon } from '@/components/ui/logo'
import { Navbar } from '@/components/navbar'
import { GithubIcon } from '@/components/ui/icons'

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
    icon: <CircleDotIcon className="size-6" />,
  },
  {
    id: 'arc',
    title: 'Arc Layer',
    description:
      'Visualize connections between cities with animated curved arcs across India.',
    path: '/examples/arc',
    tag: 'Connections',
    icon: <SplineIcon className="size-6" />,
  },
  {
    id: 'trips',
    title: 'Trip Layer',
    description:
      'Animated vehicle trips with glowing trails. Real-time playback with speed and trail controls.',
    path: '/examples/trips',
    tag: 'Animation',
    icon: <NavigationIcon className="size-6" />,
  },
  {
    id: 'heatmap',
    title: 'Heatmap Layer',
    description:
      'Visualize density distributions and spatial intensity patterns.',
    path: '/examples/heatmap',
    tag: 'Density Analysis',
    icon: <FlameIcon className="size-6" />,
  },
  {
    id: 'column',
    title: '3D Column Layer',
    description:
      'Extruded 3D columns powered by WebGL for elevation-based visualization.',
    path: '/examples/column',
    tag: '3D Visualization',
    icon: <BoxIcon className="size-6" />,
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
    <div className="min-h-screen px-6 pt-24 pb-16">
      <Navbar />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 space-y-6 text-center"
        >
          <div className="flex justify-center">
            <LogoIcon size={72} className="flex justify-center" />
          </div>
          <GradientText className="text-5xl font-bold md:text-7xl">
            Deck.gl Playground
          </GradientText>

          <div className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
            GPU-accelerated geospatial rendering experiments focused on
            performance benchmarking and large-scale dataset visualization.
          </div>

          <div className="flex justify-center gap-4">
            <Button size="lg" icon={<TelescopeIcon />}>
              Explore Examples
            </Button>
            <BaseButton variant="outline" size="lg" asChild>
              <a
                href="https://github.com/MrHacker26/deckgl-playground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="mr-2 size-4" />
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
