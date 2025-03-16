import { Tag } from '@website/design-system'
import { tuyau } from '~/lib/tuyau.js'

type Props = {
  id: number
  title: string
  author: string
  state: string
  type: string
  published: string
}

export function ListItem({ id, title, author, state, type, published }: Props) {
  const route = tuyau.$url('articles.edit', {
    params: [id],
  })

  return (
    // <ul role="list" className="text-sm divide-y divide-gray-100">
    //   <a href={route} className="font-sm">
    //     <li className="flex justify-between items-center gap-6 hover:bg-gray-100 transition p-5 rounded bg-gray-100/50">
    //       <div className="flex min-w-0 gap-x-4">
    //         <div className="min-w-0 flex-auto">
    //           <p className="text-sm/6 font-semibold text-gray-900"> {title} </p>
    //           <p className="mt-1 truncate text-xs/5 text-gray-500">{author} </p>
    //         </div>
    //       </div>
    //       <div className="shrink-0 sm:flex gap-10 justify items-start">
    //         <Tag type="taxonomy"> {type} </Tag>
    //         <Tag type="state">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="14"
    //             height="14"
    //             viewBox="0 0 24 24"
    //             className="mix-blend-hard-light"
    //           >
    //             <path
    //               fill="currentColor"
    //               d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m5.457-12.543L11 15.914l-4.207-4.207l1.414-1.414L11 13.086l5.043-5.043z"
    //             />
    //           </svg>
    //           {state}
    //         </Tag>
    //         <div>
    //           <p className="mt-1 truncate text-xs/5 text-gray-500">{published}</p>
    //         </div>
    //       </div>
    //     </li>
    //   </a>
    // </ul>

    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>State</th>
          <th>Type</th>
          <th>Publish</th>
        </tr>
      </thead>
    </table>
  )
}
