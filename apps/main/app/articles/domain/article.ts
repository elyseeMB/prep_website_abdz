import { Entity } from '#core/domain/entity.'
import { DateTime } from 'luxon'
import { ArticleIdentifier } from './article_identitfier.js'
import { ManyToMany } from '@adonisjs/lucid/types/relations'
import Asset from '#models/asset'
import States from '#enums/state'
import ArticleTypes from '#enums/article_types'

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
  stateId: States
  ArticleTypeId: ArticleTypes
  title: string
  slug: string
  description: string | null
  routeUrl: string
  publishAtISO: string | null | undefined
  publishAtDisplay: string
  watchMinutes: string | number
  series: any | null
  topics: any[] | null
  asset: any | null
  meta: Record<string, any>
}

export class Article extends Entity<Properties> {
  static create(properties: Properties) {
    return new this(properties)
  }
}
