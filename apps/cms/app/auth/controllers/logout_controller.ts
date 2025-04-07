import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async handle({ auth, session, response }: HttpContext) {
    await User.logout(auth)
    session.flash('success', 'Au revoir')
    return response.redirect().toPath('/login')
  }
}
