export class ImageOptions {
  declare width: number
  declare quality: number
  declare format: any
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

  static getImageOptions(path: string) {
    let options = new ImageOptions()

    if (!options.format) {
      const format = path.split('.').at(1)
      options.format = format
    }

    return options
  }
}
