import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DashboardController {
  async handle({ inertia }: HttpContext) {
    return inertia.render('dashboard')
  }
}
