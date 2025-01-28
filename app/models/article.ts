import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, scope } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Category from './category.js'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare summary: string

  @column()
  declare content: string

  @manyToMany(() => Category, {
    pivotTable: 'taxonomies',
    pivotForeignKey: 'article_id',
    pivotRelatedForeignKey: 'category_id',
  })
  declare categories: ManyToMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static h = scope((query) => query.where('articles.id', '=', 11))
}
