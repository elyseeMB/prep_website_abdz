import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import CollectionBuilder from '../builder/collection_builder.js'
import { Collection } from '#collections/domain/collection'
import { CollectionIdentifier } from '#collections/domain/collection_identifier'

@inject()
export default class CollectionRepository {
  constructor(protected ctx: HttpContext) {}

  get user() {
    return this.ctx.auth.isAuthenticated ? this.ctx.auth.user : undefined
  }

  builder() {
    return CollectionBuilder.new(this.user)
  }

  getList(withArticles: boolean = true, excludeIds: number[] = [], postLimit: number = 3) {
    return this.builder()
      .series()
      .if(withArticles, (builder) => builder.withArticles('root_sort_order', 'desc', postLimit))
      .root()
      .display()
  }

  async getLastUpdated(
    limit: number | undefined = undefined,
    withArticles: boolean = true,
    excludeIds: number[] = [],
    postLimit: number = 8
  ) {
    const collections = await this.queryGetLastUpdated(withArticles, excludeIds, postLimit)
      .if(limit, (builder) => builder.limit(limit!))
      .query.exec()

    return collections.map((collection) => {
      return Collection.create({
        id: CollectionIdentifier.fromString(collection.id.toString()),
        name: collection.name,
        slug: collection.slug,
        articles: collection.articles,
        asset: collection.asset,
      })
    })
  }

  private queryGetLastUpdated(
    withArticles: boolean = true,
    excludeIds: number[] = [],
    postLimit: number = 3
  ) {
    return this.getList(withArticles, excludeIds, postLimit).orderLastUpdated()
  }
}
