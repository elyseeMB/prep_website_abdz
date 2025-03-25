import Taxonomy from '#models/taxonomy'
import { randomUUID } from 'crypto'
import { ArticleListVM } from '../../articles/view_model/view_model_article.js'
import { TopicIdentifier } from '../domain/topic_identifier.js'

export class TopicBaseVM extends TopicIdentifier {
  declare id: number
  declare parentId: number | null
  declare name: string
  declare slug: string
  declare description: string
  declare asset: unknown
  declare articles: ArticleListVM[]
  declare Collections: unknown
  declare meta: Record<string, any>

  constructor(topic: Taxonomy | undefined = undefined) {
    super({ value: topic?.id.toString() || randomUUID() })
    if (!topic) {
      return
    }
    this.id = topic.id
    this.parentId = topic.parentId
    this.name = topic.name
    this.slug = topic.slug
    this.description = topic.description
    this.asset = topic.asset
    this.articles = topic.articles.map((article) => new ArticleListVM(article))
    this.Collections = topic.Collections
    this.meta = topic.$extras
  }
}

export class TopicListVM extends TopicBaseVM {
  declare articles: ArticleListVM[] | null
  constructor(topic: Taxonomy | undefined = undefined) {
    super(topic)
    if (!topic) {
      return
    }
    this.articles = topic.articles?.map((article) => new ArticleListVM(article))
    this.meta = {
      articlesCount: topic.$extras,
    }
  }

  static consume(results: unknown[]) {
    return this.consumable(TopicListVM, results)
  }
}
