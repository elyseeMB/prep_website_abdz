import { BaseModelDto } from '@adocasts.com/dto/base'

import Asset from '#models/asset'
import ArticleDto from '../article/article.js'
import TaxonomyDto from '../taxonomy/taxonomy.js'

export default class AssetDto extends BaseModelDto {
  declare id: number
  declare assetTypeId: number
  declare filename: string
  declare byteSize: number | null
  declare createdAt: string
  declare updatedAt: string
  declare articles: ArticleDto[]
  declare collections: unknown
  declare taxonomies: TaxonomyDto[]

  constructor(asset?: Asset) {
    super()

    if (!asset) {
      return
    }
    this.id = asset.id
    this.assetTypeId = asset.assetTypeId
    this.filename = asset.filename
    this.byteSize = asset.byteSize
    this.createdAt = asset.createdAt?.toISO()!
    this.updatedAt = asset.updatedAt?.toISO()!
    this.articles = ArticleDto.fromArray(asset.articles)
    this.collections = asset.collections
    this.taxonomies = TaxonomyDto.fromArray(asset.taxonomies)
  }
}
