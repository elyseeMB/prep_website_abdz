import type { SessionGuardUser, SessionUserProviderContract } from '@adonisjs/auth/types/session'
import { User } from './domain/user.js'
import { symbols } from '@adonisjs/auth'
import db from '@adonisjs/lucid/services/db'
import { UserIdentifier } from './domain/user_identifier.js'
import { UserRole } from './enums/user_role.js'

export class SessionUserProvider implements SessionUserProviderContract<User> {
  declare [symbols.PROVIDER_REAL_USER]: User

  async createUserForGuard(user: User): Promise<SessionGuardUser<User>> {
    return {
      getId() {
        return user.getIdentifier().toString()
      },

      getOriginal() {
        return user
      },
    }
  }
  async findById(identifier: string): Promise<SessionGuardUser<User> | null> {
    const userRecord = await await db.from('users').where('id', '=', identifier).firstOrFail()

    if (!userRecord) {
      return null
    }

    const user = User.create({
      id: UserIdentifier.fromString(userRecord.id.toString()),
      fullName: userRecord.full_name,
      email: userRecord.email,
      password: userRecord.password,
      isAdmin: userRecord.role === UserRole.Admin,
    })

    return this.createUserForGuard(user)
  }
}
