import { tuyau } from '~/lib/tuyau.ts'
import { Dropdowns } from '../dropdowns/dropdowns.tsx'
import { Navbar } from '../navbar/navbar.tsx'

export function Sidebar() {
  const collection = tuyau.$url('collections.index')
  const articles = tuyau.$url('articles.index')
  const articlesCreate = tuyau.$url('articles.create')
  const taxonomies = tuyau.$url('taxonomies.index')

  return (
    <div className="sidebar">
      sidebar
      <Dropdowns
        name="Post"
        items={[
          {
            name: 'All post',
            url: articles,
          },
          {
            name: 'Blogs',
            url: 'Blog',
          },
          {
            name: 'create new article +',
            url: articlesCreate,
          },
        ]}
      />
      <Dropdowns
        onSubmit={() => {}}
        name="Collection"
        items={[
          {
            name: 'All post',
            url: collection,
          },
          {
            name: 'Blogs',
            url: 'Blog',
          },
        ]}
      />
      <Dropdowns
        onSubmit={() => {}}
        name="Taxonomy"
        items={[
          {
            name: 'All post',
            url: taxonomies,
          },
          {
            name: 'create',
            url: 'Blog',
          },
        ]}
      />
    </div>
  )
}
