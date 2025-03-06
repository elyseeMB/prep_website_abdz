import { client } from '~/pages/login.js'
import { Button, Tag, FormField } from '@website/design-system'
import States from '#enums/state'

type Items = {
  id: number
  title: string
  summary: string
  taxonomyName: string
  taxonomyId: number
  stateId: number
}

function useShowUrl(id: string) {
  return client.$url('admin.articles.edit', {
    params: { id },
  })
}

/*  background: linear-gradient(0deg, #ffffff, #ffffff),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.03) 100%);
  box-shadow:
    0 0 0 1px rgba(25 28 33 / 0.14),
    0 1.5px 2px 0 rgba(0 0 0 / 0.12); 
    
    shrink-0 sm:flex gap-1 sm:flex-col sm:items-end

    relative flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_0_1px_rgba(124,124,124,0.17),_0_1.5px_2px_0_rgba(0,0,0,0.02)] rounded-full line-height-1 py-2px px-4 text-sm line-height-normal bg-none before:content-empty before:block before:w-8px before:h-8px before:rounded-full before:bg-green-5 hover:bg-gray-1 transition-200
    */

export default function List({
  vm,
  currentUser,
}: {
  currentUser: PropsCurrentUser
  vm: Props<Items[]>
}) {
  return (
    <div className="w-full">
      <h1> hello {currentUser.name} </h1>

      <ul role="list" className="divide-y divide-gray-100">
        {vm.map((article) => (
          <a key={article.id} href={useShowUrl(article.id.toString())} className="font-medium">
            <li className="flex justify-between gap-x-6 py-5 hover:bg-gray-1 transition-200 px-4 rounded">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">{article.title}</p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">{article.summary}</p>
                </div>
              </div>
              <div className="shrink-0 sm:flex gap-2 items-start">
                <Tag type="taxonomy">{article.taxonomyName}</Tag>
                <Tag type="state">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    className="mix-blend-hard-light"
                  >
                    <path
                      fill="currentColor"
                      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m5.457-12.543L11 15.914l-4.207-4.207l1.414-1.414L11 13.086l5.043-5.043z"
                    />
                  </svg>

                  {States[article.stateId]}
                </Tag>
              </div>
            </li>
          </a>
        ))}
      </ul>
    </div>
  )
}
