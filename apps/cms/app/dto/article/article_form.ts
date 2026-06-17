import { BaseModelDto } from '@adocasts.com/dto/base'
import AssetDto from '../asset/asset.js'
import States from '#enums/state'
import ArticleTypes from '#enums/article_types'
import Article from '#models/article'

export default class ArticleFormDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare slug: string
  declare pageTitle: string | null
  declare description: string | null
  declare metaDescription: string | null
  declare canonical: string | null
  declare summary: string
  declare content: string | null
  declare stateId: States
  declare viewCount: number
  declare articleTypeId: ArticleTypes
  declare publishAt: string | null
  declare createdAt: string
  declare updatedAt: string

  declare thumbnail: AssetDto | null
  declare covers: AssetDto | null
  declare taxonomyIds: number[]

  constructor(article?: Article) {
    super()

    if (!article) {
      return
    }

    this.id = article.id
    this.title = article.title
    this.slug = article.slug
    this.pageTitle = article.pageTitle
    this.description = article.description
    this.metaDescription = article.metaDescription
    this.canonical = article.canonical
    this.summary = article.summary
    this.content = article.content
    this.stateId = article.stateId
    this.viewCount = article.viewCount
    this.articleTypeId = article.articleTypeId
    this.publishAt = article.publishAt?.toISO()!
    this.createdAt = article.createdAt?.toISO()!
    this.updatedAt = article.updatedAt?.toISO()!
    this.thumbnail = article.thumbnails.length ? new AssetDto(article.thumbnails[0]) : null
    this.covers = article.covers.length ? new AssetDto(article.covers[0]) : null
    this.taxonomyIds = article.taxonomies?.map((row) => row.id) ?? []
  }
}
