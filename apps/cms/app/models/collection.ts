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
import User from './user.js'
import Asset from './asset.js'
import Taxonomy from './taxonomy.js'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import CollectionTypes from '#enums/collection_types'
import Status from '#enums/status'
import States from '#enums/state'
import SlugService from '#services/slug_service'

export default class Collection extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ownerId: number

  @column()
  declare parentId: number | null

  @column()
  declare collectionTypeId: CollectionTypes

  @column()
  declare statusId: Status

  @column()
  declare stateId: States

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string

  @column()
  declare sortOrder: number

  @column()
  declare assetId: number | null

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

  @belongsTo(() => Collection)
  declare parent: BelongsTo<typeof Collection>

  @manyToMany(() => Article, {
    pivotTable: 'collection_articles',
    pivotColumns: ['sort_order', 'root_collection_id', 'root_sort_order'],
  })
  declare articles: ManyToMany<typeof Article>

  @manyToMany(() => Article, {
    pivotForeignKey: 'root_collection_id',
    pivotTable: 'collection_articles',
    pivotColumns: ['sort_order', 'root_collection_id', 'root_sort_order'],
  })
  declare articlesFlatttened: ManyToMany<typeof Article>

  @manyToMany(() => Taxonomy, {
    pivotTable: 'collection_taxonomies',
    pivotColumns: ['sort_order'],
  })
  declare taxonomies: ManyToMany<typeof Taxonomy>

  @hasMany(() => Collection, {
    foreignKey: 'parentId',
  })
  declare children: HasMany<typeof Collection>

  @beforeSave()
  static async slugifyName(collection: Collection) {
    if (collection.$dirty.name && !collection.$dirty.slug) {
      const slugify = new SlugService<typeof Collection>({
        startegy: 'dbIncrement',
        fields: ['name'],
      })
      collection.slug = await slugify.make(Collection, 'name', collection.name)
    }
  }

  static withPostLatestPublished = scope<
    typeof Collection,
    (query: ModelQueryBuilderContract<typeof Collection>) => void
  >((query) => query.where('state_id', States.PUBLIC))
}
