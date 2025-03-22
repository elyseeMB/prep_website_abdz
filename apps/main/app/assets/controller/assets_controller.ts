import { HttpContext } from '@adonisjs/core/http'
import AssetService from '../services/asset_service.js'
import CacheService from '#services/cache_service'
import { StorageService } from '#services/storage_service'
import { inject } from '@adonisjs/core'

export default class AssetController {
  @inject()
  async show(ctx: HttpContext) {
    const storage = new StorageService(ctx)

    const tempDirectory = '.cache'
    const path = AssetService.getParamFilename(ctx.params)
    const tempName = `${tempDirectory}/${path}`
    const options = AssetService.getImageOptions(path)
    const isCache = await CacheService.has(tempName)

    let imageBuffer: Buffer | undefined

    if (!isCache) {
      const exists = await storage.exists(path)

      if (!exists) {
        return ctx.response.status(404).send('Image not found')
      }

      const imageStream = await storage.getStream(path)

      const chunks: Buffer[] = []
      for await (const chunk of imageStream) {
        chunks.push(chunk)
      }
      const imageBuffer = Buffer.concat(chunks)
      await CacheService.set(tempName, imageBuffer!.toString('base64'))
      ctx.response.append('Content-Type', `image/${options.format}`)

      return await storage.handle()
    } else {
      const cachedImageBase64 = await CacheService.get(tempName)

      if (cachedImageBase64) {
        imageBuffer = Buffer.from(cachedImageBase64, 'base64')
        ctx.response.append('Content-Type', `image/${options.format}`)
        ctx.response.header('X-Cache', 'HIT')
      }
    }

    if (imageBuffer) {
      ctx.response.append('Content-Type', `image/${options.format}`)
      ctx.response.header('Cache-Control', 'public, max-age=3600')
      ctx.response.header('ETag', 'unique-etag')
      ctx.response.header('Last-Modified', new Date().toUTCString())

      return imageBuffer
    }
  }
}
