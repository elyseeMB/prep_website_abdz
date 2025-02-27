import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { UserRole } from '#auth/enums/user_role'
import { CommentFactory } from './comment_factory.js'
import { ArticleFactory } from './article_factory.js'
import { ProfileFactory } from './profile_factory.js'
import { CollectionFactory } from './collection_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: UserRole.User,
    }
  })
  .state('User', (user) => (user.roleId = UserRole.User))
  .state('admin', (user) => (user.roleId = UserRole.Admin))
  .relation('comments', () => CommentFactory)
  .relation('articles', () => ArticleFactory)
  .relation('profile', () => ProfileFactory)
  .relation('collections', () => CollectionFactory)
  .build()
