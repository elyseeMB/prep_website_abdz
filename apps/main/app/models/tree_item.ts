import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class TreeItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare index: number

  @column()
  declare depth: number

  @column()
  declare parentId: number

  @column()
  declare children: JSON

  @belongsTo(() => TreeItem, {
    foreignKey: 'parentId',
  })
  declare parent: BelongsTo<typeof TreeItem>

  @hasMany(() => TreeItem, {
    foreignKey: 'parentId',
  })
  declare childrenAll: HasMany<typeof TreeItem>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
