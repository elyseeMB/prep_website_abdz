import { client } from '~/pages/login.js'

type Items = {
  id: number
  title: string
  summary: string
  categoryName: string
  categoryId: number
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
  // console.log(vm)
  return (
    <div className="md:container md:mx-auto p-8">
      <h1> hello {currentUser.name} </h1>
      <ul role="list" className="divide-y divide-gray-100">
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
                <span
                  className={`inline-flex items-center rounded-md bg-${article.categoryId === 1 ? 'yellow' : 'blue'}-50 px-2 py-1 text-xs font-medium text-${article.categoryId === 1 ? 'yellow' : 'blue'}-800 ring-1 ring-${article.categoryId === 1 ? 'yellow' : 'blue'}-600/20 ring-inset`}
                >
                  {article.categoryName}
                </span>
              </div>
            </li>
          </a>
        ))}
      </ul>
    </div>
  )
}
