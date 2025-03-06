import { Tag } from '@website/design-system'
import { client } from '../login.js'

function useShowUrl(slug: string) {
  return client.$url('topics.show', {
    params: { slug },
  })
}

export default function TopicsList(props: any) {
  console.log(props)
  return (
    <div className="w-screen container p-2 m-auto grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-2">
      {props.topics.map((topic) => (
        <div
          key={topic.id}
          className="flex justify-between ring-1 ring-inset ring-black/10 aspect-square rounded-md p-4 hover:bg-gray/10 transition cursor-pointer"
        >
          {topic.name}
          <a href={useShowUrl(topic.slug)}>
            <Tag type="taxonomy">{topic.slug}</Tag>
          </a>
        </div>
      ))}
    </div>
  )
}
