import { HttpContext } from '@adonisjs/core/http'
import ArticleRepository from '../../../articles/respository/article_repository.js'
import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import { TaxonomyRepository } from '../../../taxonomies/repositories/taxonomy_repository.js'
import { AllTaxonomyViewModel } from '../../../taxonomies/view_models/all_taxonomy_view_model.js'

@inject()
export default class UpdateArticleController {
  static validator = vine.compile(
    vine.object({
      title: vine.string().minLength(3).maxLength(100),
      summary: vine.string().minLength(3).maxLength(250),
      content: vine.string().minLength(3),
      taxonomyId: vine.number(),
    })
  )

  constructor(
    private repository: ArticleRepository,
    private TaxnomyRepository: TaxonomyRepository
  ) {}

  async render({ inertia, params }: HttpContext) {
    const [article, taxonomies] = await Promise.all([
      this.repository.withTaxonomy(params.id),
      this.TaxnomyRepository.all(),
    ])

    return inertia.render('admin/articles/update', {
      article: article,
      taxonomies: AllTaxonomyViewModel.fromDomain(taxonomies).serialize(),
    })
  }

  async execute({ response, request }: HttpContext) {
    const { title, summary, content, taxonomyId } = await request.validateUsing(
      UpdateArticleController.validator
    )

    await this.repository.update(
      {
        id: request.param('id')!,
        title,
        summary,
        content,
      },
      taxonomyId
    )

    return response.redirect().toRoute('admin.articles.index')
  }
}
