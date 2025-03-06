import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import ArticleRepository from '../../../articles/respository/article_repository.js'
import { AllArticleViewModel } from '../view_models/all_article_view_model.js'
import ArticleTypes from '#enums/article_types'
import emitter from '@adonisjs/core/services/emitter'
import CollectionRepository from '../../../collections/repository/collection_repository.js'

@inject()
export default class ListArticleController {
  constructor(
    private readonly repository: ArticleRepository,
    private collection: CollectionRepository
  ) {}

  async render({ inertia }: HttpContext) {
    const articles = await this.repository.all()

    const [test] = await this.repository
      .findBy('slug', 'facilis-quas-curtus-conqueror-sponte-adsuesco-totam-impedit')
      .query.exec()

    // console.log(test)
    const [collection] = await this.collection.getList().query.exec()

    return inertia.render('admin/articles/list', {
      vm: AllArticleViewModel.fromDomain(articles).serialize(),
    })
  }
}
