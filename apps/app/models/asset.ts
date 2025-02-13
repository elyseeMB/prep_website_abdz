import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Article from './article.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Asset extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare assetTypeId: number

  @column()
  declare filename: string

  @column()
  declare byteSize: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Article, {
    pivotTable: 'asset_articles',
    pivotColumns: ['sort_order'],
  })
  declare articles: ManyToMany<typeof Article>
}
