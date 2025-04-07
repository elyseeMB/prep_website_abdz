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
import Collection from './collection.js'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Infer } from '@vinejs/vine/types'
import { loginValidator } from '../auth/validator/auth_validator.js'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email', 'fullName'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare roleId: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare rememberMeToken?: string

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

  @hasMany(() => Collection, {
    foreignKey: 'ownerId',
  })
  declare collections: HasMany<typeof Collection>

  @hasOne(() => Profile)
  declare profile: HasOne<typeof Profile>

  static async login(
    auth: Authenticator<Authenticators>,
    { email, password, remember }: Infer<typeof loginValidator>
  ) {
    const user = await this.verifyCredentials(email, password)
    console.log(user)
    await auth.use('web').login(user, remember)
    return user
  }

  static async logout(auth: Authenticator<Authenticators>) {
    await auth.use('web').logout()
  }
}
