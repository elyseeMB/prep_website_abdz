import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PagesController {
  private user = this.ctx.auth.getUserOrFail()

  constructor(protected ctx: HttpContext) {}

  async dashboard({ inertia, response }: HttpContext) {
    if (!this.user.isAdmin) {
      return response.redirect().back()
    }
    return inertia.render('admin/pages/dashboard')
  }

  blogs({ inertia, response }: HttpContext) {
    if (!this.user.isAdmin) {
      return response.redirect().back()
    }
    return inertia.render('admin/articles/blogs')
  }

  usersList({ inertia, response }: HttpContext) {
    if (!this.user.isAdmin) {
      return response.redirect().back()
    }
  }
}
