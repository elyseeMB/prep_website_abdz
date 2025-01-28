import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { ArticleRepository } from '../../../articles/respository/article_repository.js'
import { AllArticleViewModel } from '../view_models/all_article_view_model.js'

@inject()
export default class ListArticleController {
  constructor(private readonly repository: ArticleRepository) {}

  async render({ inertia }: HttpContext) {
    const articles = await this.repository.all()

    return inertia.render('admin/articles/list', {
      vm: AllArticleViewModel.fromDomain(articles).serialize(),
    })
  }
}
