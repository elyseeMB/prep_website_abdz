import { Entity } from '#core/domain/entity'
import { Identifier } from '#core/domain/identifier'
import { DateTime } from 'luxon'

type Properties = {
  id: ArticleCmsIdentifier
  articleTypeId?: number
  title: string
  slug: string
  summary: string
  content: string
  isPublished?: boolean
  publishAt?: string | null
  viewCount?: number
  stateId?: number
  authors?: any
  taxonomies?: any
  thumbnails?: any
  createdAt?: DateTime
  updatedAt?: DateTime
}

export class ArticleCmsIdentifier extends Identifier<'ArticleCmsIdentifier'> {}

export default class ArticleCms extends Entity<Properties> {
  static create(properties: Properties) {
    return new this(properties)
  }
}
