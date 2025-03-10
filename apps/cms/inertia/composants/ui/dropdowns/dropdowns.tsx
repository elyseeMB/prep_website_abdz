import React, { FormEvent, PropsWithChildren, ReactElement, ReactNode } from 'react'
import { useToggle } from '~/hooks/useToogle.js'

type PropsItems = {
  url: string
  name: string
}

type Props = PropsWithChildren<{
  action?: string
  name: string
  items?: PropsItems[]
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}>

export function DropdownItems({
  collapsed,
  children,
}: PropsWithChildren<{
  collapsed: boolean
}>) {
  return (
    <div
      style={{
        display: collapsed ? undefined : 'none',
      }}
    >
      {children}
    </div>
  )
}

export function Children({
  onClick,
  onBlur,
  children,
}: PropsWithChildren<{
  onClick: any
  onBlur: any
}>) {
  return (
    <button onClick={onClick} onBlur={onBlur}>
      {children}
    </button>
  )
}

export function Dropdowns({ name, items, onSubmit, children, action }: Props) {
  const [collapsed, toogle] = useToggle(false)

  return (
    <div className="relative inline-block text-left">
      <div>
        {!children ? (
          <button
            onClick={toogle}
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {name}
          </button>
        ) : (
          <Children onBlur={toogle} onClick={toogle}>
            {children}
          </Children>
        )}
      </div>

      {!children ? (
        <div
          style={{
            display: collapsed ? undefined : 'none',
          }}
          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {items?.map((item) => (
              <a
                key={item.name}
                href={item.url}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                {item.name}
              </a>
            ))}
            {onSubmit && (
              <form
                className="border-t border-1.5 border-black/10"
                onSubmit={onSubmit}
                method="POST"
                action="#"
                role="none"
              >
                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-3"
                >
                  {action}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <DropdownItems collapsed={collapsed}>{children}</DropdownItems>
      )}
    </div>
  )
}
