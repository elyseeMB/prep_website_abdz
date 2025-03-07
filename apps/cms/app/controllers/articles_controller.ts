import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ArticlesController {
  async index({ response, inertia }: HttpContext) {
    const data = await db.from('articles').select('*').limit(5)
    return inertia.render('articles/index')
  }
}
