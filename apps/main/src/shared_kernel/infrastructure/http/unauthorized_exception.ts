import HttpStatus from '#core/enums/http_statuses.'
import { Exception } from '@adonisjs/core/exceptions'

export default class UnauthorizedException extends Exception {
  static status = 500

  constructor(message: string = "you're not authorized to perform this action.") {
    super(message, { code: 'E_UNAUTHORIZED', status: HttpStatus.UNAUTHORIZED })
  }
}
