import { Entity } from '#core/domain/entity.'
import { DateTime } from 'luxon'
import { ArticleIdentifier } from './article_identitfier.js'
import { ManyToMany } from '@adonisjs/lucid/types/relations'
import Asset from '#models/asset'

// type Asset = {
//   id: number
//   assetTypeId: number
//   filename: string
//   byteSize: number
//   createdAt: string
//   updatedAt: string
// }

type Properties = {
  id: ArticleIdentifier
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

export class Article extends Entity<Properties> {
  static create(properties: Properties) {
    return new this(properties)
  }
}
