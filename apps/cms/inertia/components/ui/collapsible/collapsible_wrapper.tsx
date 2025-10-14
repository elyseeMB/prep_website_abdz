import { PropsWithChildren } from 'react'

export function Collapsible({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={className}>{children}</div>
}
