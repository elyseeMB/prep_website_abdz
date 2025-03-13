import StoreAsset from '#actions/assets/store_asset'
import AssetTypes from '#enums/asset_types'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DashboardController {
  async handle({ inertia }: HttpContext) {
    return inertia.render('dashboard')
  }
}
