import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import ArticleRepository from '../../../articles/respository/article_repository.js'
import { AllArticleViewModel } from '../view_models/all_article_view_model.js'
import ArticleTypes from '#enums/article_types'
import emitter from '@adonisjs/core/services/emitter'

@inject()
export default class ListArticleController {
  constructor(private readonly repository: ArticleRepository) {}

  async render({ inertia }: HttpContext) {
    const articles = await this.repository.all()

    const [test] = await this.repository
      .findBy('slug', 'nostrum-derideo-barba-desino-solio-amo-deprimo-cohibeo')
      .query.exec()

    console.log(test)

    // await emitter.emit('article:sync', { article: test, views: 2 })

    return inertia.render('admin/articles/list', {
      vm: AllArticleViewModel.fromDomain(articles).serialize(),
    })
  }
}
