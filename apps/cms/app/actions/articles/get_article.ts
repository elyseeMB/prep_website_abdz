import Article from '#models/article'

export default class GetArticle {
  static async byId(id: number) {
    return Article.query()
      .where({ id })
      .preload('thumbnails', (query) => query.orderBy('sort_order'))
      .preload('covers', (query) => query.orderBy('sort_order'))
      .preload('taxonomies')
      .firstOrFail()
  }
}
