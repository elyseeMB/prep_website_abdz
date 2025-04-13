import Asset from '#models/asset'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export type AssetContract = {
  id?: number
}

export default class UpdateAsset {
  static async handle(asset: AssetContract, trx?: TransactionClientContract) {
    if (!asset?.id) {
      return
    }
    const record = await Asset.query({ client: trx }).where({ id: asset.id }).firstOrFail()
    await record.save()
    return record
  }
}
