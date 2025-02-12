import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Comment from './comment.js'
import type { BelongsTo, HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Article from './article.js'
import Role from './role.js'
import Profile from './profile.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare roleId: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @manyToMany(() => Article, {
    pivotTable: 'author_articles',
    pivotColumns: ['author_type_id'],
  })
  declare articles: ManyToMany<typeof Article>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasOne(() => Profile)
  declare profile: HasOne<typeof Profile>
}
