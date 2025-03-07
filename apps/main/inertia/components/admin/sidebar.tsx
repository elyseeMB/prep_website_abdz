import { client } from '@website/rpc/client'

export function Sidebar() {
  const articleIndexUrl = client.$url('admin.articles.index')
  const BlogIndexUrl = client.$url('admin.pages.blogs')
  const UserIndexUrl = client.$url('admin.pages.users')
  return (
    <div className="sidebar p-0 m-0 bg-#dcd9d945 border border-#efeeee border-1.5 border-left ">
      sidebar
      <nav className="mt-5">
        <ul className="flex flex-col gap-2 px-2">
          <a href={articleIndexUrl}>
            <li className="btn_sidebar">article</li>
          </a>
          <a href={BlogIndexUrl}>
            <li className="btn_sidebar">Blog</li>
          </a>
          <a href={UserIndexUrl}>
            <li className="btn_sidebar">User</li>
          </a>
          <a href={BlogIndexUrl}>
            <li className="btn_sidebar">Collection</li>
          </a>
          <a href={BlogIndexUrl}>
            <li className="btn_sidebar">Comments</li>
          </a>
          <a href={BlogIndexUrl}>
            <li className="btn_sidebar">taxonomies</li>
          </a>
          <a href={BlogIndexUrl}>
            <li className="btn_sidebar">assets</li>
          </a>
        </ul>
      </nav>
    </div>
  )
}
