import { client } from '~/pages/login.js'

export function Sidebar() {
  const articleIndexUrl = client.$url('admin.articles.index')
  const BlogIndexUrl = client.$url('admin.pages.blogs')
  return (
    <div className="sidebar">
      sidebar
      <nav>
        <ul>
          <a href={articleIndexUrl}>
            <li className="bg-blue-200 rounded px-2">article</li>
          </a>
          <a href={BlogIndexUrl}>
            <li className="bg-blue-200 rounded px-2">Blog</li>
          </a>
        </ul>
      </nav>
    </div>
  )
}
