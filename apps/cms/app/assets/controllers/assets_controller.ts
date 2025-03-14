import DestroyAsset from '#actions/assets/destroy_asset'
import GetAssetStream from '#actions/assets/get_asset_stream'
import StoreAsset from '#actions/assets/store_asset'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class AssetsController {
  @inject()
  async store({ response }: HttpContext, storeAsset: StoreAsset) {
    return response.status(200).json(await storeAsset.handle())
  }

  @inject()
  async show(_: HttpContext, getAssetStream: GetAssetStream) {
    return getAssetStream.handle()
  }

  @inject()
  async destroy({ response }: HttpContext, destroyAsset: DestroyAsset) {
    await destroyAsset.handle()
    return response.status(204)
  }
}
