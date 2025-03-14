import Asset from '#models/asset'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'

@inject()
export default class DestroyAsset {
  declare id: number
  constructor(protected ctx: HttpContext) {
    this.id = ctx.params.id
  }

  async handle() {
    const asset = await Asset.findOrFail(this.id)
    await drive.use().delete(asset.filename)
  }
}
