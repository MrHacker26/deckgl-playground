import { useNavigate } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { cn, type WithBasicProps } from '@/lib/utils'

type ExamplePanelProps = WithBasicProps<{
  title: string
  onReset?: () => void
  children: React.ReactNode
}>

export function ExamplePanel({
  title,
  onReset,
  children,
  className,
  style,
}: ExamplePanelProps) {
  const navigate = useNavigate()

  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2">
      <Button
        size="sm"
        variant="outline"
        icon={<ChevronLeftIcon />}
        className="glass w-fit"
        onClick={() => {
          navigate({ to: '/' })
        }}
      >
        Back
      </Button>

      <div
        className={cn('glass w-56 space-y-4 rounded-lg p-4 sm:w-64', className)}
        style={style}
      >
        <div className="text-card-foreground text-lg font-semibold">
          {title}
        </div>

        <div className="space-y-4">{children}</div>

        {onReset ? (
          <Button size="sm" onClick={onReset}>
            Reset
          </Button>
        ) : null}
      </div>
    </div>
  )
}

type SliderFieldProps = WithBasicProps<{
  label: string
  id?: string
  min: number
  max: number
  step?: number
  value: number
  onChange: (value: number) => void
}>

export function SliderField({
  label,
  id,
  min,
  max,
  step = 1,
  value,
  onChange,
  className,
  style,
}: SliderFieldProps) {
  return (
    <div className={cn('space-y-1', className)} style={style}>
      <Label htmlFor={id} className="text-muted-foreground">
        {label}
      </Label>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  )
}
