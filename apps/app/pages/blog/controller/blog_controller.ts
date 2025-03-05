import { HttpContext } from '@adonisjs/core/http'
import ArticleRepository from '../../../articles/respository/article_repository.js'
import { inject } from '@adonisjs/core'
import { AllArticleViewModel } from '../../../admin/articles/view_models/all_article_view_model.js'
import { ArticleTransformer } from '../../../articles/domain/article_transfomer.js'

@inject()
export default class BlogController {
  constructor(protected articleRepository: ArticleRepository) {}
  async render({ inertia }: HttpContext) {
    const items = this.articleRepository.getBlogs()
    const articles = await ArticleTransformer.fromDomain(items).serialize()

    return inertia.render('blog/view', { vm: AllArticleViewModel.fromDomain(articles).serialize() })
  }
}
