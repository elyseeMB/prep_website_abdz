import ModelCollection from '#models/collection'
import CollectionBuilder from '../builder/collection_builder.js'
import { Collection } from './collection.js'
import { CollectionIdentifier } from './collection_identifier.js'

export class CollectionTransformer {
  constructor(private collections: CollectionBuilder) {}

  static fromDomain(collections: CollectionBuilder) {
    return new this(collections)
  }

  async serialize() {
    const collections = await this.collections.query.exec()
    return collections.map((collection) => {
      return this.toDomain(collection)
    })
  }

  toDomain(collection: ModelCollection) {
    return Collection.create({
      id: CollectionIdentifier.fromString(collection.id.toString()),
      name: collection.name,
      slug: collection.slug,
      articles: collection.articles,
      asset: collection.asset,
    })
  }
}
