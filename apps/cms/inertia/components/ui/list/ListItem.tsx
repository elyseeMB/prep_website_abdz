import ArticleTypes from '#enums/article_types'
import States from '#enums/state'
import { router } from '@inertiajs/react'
import { Button, Tag, TdWrapper, TrWrapper } from '@website/design-system'
import { ChangeEvent } from 'react'
import { tuyau } from '~/lib/tuyau.js'

type Author = {
  fullName: string
}

type Props = {
  id: number
  title: string
  authors: Author[]
  stateId: number
  type?: string
  articleTypeId: number
  publisheAt: string | null
}

export function ListItem({ id, title, authors, stateId, publisheAt, articleTypeId }: Props) {
  const route = tuyau.$url('articles.edit', {
    params: [id],
  })

  const deleteRoute = tuyau.$url('articles.destroy', {
    params: [id],
  })

  const handleDestroy = (e: React.FormEvent) => {
    e.preventDefault()
    router.delete(deleteRoute)
  }

  return (
    <TrWrapper className="border border-1.4 border-b-gray/20" key={id}>
      <TdWrapper className="w-50">
        <a href={route}>{title}</a>
      </TdWrapper>
      <TdWrapper>{authors[0]?.fullName}</TdWrapper>
      <TdWrapper>
        <Tag type="state">{States[stateId]}</Tag>
      </TdWrapper>
      <TdWrapper>
        <Tag>{ArticleTypes[articleTypeId]} </Tag>
      </TdWrapper>
      <TdWrapper>{publisheAt ?? 'non défini'}</TdWrapper>
      <TdWrapper>
        <form onSubmit={handleDestroy}>
          <Button type="submit">Delete</Button>
        </form>
      </TdWrapper>
    </TrWrapper>
  )
}
