import { LayoutAdmin } from '~/components/layouts/admin.js'

export function setLayout(name: string, page: { layout?: any }) {
  if (name.includes('admin')) {
    page.layout = (page) => {
      return <LayoutAdmin children={page} title="fdsfd" />
    }
  } else if (name.includes('pastes')) {
  } else {
  }

  return page
}
