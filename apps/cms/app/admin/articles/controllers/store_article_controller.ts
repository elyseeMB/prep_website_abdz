import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import ArticleRepository from '../../../articles/respository/article_repository.js'
import { inject } from '@adonisjs/core'
import { TaxonomyRepository } from '../../../taxonomies/repositories/taxonomy_repository.js'
import { AllTaxonomyViewModel } from '../../../taxonomies/view_models/all_taxonomy_view_model.js'

@inject()
export default class StoreArticleController {
  static validator = vine.compile(
    vine.object({
      title: vine.string().minLength(3).maxLength(100),
      summary: vine.string().minLength(5).maxLength(255),
      slug: vine.string().minLength(3).maxLength(100).nullable(),
      markdown: vine.string().minLength(3),
      taxonomyId: vine.number(),
      stateId: vine.number(),
    })
  )

  constructor(
    private repository: ArticleRepository,
    private TaxnomyRepository: TaxonomyRepository
  ) {}

  async render({ inertia }: HttpContext) {
    const taxonomies = await this.TaxnomyRepository.all()

    return inertia.render('admin/articles/create', {
      taxonomies: AllTaxonomyViewModel.fromDomain(taxonomies).serialize(),
    })
  }

  async execute({ request, response }: HttpContext) {
    const { title, summary, markdown, slug, taxonomyId, stateId } = await request.validateUsing(
      StoreArticleController.validator
    )

    await this.repository.create(
      {
        title,
        summary,
        contentHTML: markdown,
        stateId,
        slug,
      },
      taxonomyId
    )

    return response.redirect().toRoute('admin.articles.index')
  }
}
