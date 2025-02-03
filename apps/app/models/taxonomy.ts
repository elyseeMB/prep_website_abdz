import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany, scope } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Article from './article.js'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export default class Taxonomy extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare parentId: number | null

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Taxonomy, {
    foreignKey: 'parentId',
  })
  declare parent: BelongsTo<typeof Taxonomy>

  @hasMany(() => Taxonomy, {
    foreignKey: 'parentId',
  })
  declare children: HasMany<typeof Taxonomy>

  @manyToMany(() => Article, {
    pivotColumns: ['sort_order'],
  })
  declare articles: ManyToMany<typeof Article>

  // static hasContent = scope<
  //   typeof Taxonomy,
  //   (query: ModelQueryBuilderContract<typeof Taxonomy>) => void
  // >((query) => {
  //   query.whereHas('parent', (a) => a.apply((s) => s.published()))
  // })
}
