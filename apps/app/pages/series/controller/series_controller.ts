import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { CollectionListViewModel } from '../../../collections/view_models/collection_list_view_model.js'
import CollectionRepository from '../../../collections/repository/collection_repository.js'
import CollectionBuilder from '../../../collections/builder/collection_builder.js'
import { Collection } from '#collections/domain/collection'
import { CollectionIdentifier } from '#collections/domain/collection_identifier'
import { BaseBuilder } from '../../../builder/base_builder.js'
import { LucidRow } from '@adonisjs/lucid/types/model'

@inject()
export default class SerieController {
  constructor(protected collectionRepository: CollectionRepository) {}

  static async transformer(builder: CollectionBuilder) {
    const collections = await builder.query.exec()
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

  async render({ inertia, view }: HttpContext) {
    const series = this.collectionRepository.getLastUpdated(1, true)
    const collections = await SerieController.transformer(series)

    return inertia.render('series/seriesList', {
      series: CollectionListViewModel.fromDomain(collections),
    })
  }
}
