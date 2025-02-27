import { HttpContext } from '@adonisjs/core/http'
import { commentValidator } from '../validator/comment_validator.js'
import { inject } from '@adonisjs/core'
import CommentRepository from '../repository/comment_repository.js'

@inject()
export default class StoreCommentController {
  constructor(protected commentRepository: CommentRepository) {}

  async execute({ request, response }: HttpContext) {
    const data = await request.validateUsing(commentValidator)
    const comment = await this.commentRepository.store(data)

    response.json(comment)
  }
}
