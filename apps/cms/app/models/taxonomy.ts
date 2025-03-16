import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  belongsTo,
  column,
  hasMany,
  manyToMany,
  scope,
} from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Article from './article.js'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import User from './user.js'
import Asset from './asset.js'
import Collection from './collection.js'
import SlugService from '#services/slug_service'

export default class Taxonomy extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ownerId: number

  @column()
  declare rootParentId: number | null

  @column()
  declare parentId: number | null

  @column()
  declare levelIndex: number

  @column()
  declare assetId: number | null

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'ownerId',
  })
  declare owner: BelongsTo<typeof User>

  @belongsTo(() => Asset)
  declare asset: BelongsTo<typeof Asset>

  @belongsTo(() => Taxonomy, {
    foreignKey: 'parentId',
  })
  declare parent: BelongsTo<typeof Taxonomy>

  @hasMany(() => Taxonomy, {
    foreignKey: 'parentId',
  })
  declare children: HasMany<typeof Taxonomy>

  @manyToMany(() => Article, {
    pivotTable: 'article_taxonomies',
    pivotForeignKey: 'article_id',
    pivotRelatedForeignKey: 'taxonomy_id',
    pivotColumns: ['sort_order'],
  })
  declare articles: ManyToMany<typeof Article>

  @manyToMany(() => Collection, {
    pivotTable: 'collection_taxonomies',
    pivotColumns: ['sort_order'],
  })
  declare Collections: ManyToMany<typeof Collection>

  static hasContent = scope<
    typeof Taxonomy,
    (query: ModelQueryBuilderContract<typeof Taxonomy>) => void
  >((query) =>
    query.where((q) => q.whereHas('articles', (articles) => articles.apply((s) => s.published())))
  )

  @beforeSave()
  static async slugifyName(taxonomy: Taxonomy) {
    if (taxonomy.$dirty.name && !taxonomy.$dirty.slug) {
      const slugify = new SlugService<typeof Taxonomy>({
        startegy: 'dbIncrement',
        fields: ['name'],
      })
      taxonomy.slug = await slugify.make(Taxonomy, 'name', taxonomy.name)
    }
  }
}
