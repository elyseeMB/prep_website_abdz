import { HttpContext } from '@adonisjs/core/http'
import AssetService from '../services/asset_service.js'
import CacheService from '#services/cache_service'
import { StorageService } from '#services/storage_service'
import { inject } from '@adonisjs/core'
import sharp, { Sharp } from 'sharp'

export default class AssetController {
  @inject()
  async show(ctx: HttpContext) {
    const storage = new StorageService(ctx)
    const tempDirectory = '.cache'
    const path = AssetService.getParamFilename(ctx.params)
    const queries = ctx.request.only(['width', 'format', 'quality', 'height'])
    const options = AssetService.getImageOptions(queries, path)

    // Créer une clé de cache unique basée sur les paramètres de transformation
    const cacheKey = `${tempDirectory}/${path}/${options.name}`

    // Debug: Vérifier les paramètres et la clé de cache
    // console.log('Options:', options)
    // console.log('Cache key:', cacheKey)

    // Vérifier si l'image transformée est en cache
    const isCache = await CacheService.has(cacheKey)
    console.log('Is in cache:', isCache)

    if (isCache) {
      // Servir depuis le cache
      const cachedImageBase64 = await CacheService.get(cacheKey)
      // console.log('Cache hit, data length:', cachedImageBase64 ? cachedImageBase64.length : 'null')

      if (cachedImageBase64) {
        const imageBuffer = Buffer.from(cachedImageBase64, 'base64')
        this.addHeader(ctx, options.format, cacheKey)
        ctx.response.header('X-Cache', 'HIT')
        return imageBuffer
      }
    }

    // L'image n'est pas en cache

    // console.log('Cache miss, loading from storage')
    const exists = await storage.exists(path)
    if (!exists) {
      return ctx.response.status(404).send('Image not found')
    }

    // Charger l'image
    const imageStream = await storage.getStream(path)
    const chunks: Buffer[] = []

    for await (const chunk of imageStream) {
      chunks.push(chunk)
    }

    const originalBuffer = Buffer.concat(chunks)
    // console.log('Original image loaded, size:', originalBuffer.length)

    // Appliquer les transformations avec Sharp
    let sharpInstance = sharp(originalBuffer)

    // Redimensionnement si demandé
    if (options.width || options.height) {
      sharpInstance = sharpInstance.resize({
        width: options.width || undefined,
        height: options.height || undefined,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
    }

    // Appliquer le format et la qualité
    if (options.format) {
      try {
        sharpInstance = this.handleResize(sharpInstance, options.format, options.quality)
      } catch (error) {
        console.error('Format error:', error)
        return ctx.response.status(400).send(`Format error: ${error.message}`)
      }
    }

    try {
      // Obtenir le buffer transformé
      const transformedBuffer = await sharpInstance.toBuffer()
      console.log('Image transformed, size:', transformedBuffer.length)

      // Mettre en cache
      const base64Data = transformedBuffer.toString('base64')
      console.log('Setting cache with data length:', base64Data.length)

      await CacheService.set(cacheKey, base64Data)
      console.log('Cache set complete')

      // Vérifier si la mise en cache a réussi
      const cacheVerify = await CacheService.has(cacheKey)
      console.log('Cache verification after set:', cacheVerify)

      // Configurer les en-têtes
      this.addHeader(ctx, options.format, cacheKey)
      ctx.response.header('X-Cache', 'MISS')

      // Retourner le buffer transformé
      return transformedBuffer
    } catch (error) {
      console.error('Sharp processing error:', error)
      return ctx.response.status(500).send('Error processing image')
    }
  }

  private handleResize(
    sharpInstance: Sharp,
    format: keyof sharp.FormatEnum | sharp.AvailableFormatInfo | 'svg+xml',
    quality: number
  ): Sharp {
    switch (format) {
      case 'jpeg':
      case 'jpg':
        return sharpInstance.jpeg({ quality })
      case 'webp':
        return sharpInstance.webp({ quality })
      case 'avif':
        return sharpInstance.avif({ quality })
      default:
        throw new Error(`Format non supporté: ${format}`)
    }
  }

  private addHeader(
    ctx: HttpContext,
    format: keyof sharp.FormatEnum | sharp.AvailableFormatInfo | 'svg+xml',
    cacheKey: string
  ) {
    ctx.response.header('Content-Type', `image/${format}`)
    ctx.response.header('Cache-Control', 'public, max-age=31536000')
    ctx.response.header('ETag', `"${this.generateETag(cacheKey)}"`)
    ctx.response.header('Last-Modified', new Date().toUTCString())
  }

  private generateETag(key: string): string {
    return Buffer.from(key).toString('base64').substring(0, 16)
  }
}
