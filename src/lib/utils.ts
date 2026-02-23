import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type WithBasicProps<T> = T & {
  className?: string
  style?: React.CSSProperties
}
