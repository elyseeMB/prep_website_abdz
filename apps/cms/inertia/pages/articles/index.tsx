import { Breadcrumps } from '~/components/ui/breadcrumbs/breadcrumbs.js'
import { Navbar } from '~/components/ui/navbar/navbar.js'
import { Wrapper } from '~/components/ui/dropdown-menu/wrapper.js'
import { ListItem } from '~/components/ui/list/ListItem.js'

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

export default function Index(props) {
  console.log(props)
  return (
    <div className="w-50px flex flex-col gap-2">
      {Array.from({ length: 10 }, (_, k) => (
        <ListItem
          key={k}
          title="lorem fdsf"
          author="johnDoe"
          state="public"
          type="blog"
          published="12"
        />
      ))}
    </div>
  )
}
