import { PropsWithChildren } from 'react'
import { Wrapper } from '../ui/dropdown-menu/wrapper.js'
import { Breadcrumps } from '../ui/breadcrumbs/breadcrumbs.js'
import { Navbar } from '../ui/navbar/navbar.js'
import '../../css/app.css'

const data = [
  {
    page: 'home',
    url: '/',
  },
  {
    page: 'posts',
    url: '/posts',
  },
  {
    page: 'collections',
    url: '/collections',
  },
]

type Props = PropsWithChildren<{
  title: string
}>

export default function LayoutAdmin({ children }: Props) {
  return (
    <div className="w-full">
      <Navbar />
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumps items={data} />
      </header>
      <Wrapper className="text-sm mx-auto max-w-7xl px-4">{children}</Wrapper>
    </div>
  )
}
