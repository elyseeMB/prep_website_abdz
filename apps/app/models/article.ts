import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, computed, manyToMany, scope } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Category from './category.js'
import States from '#enums/state'
import SlugService from '#articles/services/slug_service'
import Collection from './collection.js'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

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

  @manyToMany(() => Category, {
    pivotTable: 'taxonomies',
    pivotForeignKey: 'article_id',
    pivotRelatedForeignKey: 'category_id',
  })
  declare categories: ManyToMany<typeof Category>

  @manyToMany(() => Collection, {
    pivotColumns: ['sort_order', 'root_collection_id', 'root_sort_order'],
  })
  declare collections: ManyToMany<typeof Collection>

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

  static published = scope<
    typeof Article,
    (query: ModelQueryBuilderContract<typeof Article>) => void
  >((query) => query.where('state_id', States.PUBLIC))

  static forDisplay = scope<
    typeof Article,
    (query: ModelQueryBuilderContract<typeof Article>) => void
  >((query) => {
    query.preload('categories')
  })
}
