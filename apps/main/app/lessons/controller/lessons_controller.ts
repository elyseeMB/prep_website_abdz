import { HttpContext } from '@adonisjs/core/http'
import { TaxonomyRepository } from '../../taxonomies/repositories/taxonomy_repository.js'
import { inject } from '@adonisjs/core'
import { TopicListVM } from '../../topics/view_models/topicsVM.js'
import Article from '#models/article'
import ArticleRepository from '../../articles/respository/article_repository.js'
import router from '@adonisjs/core/services/router'
import { ArticleListVM } from '../../articles/view_model/view_model_article.js'
import Comment from '#models/comment'
import States from '#enums/state'

@inject()
export default class LessonsController {
  constructor(
    protected taxonomyRepository: TaxonomyRepository,
    protected articleRepository: ArticleRepository
  ) {}
  async index({ view, request, params }: HttpContext) {
    let { page = '1', sort = 'latest', topic = '' } = request.qs()

    console.log(request.qs())

    let sortField: keyof Article = 'title'
    let sortDir: 'asc' | 'desc' = 'desc'
    let topics = await this.taxonomyRepository.getForArticleFilter()

    let topicActive: TopicListVM

    if (topic) {
      topics = topics.map((t) => {
        if (t.slug !== topic) {
          return t
        }
        t.meta.isSelected = true
        topicActive = t
        return t
      })
    }

    switch (sort) {
      case 'alphabetical':
        sortField = 'title'
        sortDir = 'asc'
        break
      default:
        sortField = 'createdAt'
        break
    }

    const recent = await this.articleRepository.getCachedLatestLessons()
    const items = await this.articleRepository
      .getLessons()
      .clearOrder()
      .orderBy(sortField, sortDir)
      .if(topic, (q) => q.whereHasTaxonomy(topicActive))
      .selectListVM()
      .paginate(page, 5, router.makeUrl('lessons.index', params))

    const rows = items.map((article) => new ArticleListVM(article))

    return view.render('pages/lessons/view', { recent, rows, items, topics, topic })
  }

  async show({ view, params, route }: HttpContext) {
    const article = await this.articleRepository.findCachedBySlug(params.slug)

    const comments = await Comment.query()
      .where('articleId', article.id)
      .whereIn('stateId', [States.PUBLIC, States.ARCHIVED])
      .preload('user')
      .orderBy('createdAt')
    const commentCountResults = await Comment.query()
      .where('articleId', article.id)
      .where('stateId', States.PUBLIC)
      .count('*', 'total')
      .first()

    view.share(article)
    const commentCount = commentCountResults?.$extras.total || 0

    return view.render('pages/lessons/show', {
      comments,
      commentCount,
    })
  }
}
