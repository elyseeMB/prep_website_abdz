import { Exception } from '@adonisjs/core/exceptions'
import drive from '@adonisjs/drive/services/main'
import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export class StorageService {
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

    // this.this.ctx.response.header('Access-Control-Expose-Headers', 'Content-Disposition')
    // this.this.ctx.response.header('Content-Disposition', `inline; filename="${key.split('/').pop()}"`)
    // this.this.ctx.response.header('Content-Length', info.contentLength?.toString() || '0')

    return this.ctx.response.stream(stream)
  }

  async getStream(path: string) {
    const info = await drive.use().getStream(path)
    return info
  }

  async getByte(path: string) {
    const info = await drive.use().getBytes(path)
    return info
  }

  async get(path: string) {
    const info = await drive.use().getMetaData(path)
    const stream = await drive.use().getStream(path)
    this.ctx.response.header('Content-Type', info.contentType!)
    this.ctx.response.stream(stream)
    return info
  }

  async exists(key: string) {
    const exists = await drive.use().exists(key)
    return exists
  }
}
