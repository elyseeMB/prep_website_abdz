import { User } from '#auth/domain/user'
import ArticleTypes from '#enums/article_types'
import States from '#enums/state'
import Article from '#models/article'
import { BaseBuilder } from '../../builder/base_builder.js'

export default class ArticleBuilder extends BaseBuilder<typeof Article, Article> {
  constructor(protected user: User | undefined = undefined) {
    super(Article)
  }

  static new(user: User | undefined = undefined) {
    return new ArticleBuilder(user)
  }

  display({ skipPublishCheck = false } = {}) {
    this.if(!skipPublishCheck, (builder) => builder.published())
    this.orderPublished()
    this.query.apply((scope) => scope.forDisplay())
    return this
  }

  published() {
    this.query.apply((scope) => scope.published())
    return this
  }

  whereType(ArticleTypeIds: ArticleTypes[] | ArticleTypes | null) {
    this.query.if(
      Array.isArray(ArticleTypeIds),
      (query) => {
        query.where((q) =>
          (<ArticleTypes[]>ArticleTypeIds).map((articleTypeId) => {
            q.orWhere({ articleTypeId })
          })
        )
      },
      (query) => {
        query.where({ articleTypeId: ArticleTypeIds })
      }
    )
    return this
  }

  withComments() {
    this.withCommentCount()
    this.query.preload('comments', (query) =>
      query
        .whereIn('stateId', [States.PUBLIC, States.ARCHIVED])
        .preload('user')
        .orderBy('createdAt')
    )
    return this
  }

  withCommentCount() {
    this.query.withCount('comments', (query) => {
      query.where('stateId', States.PUBLIC)
    })
  }

  orderPublished() {
    this.query.orderBy([{ column: 'createdAt', order: 'desc' }])
    return this
  }
}
