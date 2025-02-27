import { User } from '#auth/domain/user'
import CollectionTypes from '#collections/enums/collection_types'
import States from '#enums/state'
import Collection from '#models/collection'
import { BaseBuilder } from '../../builder/base_builder.js'

type IUser = User | undefined

export default class CollectionBuilder extends BaseBuilder<typeof Collection, Collection> {
  constructor(protected user: IUser = undefined) {
    super(Collection)
  }

  static new(user: IUser = undefined) {
    return new CollectionBuilder()
  }

  display() {
    this.query.preload('asset')
    this.public().withArticleCount()
    return this
  }

  root() {
    this.query.whereNull('parentId')
    return this
  }

  series() {
    this.query.where('collectionTypeId', CollectionTypes.SERIES)
    return this
  }

  public() {
    this.whereHasArticles()
    this.query.where({ stateId: States.PUBLIC })
    return this
  }

  whereHasArticles() {
    this.query.whereHas('articlesFlatttened', (query) => query.apply((scope) => scope.published()))
    return this
  }

  withArticles(
    orderBy: 'sort_order' | 'root_sort_order' = 'sort_order',
    direction: 'asc' | 'desc' = 'asc',
    limit: number | undefined = undefined
  ) {
    this.query.preload('articles', (query) =>
      query
        .preload('assets')
        .apply((scope) => scope.forDisplay)
        .apply((scope) => scope.published())
        .orderBy(orderBy, direction)
        .if(limit, (truthy) => truthy.groupLimit(limit!))
    )
    return this
  }

  withChildren() {
    this.query.preload('children', (query) =>
      query
        .where('stateId', States.PUBLIC)
        .whereHas('articles', (articles) =>
          articles
            .apply((scope) => scope.forCollectionDisplay())
            .apply((scope) => scope.published())
        )
    )
    return this
  }

  withArticleCount() {
    this.query.withCount('articlesFlatttened', (query) => query.apply((scope) => scope.published()))
    return this
  }

  orderLastUpdated() {
    this.query.apply((scope) => scope.withPostLatestPublished()).select(['collections.*'])
    return this
  }
}
