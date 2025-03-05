import { Article } from '../../../articles/domain/article.js'

export type AllArticleViewModelSerialized = ReturnType<AllArticleViewModel['serialize']>

export class AllArticleViewModel {
  constructor(private articles: Article[]) {
    console.log(articles)
  }

  static fromDomain(articles: Article[]) {
    return new this(articles)
  }

  serialize() {
    return this.articles.map((article) => ({
      id: article.getIdentifier().toString(),
      title: article.props.title,
      authors: article.props.authors,
      summary: article.props.summary,
      taxonomies: article.props.taxonomies,
      thumbnails: article.props.thumbnails,
    }))
  }
}
