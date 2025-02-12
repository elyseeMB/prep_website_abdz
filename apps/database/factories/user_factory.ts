import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { UserRole } from '#auth/enums/user_role'
import { ArticleFactory } from './article_factory.js'
import { CommentFactory } from './comment_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: UserRole.User,
    }
  })
  .state('admin', (user) => (user.role = UserRole.Admin))
  .relation('articles', () => ArticleFactory)
  .relation('comments', () => CommentFactory)
  .build()
