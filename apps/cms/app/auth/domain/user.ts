import { Entity } from '#core/domain/entity.'
import type { UserIdentifier } from '#auth/domain/user_identifier'

type Properties = {
  id: UserIdentifier
  fullName: string
  email: string
  password: string
  isAdmin: boolean
}

export class User extends Entity<Properties> {
  getPassword() {
    return this.props.password
  }

  isAdmin() {
    return this.props.isAdmin
  }

  static create(properties: Properties) {
    return new this(properties)
  }
}
