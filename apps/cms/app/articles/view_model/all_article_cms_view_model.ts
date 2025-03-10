import { Identifier } from '#core/domain/identifier'
import {
  LucidModel,
  LucidRow,
  ModelObject,
  ModelPaginatorContract,
} from '@adonisjs/lucid/types/model'
import ArticleCms from '../dtos/article/article.js'
import { SimplePaginatorContract } from '@adonisjs/lucid/types/querybuilder'

type Pagination = {
  currentPage: number
  firstPage: number
  firstPageUrl: string
  lastPage: number
  lastPageUrl: string
  nextPageUrl: string | null
  perPage: number
  previousPageUrl: string | null
  total: number
}

type SimplePaginator = {
  start: Pick<Pagination, 'firstPage'>['firstPage']
  end: Pick<Pagination, 'lastPage'>['lastPage']
}

export class AllArticleCmsViewModel {
  constructor(private articles: ArticleCms[]) {}

  static fromDomain(articles: ArticleCms[]) {
    return new this(articles)
  }

  static fromPaginator<Model>(
    model: Model extends LucidRow ? ModelPaginatorContract<Model> : SimplePaginatorContract<Model>,
    range?: SimplePaginator
  ) {
    return {
      data: this.map(model.all()),
      meta: range,
    }
  }

  static map<Model>(model: Model[]) {
    return model.map((doc) => ({
      id: doc.id,
      title: doc.title,
      summary: doc.summary,
      authors: doc.authors,
      taxonomies: doc.taxonomies,
    }))
  }
}
