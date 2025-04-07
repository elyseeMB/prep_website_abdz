import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare name: string

  @column()
  declare biography: string | null

  @column()
  declare location: string | null

  @column()
  declare website: string | null

  @column()
  declare company: string | null

  @column()
  declare twitterUrl: string | null

  @column()
  declare facebookUrl: string | null

  @column()
  declare instagramUrl: string | null

  @column()
  declare linkedinUrl: string | null

  @column()
  declare youtubeUrl: string | null

  @column()
  declare githubUrl: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
