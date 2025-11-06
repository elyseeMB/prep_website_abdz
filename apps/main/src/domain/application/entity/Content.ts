import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export class Content extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare description: string

  @column()
  declare online: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  get getId() {
    return this.id
  }

  get getTitle() {
    return this.title
  }

  get getSlug() {
    return this.slug
  }

  get getDescription() {
    return this.description
  }

  get getOnline() {
    return this.online
  }

  get getCreatedAt() {
    return this.createdAt
  }

  get getUpdatedAt() {
    return this.updatedAt
  }

  set setId(id: number) {
    this.id = id
  }

  set setTitle(title: string) {
    this.title = title
  }

  set setSlug(slug: string) {
    this.slug = slug
  }

  set setDescription(description: string) {
    this.description = description
  }

  set setOnline(online: boolean) {
    this.online = online
  }

  set setCreatedAt(createdAt: DateTime) {
    this.createdAt = createdAt
  }

  set setUpdatedAt(updatedAt: DateTime) {
    this.updatedAt = updatedAt
  }
}
