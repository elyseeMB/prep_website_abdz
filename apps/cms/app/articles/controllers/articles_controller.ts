import Article from '#models/article'
import { articleIndexValidator } from '#validators/article_index'
import type { HttpContext } from '@adonisjs/core/http'
import GetPaginatedArticles from '#actions/articles/get_paginated_articles'
import Taxonomy from '#models/taxonomy'
import { AllTAxonomiesCmsModel } from '../../taxonomy/view_model/all_taxonomy_cms_model.js'
import StoreArticle from '#actions/articles/store_article'
import GetArticle from '#actions/articles/get_article'
import ArticleDto from '../../dto/article/article.js'
import TaxonomyDto from '../../dto/taxonomy/taxonomy.js'

export default class ArticlesController {
  async index({ request, inertia }: HttpContext) {
    const data = await request.validateUsing(articleIndexValidator)
    const paginator = await GetPaginatedArticles.handle(data)
    return inertia.render('articles/index', {
      articles: ArticleDto.fromPaginator(paginator, {
        start: paginator.firstPage,
        end: paginator.lastPage,
      }),
    })
  }

  async create({ inertia }: HttpContext) {
    const taxonomies = await Taxonomy.query().orderBy('name')
    const [images] = await Article.query().preload('thumbnails')
    inertia.share({
      image: images.thumbnails[0].filename,
    })
    return inertia.render('articles/form', {
      taxonomies: TaxonomyDto.fromArray(taxonomies),
    })
  }

  /**
   * Handle from submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all()
    await StoreArticle.handle(data)
    return response.redirect().toRoute('articles.index')
  }

  /**
   * Edit individual record
   */
  async edit({ params, inertia }: HttpContext) {
    const article = await GetArticle.byId(params.id)
    const taxonomies = await Taxonomy.query().orderBy('name')

    return inertia.render('articles/form', {
      article,
      taxonomies,
    })
  }
}
