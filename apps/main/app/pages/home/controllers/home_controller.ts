import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { TaxonomyRepository } from '../../../taxonomies/repositories/taxonomy_repository.js'
import CollectionRepository from '../../../collections/repository/collection_repository.js'
import { CollectionListViewModel } from '#collections/view_models/collection_list_view_model'
import ArticleRepository from '../../../articles/respository/article_repository.js'

@inject()
export default class HomeController {
  constructor(
    protected ArticleRepository: ArticleRepository,
    protected taxonomyRepository: TaxonomyRepository,
    protected collectionRepository: CollectionRepository
  ) {}

  async render({ view }: HttpContext) {
    const lessons = await this.ArticleRepository.getCachedLatestLessons()
    const blogs = await this.ArticleRepository.getCachedLatestBlogs()

    return view.render('pages/home', { lessons, blogs })
  }
}
