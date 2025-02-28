import { Entity } from '#core/domain/entity.'
import { DateTime } from 'luxon'
import { CollectionIdentifier } from './collection_identifier.js'
import { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Article from '#models/article'
import Asset from '#models/asset'

// interface Asset {
//   id: number
//   assetTypeId: number
//   filename: string
//   byteSize: number
//   createdAt: string
//   updatedAt: string
// }

// interface Article {
//   id: number
//   articleTypeId: number
//   title: string
//   slug: string
//   summary: string
//   content: string
//   isPublished: boolean
//   publishAt: string | null
//   viewCount: number
//   stateId: number
//   assets: Asset[]
//   createdAt: DateTime
//   updatedAt: DateTime
// }

interface Properties {
  id: CollectionIdentifier
  name: string
  slug: string
  asset: Partial<BelongsTo<typeof Asset>>
  articles: Partial<ManyToMany<typeof Article>>
  createdAt?: DateTime
  updatedAt?: DateTime
}

export class Collection extends Entity<Properties> {
  isPublished(now: DateTime) {
    return this.props.createdAt ? this.props.createdAt < now : false
  }

  static create(properties: Properties) {
    return new this(properties)
  }
}
