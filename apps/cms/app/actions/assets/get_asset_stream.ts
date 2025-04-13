import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'

@inject()
export default class GetAssetStream {
  constructor(protected ctx: HttpContext) {}

  async handle() {
    let key = this.ctx.params['*'] && this.ctx.params['*'].join('/')

    if (!key && !key?.length) {
      key = this.ctx.request.qs().load
    }

    if (!key) {
      throw new Exception('Asset key was not found')
    }

    const info = await drive.use().getMetaData(key)
    const stream = await drive.use().getStream(key)

    this.ctx.response.header('Content-Type', info.contentType!)

    // this.ctx.response.header('Access-Control-Expose-Headers', 'Content-Disposition')
    // this.ctx.response.header('Content-Disposition', `inline; filename="${key.split('/').pop()}"`)
    // this.ctx.response.header('Content-Length', info.contentLength?.toString() || '0')

    return this.ctx.response.stream(stream)
  }
}
