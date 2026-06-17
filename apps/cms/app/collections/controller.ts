import { HttpContext } from '@adonisjs/core/http'

export default class CollectionController {
  async index({ inertia }: HttpContext) {
    return inertia.render('collection/index')
  }
}
