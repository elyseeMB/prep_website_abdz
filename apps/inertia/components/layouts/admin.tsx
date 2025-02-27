import { PropsWithChildren } from 'react'
import { Sidebar } from '../admin/sidebar.js'
import { useAuth } from '~/hooks/useAuth.js'

type Props = PropsWithChildren<{
  title: string
}>

export function LayoutAdmin({ children, title }: Props) {
  const currentUser = useAuth()
  return (
    <div className="dashboard__layout">
      <Sidebar />
      <div className="max-w-auto px-2rem py-1rem">{children}</div>
    </div>
  )
}
