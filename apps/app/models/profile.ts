import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

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
}
