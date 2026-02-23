import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { MapPin, Home, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-8 inline-block">
            <motion.div
              className="text-primary/20 text-9xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              404
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
            >
              <MapPin className="text-primary h-20 w-20" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-foreground mb-4 text-4xl font-bold">
              Location Not Found
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Looks like you've wandered off the map! This geospatial coordinate
              doesn't exist in our dataset.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link to="/">
              <Button size="lg" icon={<Home className="size-4" />}>
                Go Home
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                size="lg"
                icon={<Search className="size-4" />}
              >
                Browse Examples
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="text-muted-foreground mt-12 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="border-border bg-card/50 inline-flex items-center gap-2 rounded-full border px-4 py-2">
              <MapPin className="size-4" />
              <span>404°N, 404°E - Unknown Territory</span>
            </div>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button
              onClick={() => window.history.back()}
              variant="ghost"
              size="sm"
              icon={<ArrowLeft className="size-4" />}
            >
              Go back to previous page
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
