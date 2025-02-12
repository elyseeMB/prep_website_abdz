import type { HttpContext } from '@adonisjs/core/http'
import { TaxonomyRepository } from '../../taxonomies/repositories/taxonomy_repository.js'
import { inject } from '@adonisjs/core'

@inject()
export default class HomeController {
  constructor(private taxonomyRepository: TaxonomyRepository) {}

  async render({ inertia }: HttpContext) {
    const doc = await this.taxonomyRepository.getList().query.exec()
    console.log(doc)

    // const categories = doc.reduce((acc, value) => {
    //   acc[value.$attributes.name] = { article: value.articles, count: value.$extras }
    //   return acc
    // }, {})

    return inertia.render('home')
  }
}
