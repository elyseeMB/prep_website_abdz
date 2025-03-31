import { HttpContext } from '@adonisjs/core/http'
import ArticleRepository from '../../../articles/respository/article_repository.js'
import { inject } from '@adonisjs/core'
import { ArticleListVM } from '../../../articles/view_model/view_model_article.js'
import router from '@adonisjs/core/services/router'

@inject()
export default class BlogController {
  constructor(protected articleRepository: ArticleRepository) {}
  async render({ view, request, params }: HttpContext) {
    const { page = 1, sortBy = 'createdAt', sort = 'desc' } = request.qs()

    console.log(request.qs())

    const items = await this.articleRepository
      .getBlogs()
      .orderBy(sortBy, sort)
      .paginate(page, 5, router.makeUrl('blog.index', params))

    const rows = items.map((article) => new ArticleListVM(article))

    return view.render('pages/blogs/view', {
      items,
      rows,
    })
  }
}
