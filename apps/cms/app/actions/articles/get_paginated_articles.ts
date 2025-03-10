import Article from '#models/article'
import { articleIndexValidator } from '#validators/article_index'
import { Infer } from '@vinejs/vine/types'

type Params = Infer<typeof articleIndexValidator>

export default class GetPaginatedArticles {
  static async handle({ page = 1, perPage = 100 }: Params = {} as Params) {
    return await Article.query()
      .preload('authors')
      .preload('taxonomies')
      .orderBy('createdAt', 'desc')
      .paginate(page, perPage)
  }
}
