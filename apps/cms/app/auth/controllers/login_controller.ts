import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { loginValidator } from '../validator/auth_validator.js'
import User from '#models/user'

@inject()
export default class LoginController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async store({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(loginValidator)

    const user = await User.login(auth, data)
    const baseMessage = 'Bonjour'

    session.flash('success', `${baseMessage}, ${user.fullName}`)
    return response.redirect().toPath('/')
  }

  async handle() {}
}
