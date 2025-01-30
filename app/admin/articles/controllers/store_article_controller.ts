import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { ArticleRepository } from '../../../articles/respository/article_repository.js'
import { inject } from '@adonisjs/core'
import { CategoryRepository } from '../../../taxonomies/categories/repositories/category_repository.js'
import { AllCategoryViewModel } from '../../../taxonomies/categories/view_models/all_category_view_model.js'
import db from '@adonisjs/lucid/services/db'
import Category from '#models/category'
import Article from '#models/article'

@inject()
export default class StoreArticleController {
  static validator = vine.compile(
    vine.object({
      title: vine.string().minLength(3).maxLength(100),
      summary: vine.string().minLength(5).maxLength(255),
      slug: vine.string().minLength(3).maxLength(100).nullable(),
      markdown: vine.string().minLength(3),
      categoryId: vine.number(),
      stateId: vine.number(),
    })
  )

  constructor(
    private repository: ArticleRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async render({ inertia }: HttpContext) {
    const categories = await this.categoryRepository.all()

    return inertia.render('admin/articles/create', {
      categories: AllCategoryViewModel.fromDomain(categories).serialize(),
    })
  }

  async execute({ request, response }: HttpContext) {
    const { title, summary, markdown, slug, categoryId, stateId } = await request.validateUsing(
      StoreArticleController.validator
    )

    console.log(slug)
    await this.repository.create(
      {
        title,
        summary,
        contentHTML: markdown,
        stateId,
        slug,
      },
      categoryId
    )

    return response.redirect().toRoute('admin.articles.index')
  }
}
