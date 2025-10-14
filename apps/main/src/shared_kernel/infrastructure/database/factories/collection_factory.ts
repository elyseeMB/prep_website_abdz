import factory from '@adonisjs/lucid/factories'
import Collection from '#models/collection'
import CollectionTypes from '#collections/enums/collection_types'
import { ArticleFactory } from './article_factory.js'
import { UserFactory } from './user_factory.js'
import { AssetFactory } from './asset_factory.js'

export const CollectionFactory = factory
  .define(Collection, async ({ faker }) => {
    return {
      name: faker.commerce.productName(),

      collectionTypeId: CollectionTypes.SERIES,
    }
  })
  .relation('articles', () => ArticleFactory)
  .relation('children', () => CollectionFactory)
  .relation('owner', () => UserFactory)
  .relation('asset', () => AssetFactory)
  .build()
