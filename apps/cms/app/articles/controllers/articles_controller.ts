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
import UpdateArticle from '#actions/articles/update_article'
import ArticleFormDto from '../../dto/article/article_form.js'
import DestroyArticle from '#actions/articles/destroy_article'

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
    const articles = await GetArticle.byId(params.id)
    const taxonomies = await Taxonomy.query().orderBy('name')

    return inertia.render('articles/form', {
      article: new ArticleFormDto(articles),
      taxonomies: TaxonomyDto.fromArray(taxonomies),
    })
  }

  async update({ params, response, request }: HttpContext) {
    const data = request.all()
    const article = await Article.findOrFail(params.id)

    await UpdateArticle.handle(article, data)

    return response.redirect().toRoute('articles.index')
  }

  async destroy({ params, response }: HttpContext) {
    const article = await Article.findOrFail(params.id)

    await DestroyArticle.handle(article)
    return response.redirect().toRoute('articles.index')
  }
}
