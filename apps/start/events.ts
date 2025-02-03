import ArticleSync from '#events/article_sync'
import Article from '#models/article'
import emitter from '@adonisjs/core/services/emitter'
const ArticleListener = () => import('#listeners/article_listener')

declare module '@adonisjs/core/types' {
  interface EventsList {
    'article:sync': { article: Article; views: number }
  }
}

emitter.on('article:sync', [ArticleListener, 'handle'])

emitter.onError((event, error, eventData) => {
  console.log(event, error, eventData)
})
