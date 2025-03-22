// import { HttpContext } from '@adonisjs/core/http'
// import AssetService from '../services/asset_service.js'
// import CacheService from '#services/cache_service'
// import { StorageService } from '#services/storage_service'
// import { inject } from '@adonisjs/core'
// import internal from 'stream'

// export default class AssetController {
//   @inject()
//   async show(ctx: HttpContext) {
//     const storage = new StorageService(ctx)
//     const tempDirectory = '.cache'
//     const path = AssetService.getParamFilename(ctx.params)
//     const tempName = `${tempDirectory}/${path}`
//     const options = AssetService.getImageOptions(path)
//     const isCache = await CacheService.has(tempName)

//     // Si l'image est en cache
//     if (isCache) {
//       const cachedImageBase64 = await CacheService.get(tempName)
//       if (cachedImageBase64) {
//         const imageBuffer = Buffer.from(cachedImageBase64, 'base64')
//         ctx.response.header('Content-Type', `image/${options.format}`)
//         ctx.response.header('X-Cache', 'HIT')
//         ctx.response.header('Cache-Control', 'public, max-age=3600')
//         ctx.response.header('ETag', 'unique-etag')
//         ctx.response.header('Last-Modified', new Date().toUTCString())
//         return imageBuffer
//       }
//     }

//     const exists = await storage.exists(path)
//     if (!exists) {
//       return ctx.response.status(404).send('Image not found')
//     }
//     const imageStream = await storage.getStream(path)

//     this.saveToCache(imageStream, tempName).catch((error) => {
//       console.error('Failed to save to cache:', error)
//     })

//     ctx.response.header('Content-Type', `image/${options.format}`)
//     ctx.response.header('X-Cache', 'MISS')
//     ctx.response.header('Cache-Control', 'public, max-age=3600')
//     ctx.response.header('ETag', 'unique-etag')
//     ctx.response.header('Last-Modified', new Date().toUTCString())

//     return ctx.response.stream(imageStream)
//   }

//   private async saveToCache(stream: any, tempName: string) {
//     const chunks: Buffer[] = []
//     const clonedStream = stream.clone()

//     for await (const chunk of clonedStream) {
//       chunks.push(chunk)
//     }

//     const buffer = Buffer.concat(chunks)
//     await CacheService.set(tempName, buffer.toString('base64'))
//   }
// }

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

    if (isCache) {
      // Servir depuis le cache
      const cachedImageBase64 = await CacheService.get(tempName)
      if (cachedImageBase64) {
        const imageBuffer = Buffer.from(cachedImageBase64, 'base64')
        ctx.response.header('Content-Type', `image/${options.format}`)
        ctx.response.header('X-Cache', 'HIT')
        ctx.response.header('Cache-Control', 'public, max-age=3600')
        ctx.response.header('ETag', `"${this.generateETag(path)}"`)
        ctx.response.header('Last-Modified', new Date().toUTCString())
        return imageBuffer
      }
    }

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

    await CacheService.set(tempName, imageBuffer.toString('base64'))

    ctx.response.header('Content-Type', `image/${options.format}`)
    ctx.response.header('X-Cache', 'MISS')
    ctx.response.header('Cache-Control', 'public, max-age=3600')
    ctx.response.header('ETag', `"${this.generateETag(path)}"`)
    ctx.response.header('Last-Modified', new Date().toUTCString())

    return imageBuffer
  }

  private generateETag(path: string): string {
    return Buffer.from(path).toString('base64').substring(0, 16)
  }
}
