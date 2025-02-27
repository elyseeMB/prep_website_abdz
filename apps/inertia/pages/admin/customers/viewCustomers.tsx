import { Table, Tag } from '@website/design-system'
import {
  TableWrapper,
  TbodyWrapper,
  TdWrapper,
  ThWrapper,
  TheadWrapper,
  TrWrapper,
} from '@website/design-system/src/organisms/table/table.js'

export default function viewCustomers({
  currentUser,
  customers,
}: {
  currentUser: PropsCurrentUser
  customers: any
}) {
  const formatDate = new Intl.DateTimeFormat()
  console.log(customers.filter((c) => c.articles))

  return (
    <div className="relative w-full">
      <article className="relative w-full h-auto grid grid-row-start-1 grid-row-end-auto shadow-[0_0_0_1px_rgba(237,239,242,1),0_0_2px_0_rgba(0,0,0,0.12)] rounded-8px m-1px p-5">
        <ul role="list" className="divide-y divide-gray-100">
          {customers.map((c) => (
            <a key={c.id} href="#" className="font-medium">
              <li className="flex justify-between gap-x-6 py-5 hover:bg-gray-1 transition-200 px-4 rounded">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{c.fullName}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{c.email}</p>
                  </div>
                </div>

                <div className="shrink-0 sm:flex gap-2 items-start">
                  <Tag className="before:hidden" type="taxonomy">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M20 22H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5zm-8-9a6 6 0 1 1 0-12a6 6 0 0 1 0 12"
                      />
                    </svg>
                    {c.role.name}
                  </Tag>
                  {c.profile && (
                    <Tag className="before:hidden" type="taxonomy">
                      {c.profile.company}
                    </Tag>
                  )}
                  {c.articles?.length > 1 && (
                    <Tag
                      className="bg-pink-50 text-pink-700 ring-pink-700/10 before:bg-pink-700 before:hidden"
                      type="taxonomy"
                    >
                      count article: {c.articles?.length}
                    </Tag>
                  )}
                </div>
              </li>
            </a>
          ))}
        </ul>
      </article>
    </div>
  )
}
