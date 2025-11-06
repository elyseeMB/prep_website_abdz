import { beforeSave, column, computed, hasMany, manyToMany, scope } from '@adonisjs/lucid/orm'
import { Content } from '../../application/entity/Content.js'
import SlugService from '#articles/services/slug_service'
import States from '#enums/state'
import { DateTime } from 'luxon'
import ArticleTypes from '#enums/article_types'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Asset from '#models/asset'
import Comment from '#models/comment'
import AssetTypes from '#assets/enums/asset_types'
import Taxonomy from '#models/taxonomy'
import Collection from '#models/collection'
import User from '#models/user'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export class Post extends Content {
  @column()
  declare pageTitle: string | null

  @column()
  declare metaDescription: string | null

  @column()
  declare canonical: string | null

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
  declare articleTypeId: ArticleTypes

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

  @beforeSave()
  static async slugifySlug(post: Post) {
    const slugify = new SlugService<typeof Post>({
      startegy: 'dbIncrement',
      fields: ['title'],
    })
    if (!post.title || !post.slug) {
      return
    }

    if (post.$dirty.title && !post.$dirty.slug && !post.slug) {
      post.slug = await slugify.make(Post, 'title', post.title)
    }
    post.slug = await slugify.make(Post, 'slug', post.slug!)
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
    typeof Post,
    (query: ModelQueryBuilderContract<typeof Post>) => void
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

  static published = scope<typeof Post, (query: ModelQueryBuilderContract<typeof Post>) => void>(
    (query) => query.where('state_id', States.PUBLIC)
  )

  static forDisplay = scope<typeof Post, (query: ModelQueryBuilderContract<typeof Post>) => void>(
    (query) => {
      query
        .preload('thumbnails')
        .preload('taxonomies')
        .preload('authors', (authors) => authors.preload('profile'))
    }
  )
}
