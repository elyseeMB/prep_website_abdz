import { inject } from '@adonisjs/core'
import CollectionRepository from '../../../collections/repository/collection_repository.js'
import { HttpContext } from '@adonisjs/core/http'
import { TaxonomyRepository } from '../../../taxonomies/repositories/taxonomy_repository.js'
import { AllTaxonomyViewModel } from '../../../taxonomies/view_models/all_taxonomy_view_model.js'
import { TaxonomyTransformer } from '../../../taxonomies/domain/taxonomy_transformer.js'

@inject()
export default class TopicsController {
  constructor(
    protected CollectionRepository: CollectionRepository,
    protected taxonomyRepository: TaxonomyRepository
  ) {}

  async render({ view }: HttpContext) {
    const topics = this.taxonomyRepository.getList()
    const topicsParse = await TaxonomyTransformer.fromDomain(topics).serialize()

    return view.render('pages/topics/view', {
      topics: AllTaxonomyViewModel.fromDomain(topicsParse).serialize(),
    })
  }

  async show({ response, params }: HttpContext) {
    const [item] = await this.taxonomyRepository.getBySlug(params.slug).query.exec()

    const children = await this.CollectionRepository.getLastUpdated()
      .whereHasTaxonomy(item)
      .query.exec()

    console.log(children)
    return
    return response.json({ doc: children })
  }
}
