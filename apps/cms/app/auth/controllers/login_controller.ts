import type { HttpContext } from '@adonisjs/core/http'
import { AuthService } from '../services/auth_service.js'
import { inject } from '@adonisjs/core'

@inject()
export default class LoginController {
  constructor(private authService: AuthService) {}
  async show({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async execute({ request, response, auth, session }: HttpContext) {
    const { email, password } = request.all()

    const user = await this.authService.attempt(email, password)

    if (!user) {
      session.flashErrors({
        E_INVALID_CREDENTIALS: "Aucun compte n'a été trouvé avec les identifiants fournis.",
      })
      return response.redirect().back()
    }
    await auth.use('web').login(user)
    return response.redirect().toPath('/')
  }
}
