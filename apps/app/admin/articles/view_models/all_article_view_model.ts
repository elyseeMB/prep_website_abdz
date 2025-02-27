import { Article } from '../../../articles/domain/article.js'

export type AllArticleViewModelSerialized = ReturnType<AllArticleViewModel['serialize']>

export class AllArticleViewModel {
  constructor(private articles: Article[]) {}

  static fromDomain(articles: Article[]) {
    return new this(articles)
  }

  serialize() {
    return this.articles.map((article) => ({
      id: article.getIdentifier().toString(),
      title: article.props.title,
      summary: article.props.summary,
      taxonomyName: article.props.taxonomyName,
      taxonomyId: article.props.taxonomyId,
      stateId: article.props.stateId,
    }))
  }
}
