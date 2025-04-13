import Article from '#models/article'
import Asset from '#models/asset'
import drive from '@adonisjs/drive/services/main'
import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class DestroyArticle {
  static async byId(id: number) {
    const article = await Article.findOrFail(id)
    await this.#destroy(article)
  }

  static async handle(article: Article) {
    await this.#destroy(article)
    return article
  }

  static async #destroy(article: Article) {
    const deldetable = await db.transaction(async (trx) => {
      article.useTransaction(trx)

      await article.related('authors').detach()
      await article.related('collections').detach()
      await article.related('taxonomies').detach()
      await this.#destroyComments(article, trx)

      const deleteTableAssets = await this.#destroyAssets(article, trx)

      await article.delete()
      return { assets: deleteTableAssets }
    })

    await this.#destroyAssetFiles(deldetable.assets)
  }

  static async #destroyComments(article: Article, trx: TransactionClientContract) {
    // const comments = await article.related('comments').query().select('id')
    // const commentIds = comments.map((comment) => comment.id)

    await article.related('comments').query().delete()
  }

  static async #destroyAssets(article: Article, trx: TransactionClientContract) {
    const assets = await article.related('assets').query().select(['id', 'filename'])
    const assetIds = assets.map((asset) => asset.id)
    const unusedQuery = Asset.query({ client: trx })
      .whereIn('id', assetIds)
      .whereDoesntHave('articles', (query) => query)

    const unused = await unusedQuery.clone()
    await article.related('assets').detach()
    await unusedQuery.delete()

    return unused
  }

  static async #destroyAssetFiles(assets: Asset[]) {
    for (let asset of assets) {
      await drive.use().delete(asset.filename)
    }
  }
}
