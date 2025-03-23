import { HttpContext } from '@adonisjs/core/http'
import ArticleRepository from '../../../articles/respository/article_repository.js'
import { inject } from '@adonisjs/core'
import { AllArticleViewModel } from '../../../admin/articles/view_models/all_article_view_model.js'
import { ArticleTransformer } from '../../../articles/domain/article_transfomer.js'
import { ArticleListVM } from '../../../articles/view_model/view_model_article.js'
import router from '@adonisjs/core/services/router'

@inject()
export default class BlogController {
  constructor(protected articleRepository: ArticleRepository) {}
  async render({ view, request, params, response }: HttpContext) {
    const { page = 1, sortBy = 'createdAt', sort = 'desc' } = request.qs()

    const items = await this.articleRepository
      .getBlogs()
      .orderBy(sortBy, sort)
      .paginate(page, 5, router.makeUrl('blog.index', params))
    // .paginate(page, 5, router.makeUrl('blog.index', params))

    const rows = items.map((article) => new ArticleListVM(article))

    return view.render('pages/blogs/view', {
      items,
      rows,
    })
  }
}
