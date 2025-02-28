import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { TaxonomyRepository } from '../../../taxonomies/repositories/taxonomy_repository.js'
import CollectionRepository from '../../../collections/repository/collection_repository.js'
import { CollectionListViewModel } from '#collections/view_models/collection_list_view_model'

@inject()
export default class HomeController {
  constructor(
    protected taxonomyRepository: TaxonomyRepository,
    protected collectionRepository: CollectionRepository
  ) {}

  async render({ inertia, view }: HttpContext) {
    return inertia.render('home')
  }
}
