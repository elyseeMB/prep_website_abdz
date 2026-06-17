import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DashboardController {
  async handle({ inertia, auth }: HttpContext) {
    inertia.share({
      user: auth.user!,
    })
    return inertia.render('dashboard')
  }
}
