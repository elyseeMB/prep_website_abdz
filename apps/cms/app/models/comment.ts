import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Article from './article.js'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare articleId: number | null

  @column()
  declare userId: number | null

  @column()
  declare replyTo: number | null

  @column()
  declare stateId: number

  @column()
  declare name: string | null

  @column()
  declare body: string
  bodyDisplay: string = ''

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Article)
  declare article: BelongsTo<typeof Article>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @hasMany(() => Comment, { foreignKey: 'replyTo' })
  declare responses: HasMany<typeof Comment>

  @belongsTo(() => Comment, { foreignKey: 'replyTo' })
  declare parent: BelongsTo<typeof Comment>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
