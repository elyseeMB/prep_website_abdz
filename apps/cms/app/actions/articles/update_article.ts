import SyncTaxonomies from '#actions/taxonomies/sync_taxonomies'
import ArticleTypes from '#enums/article_types'
import States from '#enums/state'
import Article from '#models/article'
import Asset from '#models/asset'
import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import SyncArticleAsset from './sync_article_assets.js'

export type AssetContract = {
  id?: number
}

export default class UpdateArticle {
  static async byId(id: number, data: any) {
    const article = await Article.findOrFail(id)
    await this.#update(article, data)
  }

  static async handle(article: Article, data: any) {
    await this.#update(article, data)
    return article
  }

  static async #update(article: Article, data: any) {
    if (!data.stateId) data.stateId = States.DRAFT
    if (!data.articleTypeId) data.articleTypeId = ArticleTypes.LESSON

    const { thumbnails, taxonomyIds, ...update } = data
    article.merge(update)

    return db.transaction(async (trx) => {
      article.useTransaction(trx)

      await article.save()
      await SyncTaxonomies.handle({ resource: article, ids: taxonomyIds })
      await SyncArticleAsset.handle({ article, asset: thumbnails }, trx)

      return article
    })
  }
}
