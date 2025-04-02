import hash from '@adonisjs/core/services/hash'
import { inject } from '@adonisjs/core'
import { UserRepository } from '#auth/repositories/user_repository'

@inject()
export class AuthService {
  constructor(private repository: UserRepository) {}
  async attempt(email: string, password: string) {
    const user = await this.repository.findUserByEmail(email)

    if (!user) {
      await hash.use('scrypt').make('password')
      return false
    }

    const hasValidPassword = await hash.verify(user.getPassword(), password)

    if (!hasValidPassword) {
      return false
    }
    return user
  }
}
