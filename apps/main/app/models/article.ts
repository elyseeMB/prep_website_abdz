import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  column,
  computed,
  hasMany,
  manyToMany,
  scope,
} from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import States from '#enums/state'
import SlugService from '#articles/services/slug_service'
import Collection from './collection.js'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Comment from './comment.js'
import User from './user.js'
import Taxonomy from './taxonomy.js'
import Asset from './asset.js'
import AssetTypes from '#assets/enums/asset_types'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare summary: string

  @column()
  declare content: string

  @column()
  declare stateId: States

  @column()
  declare viewCount: number

  @column()
  declare publishAt: DateTime | null

  @column()
  declare articleTypeId: number

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @manyToMany(() => Asset, {
    pivotTable: 'asset_articles',
    pivotColumns: ['sort_order'],
    onQuery: (q) => q.where('assetTypeId', AssetTypes.THUMBNAIL),
  })
  declare assets: ManyToMany<typeof Asset>

  @manyToMany(() => Asset, {
    pivotTable: 'asset_articles',
    pivotColumns: ['sort_order'],
    onQuery: (q) => q.where('assetTypeId', AssetTypes.THUMBNAIL),
  })
  declare thumbnails: ManyToMany<typeof Asset>

  @manyToMany(() => Asset, {
    pivotTable: 'asset_articles',
    pivotColumns: ['sort_order'],
    onQuery: (q) => q.where('assetTypeId', AssetTypes.COVER),
  })
  declare covers: ManyToMany<typeof Asset>

  @manyToMany(() => Taxonomy, {
    pivotTable: 'article_taxonomies',
    pivotForeignKey: 'article_id',
    pivotRelatedForeignKey: 'taxonomy_id',
    pivotColumns: ['sort_order'],
  })
  declare taxonomies: ManyToMany<typeof Taxonomy>

  @manyToMany(() => Collection, {
    pivotColumns: ['sort_order', 'root_collection_id', 'root_sort_order'],
  })
  declare collections: ManyToMany<typeof Collection>

  @manyToMany(() => User, {
    pivotTable: 'author_articles',
    pivotColumns: ['author_type_id'],
  })
  declare authors: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async slugifySlug(post: Article) {
    const slugify = new SlugService<typeof Article>({
      startegy: 'dbIncrement',
      fields: ['title'],
    })
    if (post.$dirty.title && !post.$dirty.slug && !post.slug) {
      post.slug = await slugify.make(Article, 'title', post.title)
    }
    post.slug = await slugify.make(Article, 'slug', post.slug)
  }

  @computed()
  get isPublished(): boolean {
    const isDeclare = this.stateId === States.PUBLIC
    if (!this.publishAt) {
      return isDeclare
    }
    return isDeclare
  }

  static forCollectionDisplay = scope<
    typeof Article,
    (query: ModelQueryBuilderContract<typeof Article>) => void
  >(
    (
      query,
      {
        orderBy,
        direction,
      }: { orderBy: 'sort_order' | 'root_sort_order'; direction: 'asc' | 'desc' } = {
        orderBy: 'sort_order',
        direction: 'asc',
      }
    ) => {
      query.apply((scope) => scope.forDisplay()).orderBy(orderBy, direction)
    }
  )

  static published = scope<
    typeof Article,
    (query: ModelQueryBuilderContract<typeof Article>) => void
  >((query) => query.where('state_id', States.PUBLIC))

  static forDisplay = scope<
    typeof Article,
    (query: ModelQueryBuilderContract<typeof Article>) => void
  >((query) => {
    query
      .preload('thumbnails')
      .preload('taxonomies')
      .preload('authors', (authors) => authors.preload('profile'))
  })
}
