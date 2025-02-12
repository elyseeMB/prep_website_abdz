import { client } from '~/pages/login.js'
import { Button, Tag } from '@website/design-system'

type Items = {
  id: number
  title: string
  summary: string
  taxonomyName: string
  taxonomyId: number
}

function useShowUrl(id: string) {
  return client.$url('admin.articles.edit', {
    params: { id },
  })
}

export default function List({
  vm,
  currentUser,
}: {
  currentUser: PropsCurrentUser
  vm: Props<Items[]>
}) {
  return (
    <div className="md:container md:mx-auto p-8">
      <h1> hello {currentUser.name} </h1>
      <ul role="list" className="divide-y divide-gray-100">
        <Button primary={true} label="Bonjour je suis le vscode" />

        {vm.map((article) => (
          <a key={article.id} href={useShowUrl(article.id.toString())}>
            <li className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900"> {article.title} </p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">{article.summary}</p>
                </div>
              </div>
              <div className=" flex flex-column gap-2 hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900"> {currentUser.name} </p>
                <p className="mt-1 text-xs/5 text-gray-500">
                  id : <span>{article.id}</span>
                </p>
                <Tag>{article.taxonomyName}</Tag>
              </div>
            </li>
          </a>
        ))}
      </ul>
    </div>
  )
}
