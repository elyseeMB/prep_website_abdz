import { FormatEnum, AvailableFormatInfo } from 'sharp'

export class ImageOptions {
  declare width: number
  declare height: number
  declare quality: number
  declare format: keyof FormatEnum | AvailableFormatInfo | 'svg+xml'
  declare name: string
  declare blur: number
}

export default class AssetService {
  static getParamFilename(params: Array<string> | Record<string, any>): string {
    if (Array.isArray(params)) {
      return params.join('/')
    }

    if (params['*']) {
      return params['*'].join('/')
    }

    return Object.values(params).join('/')
  }

  static getImageOptions(queries: Record<string, any>, path: string) {
    let options = new ImageOptions()
    const isSVG = path.endsWith('.svg')

    for (let key in queries) {
      switch (key) {
        case 'width':
          let width = parseInt(queries[key], 10)
          if (width > 1000) width = 1000
          options.width = Math.ceil(width / 50) * 50
          break
        case 'height':
          let height = parseInt(queries[key], 10)
          if (height > 1000) width = 1000
          options.height = Math.ceil(height / 50) * 50
          break
        case 'quality':
          let quality = parseInt(queries[key], 10)
          if (quality > 100) width = 100
          options.quality = Math.ceil(quality / 10) * 10
          break
        case 'format':
          options.format = queries[key] as keyof FormatEnum | AvailableFormatInfo | 'svg+xml'
          break
      }
    }

    if (!options.format) {
      const format = path.split('.').at(1)
      options.format = isSVG ? 'svg' : (format as keyof FormatEnum)
    }

    options.name = `width_${options.width}__quality_${options.quality}.${options.format}`

    return options
  }
}
