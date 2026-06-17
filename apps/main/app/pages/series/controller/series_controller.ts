import { inject } from '@adonisjs/core'
import { CollectionListViewModel } from '../../../collections/view_models/collection_list_view_model.js'
import CollectionRepository from '../../../collections/repository/collection_repository.js'
import { CollectionTransformer } from '#collections/domain/collection_transfomer'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SerieController {
  constructor(protected collectionRepository: CollectionRepository) {}

  async render({ view }: HttpContext) {
    const series = this.collectionRepository.getLastUpdated(1, true)
    const collections = await CollectionTransformer.fromDomain(series).serialize()

    return view.render('pages/series/view', {
      series: CollectionListViewModel.fromDomain(collections),
    })
  }
}
