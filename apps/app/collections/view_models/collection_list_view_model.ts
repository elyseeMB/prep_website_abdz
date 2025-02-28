import type { Collection } from '#collections/domain/collection'

export type CollectionListViewModeilSerialized = ReturnType<CollectionListViewModel['serialize']>

export class CollectionListViewModel {
  constructor(private collections: Collection[]) {}

  static fromDomain(collections: Collection[]) {
    return new this(collections)
  }

  serialize() {
    return {
      collections: this.collections.map((collection) => ({
        id: collection.getIdentifier().toString(),
        title: collection.props.name,
        articles: collection.props.articles,
        asset: collection.props.asset,
      })),
    }
  }
}
