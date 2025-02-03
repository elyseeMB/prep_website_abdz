import { PropsWithChildren } from 'react'
import { Sidebar } from '../admin/sidebar.js'
import { Footer } from '../admin/footer.js'
import { useAuth } from '~/hooks/useAuth.js'

type Props = PropsWithChildren<{
  title: string
}>

export function LayoutAdmin({ children, title }: Props) {
  const currentUser = useAuth()
  return (
    <div className="dashboard__layout">
      hello : {currentUser?.name}
      <Sidebar />
      <div className="main">{children}</div>
      <Footer />
    </div>
  )
}
