import ArticleTypes from '#enums/article_types'
import States from '#enums/state'
import Article from '#models/article'
import { articleIndexValidator } from '#validators/article_index'
import type { HttpContext } from '@adonisjs/core/http'
import { AllArticleCmsViewModel } from '../view_model/all_article_cms_view_model.js'
import GetPaginatedArticles from '#actions/articles/get_paginated_articles'

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

  create({ inertia }: HttpContext) {
    return inertia.render('articles/form')
  }
}
