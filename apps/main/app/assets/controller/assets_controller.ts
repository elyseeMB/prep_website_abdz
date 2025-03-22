import { HttpContext } from '@adonisjs/core/http'
import AssetService from '../services/asset_service.js'
import CacheService from '#services/cache_service'

export default class AssetController {
  async show({ request, response, params }: HttpContext) {
    const path = AssetService.getParamFilename(params)

    const doc = new CacheService()

    const a = await doc.handle('name', 'johnDoe')

    console.log(a)

    // await CacheService.set('name', 'johnDoeCache')
    // const value = await CacheService.get('name')

    // console.log(value)

    return path
  }
}
