import factory from '@adonisjs/lucid/factories'
import { ArticleFactory } from './article_factory.js'
import Taxonomy from '#models/taxonomy'

export const TaxonomyFactory = factory
  .define(Taxonomy, async ({ faker }) => {
    return {
      name: faker.word.words({ count: { min: 1, max: 5 } }),
      description: faker.lorem.sentence(),
    }
  })
  .relation('articles', () => ArticleFactory)
  .relation('children', () => TaxonomyFactory)
  .build()
