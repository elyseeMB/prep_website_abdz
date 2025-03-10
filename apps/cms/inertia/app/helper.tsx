import LayoutAdmin from '~/composants/layouts/admin.js'

export function setLayout(name: string, page: { layout?: any }) {
  page.layout = (page) => {
    return <LayoutAdmin children={page} title={name} />
  }
}
