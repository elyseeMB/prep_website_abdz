import factory from '@adonisjs/lucid/factories'
import Profile from '#models/profile'
import { UserFactory } from './user_factory.js'

export const ProfileFactory = factory
  .define(Profile, async ({ faker }) => {
    return {
      biography: faker.lorem.paragraph(),
      location:
        faker.location.state() + ',' + faker.location.country + ',' + faker.location.continent,
      website: faker.internet.url(),
      company: faker.company.buzzAdjective(),
      facebookUrl: faker.internet.url(),
    }
  })
  .relation('user', () => UserFactory)
  .build()
