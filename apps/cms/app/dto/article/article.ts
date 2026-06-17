import { BaseModelDto } from '@adocasts.com/dto/base'

import ArticleTypes from '#enums/article_types'
import States from '#enums/state'
import Article from '#models/article'
import AssetDto from '../asset/asset.js'
import TaxonomyDto from '../taxonomy/taxonomy.js'

export default class ArticleDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare slug: string
  declare summary: string
  declare content: string | null
  declare stateId: States
  declare viewCount: number
  declare articleTypeId: ArticleTypes
  declare publishAt: string | null
  declare createdAt: string
  declare updatedAt: string

  declare comments: unknown
  declare assets: AssetDto[]
  declare thumbnails: AssetDto[]
  declare covers: AssetDto[]
  declare taxonomies: TaxonomyDto[]
  declare collections: unknown
  declare authors: unknown

  declare meta: Record<string, any>

  constructor(article?: Article) {
    super()

    if (!article) {
      return
    }

    this.id = article.id
    this.title = article.title
    this.slug = article.slug
    this.summary = article.summary
    this.content = article.content
    this.stateId = article.stateId
    this.viewCount = article.viewCount
    this.articleTypeId = article.articleTypeId
    this.publishAt = article.publishAt?.toISO()!
    this.createdAt = article.createdAt?.toISO()!
    this.updatedAt = article.updatedAt?.toISO()!

    this.comments = article.comments
    this.assets = AssetDto.fromArray(article.assets)
    this.thumbnails = AssetDto.fromArray(article.thumbnails)
    this.covers = AssetDto.fromArray(article.covers)
    this.taxonomies = TaxonomyDto.fromArray(article.taxonomies)
    this.collections = article.collections
    this.authors = article.authors

    this.meta = article.$extras
  }
}
