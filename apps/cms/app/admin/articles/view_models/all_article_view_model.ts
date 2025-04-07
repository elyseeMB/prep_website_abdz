import { Entity } from '#core/domain/entity.'
import { Identifier } from '#core/domain/identifier.'
import { Article } from '../../../articles/domain/article.js'

type Properties = {
  id: Identifier
  stateId: number
  postTypeId: number
  paywallTypeId: number
  title: string
  slug: string
  description: string | null
  routeUrl: string
  publishAtISO: string | null | undefined
  publishAtDisplay: string
  watchMinutes: string | number
  // series: PostListSeriesVM | null
  // topics: TopicRelationListVM[] | null
  // asset: AssetVM | null
  meta: Record<string, any>
}

export type AllArticleViewModelSerialized = ReturnType<AllArticleViewModel['serialize']>

export class AllArticleViewModel extends Entity<Properties> {
  constructor(private articles: Article[]) {}

  static fromDomain(articles: Article[]) {
    return new this(articles)
  }

  serialize() {
    return this.articles.map((article) => ({
      id: article.getIdentifier().toString(),
      title: article.props.title,
      summary: article.props.summary,
      authors: article.props.authors,
      taxonomies: article.props.taxonomies,
      thumbnails: article.props.thumbnails,
    }))
  }
}
