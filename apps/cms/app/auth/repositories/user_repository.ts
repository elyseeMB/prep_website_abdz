import { User } from '#auth/domain/user'
import { UserIdentifier } from '#auth/domain/user_identifier'
import { UserRole } from '#auth/enums/user_role'
import db from '@adonisjs/lucid/services/db'

type UserParams = {
  id: number
  full_name: string
  email: string
  password: string
  created_at: string
  updated_at: string
  role: number
}

export class UserRepository {
  async findUserByEmail(email: string) {
    const userRecord = (await db.from('users').where('email', email).firstOrFail()) as UserParams
    if (!userRecord) {
      return null
    }
    return User.create({
      id: UserIdentifier.fromString(userRecord.id.toString()),
      fullName: userRecord.full_name,
      email: userRecord.email,
      password: userRecord.password,
      isAdmin: userRecord.role === UserRole.Admin,
    })
  }
}
