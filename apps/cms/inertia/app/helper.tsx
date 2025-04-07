import LayoutAdmin from '~/layouts/admin.js'
import AuthLayout from '~/layouts/auth_layout.tsx'

export function setLayout(name: string, page: { layout?: any }) {
  page.layout = (page) => {
    return (
      <>
        {name.startsWith('auth/') ? (
          <AuthLayout title={name} children={page} />
        ) : (
          <LayoutAdmin children={page} title={name} />
        )}
      </>
    )
  }
}
