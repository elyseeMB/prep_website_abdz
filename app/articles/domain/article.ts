import { Entity } from '#core/domain/entity.'
import { ArticleIdentifier } from './article_identitfier.js'

type Properties = {
  id: ArticleIdentifier
  title: string
  summary: string
  content?: string
  categoryId?: number
  categoryName?: string
}

export class Article extends Entity<Properties> {
  static create(properties: Properties) {
    return new this(properties)
  }
}
