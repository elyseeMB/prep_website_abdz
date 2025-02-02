import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  title: string
}>

export function LayoutAdmin({ children, title }: Props) {
  return <div>{children}</div>
}
