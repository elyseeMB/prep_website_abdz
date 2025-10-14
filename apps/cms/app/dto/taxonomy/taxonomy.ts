import { BaseModelDto } from '@adocasts.com/dto/base'

import Taxonomy from '#models/taxonomy'
import ArticleDto from '../article/article.js'
import AssetDto from '../asset/asset.js'

export default class TaxonomyDto extends BaseModelDto {
  declare id: number
  declare ownerId: number
  declare rootParentId: number | null
  declare parentId: number | null
  declare index: number
  declare depth: number
  declare assetId: number | null
  declare name: string
  declare slug: string
  declare description: string
  declare createdAt: string
  declare updatedAt: string
  declare owner: unknown
  declare organisation: any

  declare asset: AssetDto | null
  declare parent: TaxonomyDto | null
  declare children: TaxonomyDto[] | null
  declare articles: ArticleDto[]
  declare Collections: unknown

  declare meta: Record<string, any>

  constructor(taxonomy?: Taxonomy) {
    super()
    if (!taxonomy) {
      return
    }
    // console.log(taxonomy)
    this.id = taxonomy.id
    this.ownerId = taxonomy.ownerId
    this.rootParentId = taxonomy.rootParentId
    this.parentId = taxonomy.parentId
    this.index = taxonomy.index
    this.depth = taxonomy.depth
    this.assetId = taxonomy.assetId
    this.name = taxonomy.name
    this.slug = taxonomy.slug
    this.description = taxonomy.description
    this.createdAt = taxonomy.createdAt?.toISO()!
    this.updatedAt = taxonomy.updatedAt?.toISO()!
    this.owner = taxonomy.owner
    this.asset = taxonomy.asset && new AssetDto(taxonomy.asset)
    this.parent = taxonomy.parent && new TaxonomyDto(taxonomy.parent)
    this.children = TaxonomyDto.fromArray(taxonomy.children)
    this.articles = ArticleDto.fromArray(taxonomy.articles)
    this.Collections = taxonomy.Collections
    this.organisation = taxonomy.organisation

    this.meta = taxonomy.$extras
  }
}
