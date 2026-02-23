import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon } from 'lucide-react'
import { cn, type WithBasicProps } from '@/lib/utils'

export type ExampleCardProps = WithBasicProps<{
  title: string
  description: string
  path: string
  tag?: string
  icon?: React.ReactNode
}>

export default function ExampleCard({
  title,
  description,
  path,
  tag,
  icon,
  className,
  style,
}: ExampleCardProps) {
  return (
    <div
      style={style}
      className={cn(
        'group bg-card/50 hover:border-primary/50 hover:shadow-primary/10 relative overflow-hidden rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg',
        className,
      )}
    >
      <div className="from-primary/5 to-accent/5 absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        {icon ? (
          <div className="text-primary bg-primary/10 group-hover:bg-primary/20 mb-4 flex size-12 items-center justify-center rounded-lg transition-colors">
            {icon}
          </div>
        ) : null}

        {tag ? (
          <div className="bg-primary/10 text-primary mb-3 inline-block rounded-full px-2.5 py-1 text-xs font-medium">
            {tag}
          </div>
        ) : null}

        <div className="text-card-foreground mb-2 text-xl font-semibold tracking-tight">
          {title}
        </div>

        <div className="text-muted-foreground mb-6 text-sm leading-relaxed">
          {description}
        </div>

        <Link to={path}>
          <Button
            variant="outline"
            size="sm"
            icon={
              <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            }
            iconPosition="right"
          >
            Explore
          </Button>
        </Link>
      </div>
    </div>
  )
}
