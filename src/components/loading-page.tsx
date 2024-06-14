import { cn } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'

interface LoadingPageProps {
  className?: string
}

export const LoadingPage = ({ className }: LoadingPageProps) => {
  return (
    <div
      className={cn(
        'flex min-h-dvh w-full items-center justify-center',
        className,
      )}
    >
      <Loader2Icon className="size-12 animate-spin text-gray-500" />
    </div>
  )
}
