import UpdateAsset from '#actions/assets/update_asset'
import Article from '#models/article'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export type AssetContract = {
  id: number
}

type Params = {
  article: Article
  asset: AssetContract
  order?: number
}

export default class SyncArticleAsset {
  static async handle({ article, asset, order = 0 }: Params, trx?: TransactionClientContract) {
    if (!asset?.id) {
      return
    }

    const record = await UpdateAsset.handle(asset, trx)

    await record?.related('articles').sync({ [article.id]: { sort_order: order } })
    return asset
  }
}
