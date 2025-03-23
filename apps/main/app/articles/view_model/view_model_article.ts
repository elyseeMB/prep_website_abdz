import Article from '#models/article'
import { randomUUID } from 'crypto'
import { ArticleIdentifier } from '../domain/article_identitfier.js'
import ArticleTypes from '#enums/article_types'
import States from '#enums/state'
import { AssetVM } from '../../assets/view_model/view_model_asset.js'

export default class ArticleBaseVM extends ArticleIdentifier {
  declare id: number
  declare stateId: States
  declare articleTypeId: ArticleTypes
  declare paywallTypeId: number
  declare title: string
  declare slug: string
  declare description: string | null
  declare routeUrl: string
  declare publishAtISO: string | null | undefined
  declare publishAtDisplay: string
  declare watchMinutes: string | number
  declare series: any | null
  declare topics: any[] | null
  declare asset: AssetVM | null
  declare meta: Record<string, any>

  constructor(protected article: Article | undefined = undefined) {
    super({ value: article?.id.toString() || randomUUID() })

    if (!article) {
      return
    }
    this.id = article.id
    this.stateId = article.stateId
    this.articleTypeId = article.articleTypeId
    this.title = article.title
    this.slug = article.slug
    this.description = article.content
    this.publishAtISO = article.publishAt?.toISO()
    this.asset = this.#getAsset(article)
    this.meta = {}
  }

  #getAsset(article: Article) {
    if (!article.thumbnails?.length && !article.assets?.length) {
      return null
    }
    if (article.thumbnails?.length) {
      return new AssetVM(article.thumbnails.at(0)!)
    }

    return new AssetVM(article.assets.at(0)!)
  }
}

export class ArticleListVM extends ArticleBaseVM {
  constructor(article: Article | undefined = undefined) {
    super(article)

    if (!article) {
      return
    }
  }

  static consume(results: unknown[]) {
    return this.consumable(ArticleListVM, results)
  }
}
