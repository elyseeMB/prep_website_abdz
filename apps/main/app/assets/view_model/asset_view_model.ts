import Asset from '#models/asset'
import { randomUUID } from 'crypto'
import { AssetIdendifier } from '../domain/asset_identifier.js'

export class AssetVM extends AssetIdendifier {
  constructor(asset: Asset) {
    super({ value: asset.id.toString() ?? randomUUID() })
  }
}
