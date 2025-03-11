import ArticleTypes from '#enums/article_types'
import States from '#enums/state'
import Article from '#models/article'
import { articleIndexValidator } from '#validators/article_index'
import type { HttpContext } from '@adonisjs/core/http'
import { AllArticleCmsViewModel } from '../view_model/all_article_cms_view_model.js'
import GetPaginatedArticles from '#actions/articles/get_paginated_articles'
import Taxonomy from '#models/taxonomy'
import { TaxonomyCms, TaxonomyCmsIdentifier } from '../../dto/taxonomy/taxonomy.js'
import { AllTAxonomiesCmsModel } from '../../taxonomy/view_model/all_taxonomy_cms_model.js'
import StoreArticle from '#actions/articles/store_article'

export default class ArticlesController {
  async index({ request, inertia }: HttpContext) {
    const data = await request.validateUsing(articleIndexValidator)
    const paginator = await GetPaginatedArticles.handle(data)

    return inertia.render('articles/index', {
      articles: AllArticleCmsViewModel.fromPaginator(paginator, {
        start: paginator.firstPage,
        end: paginator.lastPage,
      }),
    })
  }

  async create({ inertia }: HttpContext) {
    const taxonomies = await Taxonomy.query().orderBy('name')
    return inertia.render('articles/form', {
      taxonomies: AllTAxonomiesCmsModel.fromArray(taxonomies),
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.all()

    const doc = await StoreArticle.handle(data)
    return response.json(doc)
  }
}
