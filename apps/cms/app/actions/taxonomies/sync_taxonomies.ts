import Article from '#models/article'
import Collection from '#models/collection'
import { Exception } from '@adonisjs/core/exceptions'

type Resource = Article | Collection

type Params = {
  resource: Resource
  ids?: number[]
}

export default class SyncTaxonomies {
  static async handle({ resource, ids = [] }: Params) {
    const taxonomies = ids.reduce(
      (prev, currentId, i) => ({
        ...prev,
        [currentId]: {
          sort_order: i,
        },
      }),
      {}
    )
    switch (true) {
      case resource instanceof Article:
        await resource.related('taxonomies').sync(taxonomies)
        break
      case resource instanceof Collection:
        await resource.related('taxonomies').sync(taxonomies)
        break
      default:
        throw new Exception('Sync Taxnomomies has not yet implemented')
    }
  }
}
