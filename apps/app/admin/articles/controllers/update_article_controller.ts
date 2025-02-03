import { HttpContext } from '@adonisjs/core/http'
import ArticleRepository from '../../../articles/respository/article_repository.js'
import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import { CategoryRepository } from '../../../taxonomies/categories/repositories/category_repository.js'
import { AllCategoryViewModel } from '../../../taxonomies/categories/view_models/all_category_view_model.js'

@inject()
export default class UpdateArticleController {
  static validator = vine.compile(
    vine.object({
      title: vine.string().minLength(3).maxLength(100),
      summary: vine.string().minLength(3).maxLength(250),
      content: vine.string().minLength(3),
      categoryId: vine.number(),
    })
  )

  constructor(
    private repository: ArticleRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async render({ inertia, params }: HttpContext) {
    const [article, categories] = await Promise.all([
      this.repository.withCategory(params.id),
      this.categoryRepository.all(),
    ])

    return inertia.render('admin/articles/update', {
      article: article,
      categories: AllCategoryViewModel.fromDomain(categories).serialize(),
    })
  }

  async execute({ response, request }: HttpContext) {
    const { title, summary, content, categoryId } = await request.validateUsing(
      UpdateArticleController.validator
    )

    await this.repository.update(
      {
        id: request.param('id')!,
        title,
        summary,
        content,
      },
      categoryId
    )

    return response.redirect().toRoute('admin.articles.index')
  }
}
