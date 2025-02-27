import User from '#models/user'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class customersRepository {
  constructor(protected ctx: HttpContext) {}

  get user() {
    return this.ctx.auth.isAuthenticated ? this.ctx.auth.use : undefined
  }

  builder() {}

  getList() {
    const users = User.query().select('*').preload('articles').preload('profile').preload('role')

    return users
  }
}
