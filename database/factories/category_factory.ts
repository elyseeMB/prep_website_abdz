import Category from '#models/category'
import factory from '@adonisjs/lucid/factories'
import { ArticleFactory } from './article_factory.js'

export const CategoryFactory = factory
  .define(Category, async ({ faker }) => {
    return {
      name: faker.word.words({ count: { min: 1, max: 5 } }),
    }
  })
  .relation('articles', () => ArticleFactory)
  .build()
