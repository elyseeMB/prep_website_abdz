import factory from '@adonisjs/lucid/factories'
import Comment from '#models/comment'
import States from '#enums/state'
import { UserFactory } from './user_factory.js'
import { ArticleFactory } from './article_factory.js'

export const CommentFactory = factory
  .define(Comment, async ({ faker }) => {
    return {
      body: faker.lorem.paragraph(),
      stateId: States.PUBLIC,
    }
  })
  .relation('user', () => UserFactory)
  .relation('article', () => ArticleFactory)
  .build()
