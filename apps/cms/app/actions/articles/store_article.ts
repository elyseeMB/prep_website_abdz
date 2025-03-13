import SyncTaxonomies from '#actions/taxonomies/sync_taxonomies'
import ArticleTypes from '#enums/article_types'
import States from '#enums/state'
import Article from '#models/article'
import db from '@adonisjs/lucid/services/db'

export default class StoreArticle {
  static async handle(data: any) {
    if (!data.stateId) data.stateId = States.DRAFT
    if (!data.articleTypeId) data.articleTypeId = ArticleTypes.LESSON

    const { thumbnails, taxonomyIds, ...store } = data

    return db.transaction(async (trx) => {
      const article = await Article.create(store, {
        client: trx,
      })
      await SyncTaxonomies.handle({ resource: article, ids: taxonomyIds })

      return article
    })
  }
}
