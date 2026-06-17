import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import CollectionBuilder from '../builder/collection_builder.js'

@inject()
export default class CollectionRepository {
  constructor(protected ctx: HttpContext) {}

  get user() {
    return this.ctx.auth.isAuthenticated ? this.ctx.auth.user : undefined
  }

  builder() {
    return CollectionBuilder.new(/*this.user*/)
  }

  getList(withArticles: boolean = true, excludeIds: number[] = [], postLimit: number = 3) {
    return this.builder()
      .series()
      .if(excludeIds, (builder) => builder.exclude(excludeIds))
      .if(withArticles, (builder) => builder.withArticles('root_sort_order', 'desc', postLimit))
      .root()
      .display()
  }

  getLastUpdated(
    limit: number | undefined = undefined,
    withArticles: boolean = true,
    excludeIds: number[] = [],
    postLimit: number = 8
  ) {
    return this.queryGetLastUpdated(withArticles, excludeIds, postLimit).if(limit, (builder) =>
      builder.limit(limit!)
    )
  }

  private queryGetLastUpdated(
    withArticles: boolean = true,
    excludeIds: number[] = [],
    postLimit: number = 3
  ) {
    return this.getList(withArticles, excludeIds, postLimit).orderLastUpdated()
  }
}
