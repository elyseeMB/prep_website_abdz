import { ReactNode } from 'react'

export function Wrapper({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main className={className}>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </main>
  )
}
