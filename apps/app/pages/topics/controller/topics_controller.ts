import { inject } from '@adonisjs/core'
import CollectionRepository from '../../../collections/repository/collection_repository.js'
import { HttpContext } from '@adonisjs/core/http'
import { TaxonomyRepository } from '../../../taxonomies/repositories/taxonomy_repository.js'

@inject()
export default class TopicsController {
  constructor(
    protected CollectionRepository: CollectionRepository,
    protected taxonomyRepository: TaxonomyRepository
  ) {}

  async render({ inertia }: HttpContext) {
    const topics = await this.taxonomyRepository.getList()
    return inertia.render('topics/topicsList', { topics })
  }

  async show({ inertia, response, params }: HttpContext) {
    const [item] = await this.taxonomyRepository.getBySlug(params.slug).query.exec()

    const children = await this.CollectionRepository.getLastUpdated()
      .whereHasTaxonomy(item)
      .query.exec()

    console.log(children)
    return
    return response.json({ doc: children })
  }
}
