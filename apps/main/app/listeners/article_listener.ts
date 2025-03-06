import Article from '#models/article'

export default class ArticleListener {
  async handle({ article, views }: { article: Article; views: number }) {
    if (article.viewCount && views <= article.viewCount) {
      console.log('Listener')
      return
    }
    await article.merge({ viewCount: views }).save()
  }
}
