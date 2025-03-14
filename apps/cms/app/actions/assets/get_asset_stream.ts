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

    // const isExist = await drive
    //   .use()
    //   .exists(`./storage/c73a6351-57c4-45e4-8f87-744f6fceb67d/libdsbxcj1ap1vefypsmifst.png/1.png`)
    // console.log(isExist)
    // return

    const info = await drive.use('fs').getMetaData(key)
    const stream = await drive.use('fs').getStream(key)

    this.ctx.response.header('Content-Type', info.contentType!)

    return this.ctx.response.stream(stream)
  }
}
