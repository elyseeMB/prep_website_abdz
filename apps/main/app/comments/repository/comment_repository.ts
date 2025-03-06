import UnauthorizedException from '#exceptions/unauthorized_exception'
import Comment from '#models/comment'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'
import States from '#enums/state'
import { commentValidator } from '../validator/comment_validator.js'
import { inject } from '@adonisjs/core'

@inject()
export default class CommentRepository {
  constructor(protected ctx: HttpContext) {}

  get user() {
    return this.ctx.auth.isAuthenticated ? this.ctx.auth.user : undefined
  }

  async store(data: Infer<typeof commentValidator>) {
    if (!this.user) {
      throw new UnauthorizedException('you must be signed in to create comment')
    }
    const trx = await db.transaction()
    const comment = new Comment()
    comment.useTransaction(trx)
    comment.merge({
      ...data,
      articleId: 3,
      userId: parseInt(this.user.props.id.props.value, 10),
      stateId: States.PUBLIC,
    })
    await comment.save()
    await trx.commit()
    return comment
  }
}
