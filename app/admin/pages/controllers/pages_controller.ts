import { HttpContext } from '@adonisjs/core/http'

export default class PagesController {
  async dashboard({ inertia, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    if (!user.isAdmin) {
      return response.redirect().back()
    }
    return inertia.render('admin/pages/dashboard')
  }
}
