import { Link } from '@inertiajs/react'
import { PropsWithChildren } from 'react'
import { tuyau } from '~/lib/tuyau.ts'

type Props = PropsWithChildren<{
  title?: string
}>

export default function AuthLayout({ title, children }: Props) {
  return (
    <>
      <header>
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
              <span>CMS</span>
            </div>
          </div>
          <div
            v-if="!$page.url.includes('/organizations')"
            className="flex flex-1 justify-end gap-4"
          >
            <Link
              className="text-sm font-semibold leading-6 text-slate-900"
              href={tuyau.$url('auth.login.show')}
            >
              Login
            </Link>
          </div>
        </nav>
      </header>
      <div title={title} className="p-6 lg:p-8">
        <div className="flex flex-col justify-center space-y-6 w-full sm:w-[350px] mx-auto">
          {children}
        </div>
      </div>
    </>
  )
}
