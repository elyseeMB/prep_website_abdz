import { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async handle({ inertia }: HttpContext) {
    return inertia.render('dashboard')
  }
}
