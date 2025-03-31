import Factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { CollectionFactory } from './collection_factory.js'
import { ProfileFactory } from './profile_factory.js'
import { CommentFactory } from './comment_factory.js'
import { ArticleFactory } from './article_factory.js'
// import { UserRole } from '#auth/enums/user_role'

export const UserFactory = Factory.define(User, ({ faker }) => ({
  fullName: faker.internet.username(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  // roleId: UserRole.User,
}))

  // .state('admin', (user) => (user.roleId = UserRole.Admin))
  // .state('contributorLvl1', (user) => (user.roleId = UserRole.CONTRIBUTOR_LVL_1))
  // .state('contributorLvl2', (user) => (user.roleId = UserRole.CONTRIBUTOR_LVL_2))
  .relation('comments', () => CommentFactory)
  .relation('articles', () => ArticleFactory)
  .relation('profile', () => ProfileFactory)
  .relation('collections', () => CollectionFactory)
  .build()
