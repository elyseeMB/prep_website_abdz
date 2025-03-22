export default class AssetService {
  static getParamFilename(params: Array<string | Record<string, any>>): string {
    if (Array.isArray(params)) {
      return params.join('/')
    }

    if (params['*']) {
      return params['*'].join('/')
    }

    return Object.values(params).join('/')
  }
}
