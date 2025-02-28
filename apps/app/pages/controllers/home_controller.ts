import type { HttpContext } from '@adonisjs/core/http'
import { TaxonomyRepository } from '../../taxonomies/repositories/taxonomy_repository.js'
import { inject } from '@adonisjs/core'
import CollectionRepository from '../../collections/repository/collection_repository.js'
import { CollectionListViewModel } from '../../collections/view_models/collection_list_view_model.js'

@inject()
export default class HomeController {
  constructor(
    protected taxonomyRepository: TaxonomyRepository,
    protected collectionRepository: CollectionRepository
  ) {}

  async render({ inertia, view }: HttpContext) {
    const series = await this.collectionRepository.getLastUpdated(1, true)

    // const categories = doc.reduce((acc, value) => {
    //   acc[value.$attributes.name] = { article: value.articles, count: value.$extras }
    //   return acc
    // }, {})

    return inertia.render('home', { series: CollectionListViewModel.fromDomain(series) })
  }
}
